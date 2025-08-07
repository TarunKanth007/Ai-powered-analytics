'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { X, Download, TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface DataVisualizationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  type: 'revenue' | 'campaign';
}

export function DataVisualizationPopup({ isOpen, onClose, data, type }: DataVisualizationPopupProps) {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv'>('pdf');

  const generateChartData = () => {
    if (type === 'revenue') {
      return [{
        date: data.date,
        revenue: data.revenue,
        users: data.users,
        conversions: data.conversions,
        orders: data.orders,
        traffic: data.traffic
      }];
    } else {
      return [{
        name: data.name,
        budget: data.budget,
        spent: data.spent || 0,
        conversions: data.conversions || 0,
        impressions: data.impressions || 0
      }];
    }
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text(`${type === 'revenue' ? 'Revenue' : 'Campaign'} Data Report`, 20, 20);
      
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
      
      if (type === 'revenue') {
        const revenueData = [
          ['Date', new Date(data.date).toLocaleDateString()],
          ['Revenue', `$${data.revenue.toLocaleString()}`],
          ['Users', data.users.toLocaleString()],
          ['Conversions', data.conversions.toString()],
          ['Orders', data.orders.toString()],
          ['Traffic', data.traffic.toLocaleString()]
        ];

        doc.autoTable({
          startY: 50,
          head: [['Metric', 'Value']],
          body: revenueData,
          theme: 'grid',
          headStyles: { fillColor: [59, 130, 246] }
        });
      } else {
        const campaignData = [
          ['Campaign Name', data.name],
          ['Budget', `$${data.budget.toLocaleString()}`],
          ['Platform', data.platform],
          ['Objective', data.objective],
          ['Target Audience', data.targetAudience],
          ['Start Date', new Date(data.startDate).toLocaleDateString()],
          ['End Date', new Date(data.endDate).toLocaleDateString()]
        ];

        doc.autoTable({
          startY: 50,
          head: [['Property', 'Value']],
          body: campaignData,
          theme: 'grid',
          headStyles: { fillColor: [16, 185, 129] }
        });
      }

      doc.save(`${type}_data_${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const exportToCSV = () => {
    let csvContent = '';
    
    if (type === 'revenue') {
      csvContent = [
        ['Revenue Data Export'],
        ['Date', 'Revenue', 'Users', 'Conversions', 'Orders', 'Traffic'],
        [data.date, data.revenue, data.users, data.conversions, data.orders, data.traffic]
      ].map(row => row.join(',')).join('\n');
    } else {
      csvContent = [
        ['Campaign Data Export'],
        ['Name', 'Budget', 'Platform', 'Objective', 'Target Audience', 'Start Date', 'End Date'],
        [data.name, data.budget, data.platform, data.objective, data.targetAudience, data.startDate, data.endDate]
      ].map(row => row.join(',')).join('\n');
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_data_${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    if (exportFormat === 'pdf') {
      exportToPDF();
    } else {
      exportToCSV();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-0 shadow-none">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold">
                    {type === 'revenue' ? 'Revenue' : 'Campaign'} Data Visualization
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'csv')}
                      className="px-3 py-1 border rounded text-sm"
                    >
                      <option value="pdf">PDF</option>
                      <option value="csv">CSV</option>
                    </select>
                    <Button onClick={handleExport} size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export {exportFormat.toUpperCase()}
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {type === 'revenue' ? (
                      <>
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-blue-600">${data.revenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                          <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-green-600">{data.users.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Users</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                          <ShoppingCart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-purple-600">{data.conversions}</p>
                          <p className="text-sm text-muted-foreground">Conversions</p>
                        </div>
                        <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                          <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-orange-600">{data.orders}</p>
                          <p className="text-sm text-muted-foreground">Orders</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-blue-600">${data.budget.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Budget</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                          <Badge variant="secondary">{data.platform}</Badge>
                          <p className="text-sm text-muted-foreground mt-2">Platform</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                          <Badge variant="outline">{data.objective}</Badge>
                          <p className="text-sm text-muted-foreground mt-2">Objective</p>
                        </div>
                        <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                          <p className="text-sm font-medium text-orange-600">{data.targetAudience}</p>
                          <p className="text-sm text-muted-foreground">Target</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Chart Visualization */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Data Visualization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        {type === 'revenue' ? (
                          <LineChart data={generateChartData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} />
                            <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2} />
                          </LineChart>
                        ) : (
                          <BarChart data={generateChartData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="budget" fill="#3B82F6" />
                          </BarChart>
                        )}
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}