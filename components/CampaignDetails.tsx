'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Download, Calendar, Target, Users, DollarSign, MousePointer, Eye, TrendingUp } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Campaign {
  id: number;
  name: string;
  status: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
  startDate: string;
  endDate: string;
  targetAudience: string;
  platform: string;
  objective: string;
  dailyData: any[];
}

interface CampaignDetailsProps {
  campaign: Campaign;
  onBack: () => void;
}

export function CampaignDetails({ campaign, onBack }: CampaignDetailsProps) {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv'>('pdf');

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('Campaign Performance Report', 20, 20);
    
    doc.setFontSize(16);
    doc.text(campaign.name, 20, 35);
    
    // Campaign Overview
    doc.setFontSize(12);
    doc.text('Campaign Overview', 20, 55);
    
    const overviewData = [
      ['Status', campaign.status],
      ['Platform', campaign.platform],
      ['Objective', campaign.objective],
      ['Target Audience', campaign.targetAudience],
      ['Start Date', new Date(campaign.startDate).toLocaleDateString()],
      ['End Date', new Date(campaign.endDate).toLocaleDateString()],
      ['Budget', `$${campaign.budget.toLocaleString()}`],
      ['Spent', `$${campaign.spent.toLocaleString()}`],
      ['Budget Utilization', `${((campaign.spent / campaign.budget) * 100).toFixed(1)}%`]
    ];

    (doc as any).autoTable({
      startY: 65,
      head: [['Metric', 'Value']],
      body: overviewData,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] }
    });

    // Performance Metrics
    doc.text('Performance Metrics', 20, (doc as any).lastAutoTable.finalY + 20);
    
    const metricsData = [
      ['Impressions', campaign.impressions.toLocaleString()],
      ['Clicks', campaign.clicks.toLocaleString()],
      ['Conversions', campaign.conversions.toString()],
      ['Click-Through Rate (CTR)', `${campaign.ctr}%`],
      ['Cost Per Click (CPC)', `$${campaign.cpc}`],
      ['Return on Ad Spend (ROAS)', `${campaign.roas}x`],
      ['Conversion Rate', `${((campaign.conversions / campaign.clicks) * 100).toFixed(2)}%`],
      ['Cost Per Conversion', `$${(campaign.spent / campaign.conversions).toFixed(2)}`]
    ];

    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 30,
      head: [['Metric', 'Value']],
      body: metricsData,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] }
    });

    const finalY1 = (doc as any).lastAutoTable.finalY || 120;
    doc.setFontSize(16);
    doc.text('Performance Metrics', 20, finalY1 + 20);
    doc.addPage();
    doc.text('Daily Performance Data', 20, 20);
    
    const dailyHeaders = ['Date', 'Impressions', 'Clicks', 'Conversions', 'Spend'];
    const dailyRows = campaign.dailyData.map(day => [
      new Date(day.date).toLocaleDateString(),
      day.impressions.toLocaleString(),
      day.clicks.toLocaleString(),
      day.conversions.toString(),
      `$${day.spend}`
    ]);

    autoTable(doc, {
      startY: finalY1 + 30,
      head: [dailyHeaders],
      body: dailyRows,
      theme: 'grid',
      headStyles: { fillColor: [139, 92, 246] }
    });

    doc.save(`${campaign.name.replace(/\s+/g, '_')}_Report.pdf`);
  };

  const exportToCSV = () => {
    const csvData = [
      ['Campaign Report'],
      [''],
      ['Campaign Name', campaign.name],
      ['Status', campaign.status],
      ['Platform', campaign.platform],
      ['Objective', campaign.objective],
      ['Target Audience', campaign.targetAudience],
      ['Start Date', campaign.startDate],
      ['End Date', campaign.endDate],
      [''],
      ['Performance Metrics'],
      ['Budget', campaign.budget],
      ['Spent', campaign.spent],
      ['Impressions', campaign.impressions],
      ['Clicks', campaign.clicks],
      ['Conversions', campaign.conversions],
      ['CTR (%)', campaign.ctr],
      ['CPC ($)', campaign.cpc],
      ['ROAS', campaign.roas],
      [''],
      ['Daily Performance'],
      ['Date', 'Impressions', 'Clicks', 'Conversions', 'Spend']
    ];

    if (campaign.dailyData) {
      campaign.dailyData.forEach(day => {
        csvData.push([day.date, day.impressions, day.clicks, day.conversions, day.spend]);
      });
    }

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${campaign.name.replace(/\s+/g, '_')}_Report.csv`;
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

  const getStatusBadge = (status: string) => {
    const variant = status === 'Active' ? 'default' : 
                   status === 'Completed' ? 'secondary' : 'outline';
    return <Badge variant={variant}>{status}</Badge>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Campaigns
              </Button>
              <div>
                <CardTitle className="text-2xl font-bold">{campaign.name}</CardTitle>
                <div className="flex items-center space-x-4 mt-2">
                  {getStatusBadge(campaign.status)}
                  <span className="text-sm text-muted-foreground">{campaign.platform}</span>
                  <span className="text-sm text-muted-foreground">{campaign.objective}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
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
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Campaign Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="text-2xl font-bold">${campaign.budget.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    ${campaign.spent.toLocaleString()} spent ({((campaign.spent / campaign.budget) * 100).toFixed(1)}%)
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Impressions</p>
                  <p className="text-2xl font-bold">{campaign.impressions.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total reach</p>
                </div>
                <Eye className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Clicks</p>
                  <p className="text-2xl font-bold">{campaign.clicks.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">CTR: {campaign.ctr}%</p>
                </div>
                <MousePointer className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversions</p>
                  <p className="text-2xl font-bold">{campaign.conversions}</p>
                  <p className="text-xs text-muted-foreground">
                    Rate: {((campaign.conversions / campaign.clicks) * 100).toFixed(2)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Campaign Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Campaign Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Platform</p>
                  <p className="font-semibold">{campaign.platform}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Objective</p>
                  <p className="font-semibold">{campaign.objective}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                  <p className="font-semibold">{new Date(campaign.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">End Date</p>
                  <p className="font-semibold">{new Date(campaign.endDate).toLocaleDateString()}</p>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Target Audience</p>
                <p className="font-semibold">{campaign.targetAudience}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">${campaign.cpc}</p>
                  <p className="text-sm text-muted-foreground">Cost Per Click</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{campaign.roas}x</p>
                  <p className="text-sm text-muted-foreground">Return on Ad Spend</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{campaign.ctr}%</p>
                  <p className="text-sm text-muted-foreground">Click-Through Rate</p>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">
                    ${(campaign.spent / campaign.conversions).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">Cost Per Conversion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Daily Performance Chart */}
      {campaign.dailyData && campaign.dailyData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Daily Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={campaign.dailyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    className="text-xs"
                  />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      typeof value === 'number' ? value.toLocaleString() : value,
                      name.charAt(0).toUpperCase() + name.slice(1)
                    ]}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="impressions" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversions" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}