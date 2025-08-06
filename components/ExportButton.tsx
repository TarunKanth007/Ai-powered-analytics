'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, FileText, Table, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { keyMetrics, revenueData, campaignData, performanceSummaryData } from '@/lib/mockData';

export function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<string>('');

  const exportToPDF = async () => {
    setIsExporting(true);
    setExportType('PDF');

    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(24);
      doc.text('Analytics Dashboard Report', 20, 25);
      
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
      
      // Key Metrics Section
      doc.setFontSize(16);
      doc.text('Key Performance Metrics', 20, 55);
      
      const metricsData = [
        ['Total Revenue', `$${keyMetrics.totalRevenue.value.toLocaleString()}`, `${keyMetrics.totalRevenue.growth > 0 ? '+' : ''}${keyMetrics.totalRevenue.growth}%`],
        ['Total Users', keyMetrics.totalUsers.value.toLocaleString(), `${keyMetrics.totalUsers.growth > 0 ? '+' : ''}${keyMetrics.totalUsers.growth}%`],
        ['Conversion Rate', `${keyMetrics.conversionRate.value}%`, `${keyMetrics.conversionRate.growth > 0 ? '+' : ''}${keyMetrics.conversionRate.growth}%`],
        ['Avg Order Value', `$${keyMetrics.avgOrderValue.value}`, `${keyMetrics.avgOrderValue.growth > 0 ? '+' : ''}${keyMetrics.avgOrderValue.growth}%`]
      ];

      autoTable(doc, {
        startY: 65,
        head: [['Metric', 'Current Value', 'Growth']],
        body: metricsData,
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] },
        styles: { fontSize: 10 }
      });

      // Campaign Performance Section
      const finalY1 = (doc as any).lastAutoTable.finalY || 120;
      doc.setFontSize(16);
      doc.text('Campaign Performance Overview', 20, finalY1 + 20);
      
      const campaignOverview = [
        ['Total Campaigns', performanceSummaryData.overview.totalCampaigns.toString()],
        ['Active Campaigns', performanceSummaryData.overview.activeCampaigns.toString()],
        ['Total Budget', `$${performanceSummaryData.overview.totalBudget.toLocaleString()}`],
        ['Total Spent', `$${performanceSummaryData.overview.totalSpent.toLocaleString()}`],
        ['Total Impressions', performanceSummaryData.overview.totalImpressions.toLocaleString()],
        ['Total Clicks', performanceSummaryData.overview.totalClicks.toLocaleString()],
        ['Total Conversions', performanceSummaryData.overview.totalConversions.toString()],
        ['Average ROAS', `${performanceSummaryData.overview.averageROAS}x`]
      ];

      autoTable(doc, {
        startY: finalY1 + 30,
        head: [['Metric', 'Value']],
        body: campaignOverview,
        theme: 'grid',
        headStyles: { fillColor: [16, 185, 129] },
        styles: { fontSize: 10 }
      });

      // Add new page for detailed campaign data
      doc.addPage();
      doc.setFontSize(16);
      doc.text('Detailed Campaign Data', 20, 20);

      const campaignDetails = campaignData.map(campaign => [
        campaign.name,
        campaign.status,
        campaign.platform,
        `$${campaign.budget.toLocaleString()}`,
        `$${campaign.spent.toLocaleString()}`,
        campaign.conversions.toString(),
        `${campaign.ctr}%`,
        `${campaign.roas}x`
      ]);

      autoTable(doc, {
        startY: 30,
        head: [['Campaign', 'Status', 'Platform', 'Budget', 'Spent', 'Conversions', 'CTR', 'ROAS']],
        body: campaignDetails,
        theme: 'grid',
        headStyles: { fillColor: [139, 92, 246] },
        styles: { fontSize: 8 }
      });

      // Revenue trend data
      doc.addPage();
      doc.setFontSize(16);
      doc.text('Revenue Trend Data', 20, 20);

      const revenueDetails = revenueData.slice(-10).map(day => [
        new Date(day.date).toLocaleDateString(),
        `$${day.revenue.toLocaleString()}`,
        day.users.toLocaleString(),
        day.conversions.toString(),
        day.orders.toString()
      ]);

      autoTable(doc, {
        startY: 30,
        head: [['Date', 'Revenue', 'Users', 'Conversions', 'Orders']],
        body: revenueDetails,
        theme: 'grid',
        headStyles: { fillColor: [245, 158, 11] },
        styles: { fontSize: 10 }
      });

      doc.save('Analytics_Dashboard_Report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
      setExportType('');
    }
  };

  const exportToCSV = async () => {
    setIsExporting(true);
    setExportType('CSV');

    try {
      const csvData = [
        ['Analytics Dashboard Export'],
        [`Generated: ${new Date().toISOString()}`],
        [''],
        ['KEY METRICS'],
        ['Metric', 'Value', 'Growth', 'Previous Value'],
        ['Total Revenue', keyMetrics.totalRevenue.value, `${keyMetrics.totalRevenue.growth}%`, keyMetrics.totalRevenue.previousValue],
        ['Total Users', keyMetrics.totalUsers.value, `${keyMetrics.totalUsers.growth}%`, keyMetrics.totalUsers.previousValue],
        ['Conversion Rate', keyMetrics.conversionRate.value, `${keyMetrics.conversionRate.growth}%`, keyMetrics.conversionRate.previousValue],
        ['Avg Order Value', keyMetrics.avgOrderValue.value, `${keyMetrics.avgOrderValue.growth}%`, keyMetrics.avgOrderValue.previousValue],
        [''],
        ['CAMPAIGN PERFORMANCE'],
        ['Campaign Name', 'Status', 'Platform', 'Budget', 'Spent', 'Impressions', 'Clicks', 'Conversions', 'CTR', 'CPC', 'ROAS'],
        ...campaignData.map(campaign => [
          campaign.name,
          campaign.status,
          campaign.platform,
          campaign.budget,
          campaign.spent,
          campaign.impressions,
          campaign.clicks,
          campaign.conversions,
          campaign.ctr,
          campaign.cpc,
          campaign.roas
        ]),
        [''],
        ['REVENUE TREND'],
        ['Date', 'Revenue', 'Users', 'Conversions', 'Orders', 'Traffic'],
        ...revenueData.map(day => [
          day.date,
          day.revenue,
          day.users,
          day.conversions,
          day.orders,
          day.traffic
        ])
      ];

      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'Analytics_Dashboard_Export.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating CSV:', error);
    } finally {
      setIsExporting(false);
      setExportType('');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          disabled={isExporting}
          className="relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isExporting ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting {exportType}...
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={exportToPDF} disabled={isExporting}>
          <FileText className="mr-2 h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToCSV} disabled={isExporting}>
          <Table className="mr-2 h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}