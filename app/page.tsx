'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { AdvancedHeader } from '@/components/AdvancedHeader';
import { AdvancedFooter } from '@/components/AdvancedFooter';
import { BackgroundAnimation } from '@/components/BackgroundAnimation';
import { MetricCard } from '@/components/MetricCard';
import { AdvancedCharts } from '@/components/AdvancedCharts';
import { TrafficChart } from '@/components/TrafficChart';
import { GrowthChart } from '@/components/GrowthChart';
import { CampaignTable } from '@/components/CampaignTable';
import { DataManagement } from '@/components/DataManagement';
import { EnhancedPerformanceSummary } from '@/components/EnhancedPerformanceSummary';
import { MetricCardSkeleton, ChartSkeleton, TableSkeleton } from '@/components/LoadingSkeleton';
import { 
  keyMetrics, 
  revenueData, 
  trafficSourceData, 
  campaignData, 
  monthlyGrowthData,
  getUserData
} from '@/lib/mockData';
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  TrendingUp 
} from 'lucide-react';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState(keyMetrics);
  const [combinedRevenueData, setCombinedRevenueData] = useState(revenueData);
  const [combinedCampaignData, setCombinedCampaignData] = useState(campaignData);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const updateData = useCallback(() => {
    const userData = getUserData();
    
    // Combine user data with mock data
    setCombinedRevenueData([...revenueData, ...userData.revenue]);
    setCombinedCampaignData([...campaignData, ...userData.campaigns]);
    
    // Update metrics if user has added custom metrics
    if (Object.keys(userData.metrics).length > 0) {
      setMetrics(prev => ({ ...prev, ...userData.metrics }));
    }
  }, []);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        totalRevenue: {
          ...prev.totalRevenue,
          value: prev.totalRevenue.value + Math.floor(Math.random() * 1000),
        },
        totalUsers: {
          ...prev.totalUsers,
          value: prev.totalUsers.value + Math.floor(Math.random() * 10),
        },
        conversionRate: {
          ...prev.conversionRate,
          value: +(prev.conversionRate.value + (Math.random() - 0.5) * 0.1).toFixed(2),
        },
        avgOrderValue: {
          ...prev.avgOrderValue,
          value: +(prev.avgOrderValue.value + (Math.random() - 0.5) * 5).toFixed(2),
        },
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      >
        <Header />
        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Metrics Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <MetricCardSkeleton key={i} />
            ))}
          </div>

          {/* Charts Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>

          {/* Table Skeleton */}
          <TableSkeleton />
        </main>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative"
    >
      <BackgroundAnimation />
      <AdvancedHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Key Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={pageVariants}
        >
          <motion.div variants={pageVariants}>
            <MetricCard
              title="Total Revenue"
              value={metrics.totalRevenue.value}
              growth={metrics.totalRevenue.growth}
              trend={metrics.totalRevenue.trend}
              prefix="$"
              icon={<DollarSign className="h-4 w-4" />}
            />
          </motion.div>
          <motion.div variants={pageVariants}>
            <MetricCard
              title="Total Users"
              value={metrics.totalUsers.value}
              growth={metrics.totalUsers.growth}
              trend={metrics.totalUsers.trend}
              icon={<Users className="h-4 w-4" />}
            />
          </motion.div>
          <motion.div variants={pageVariants}>
            <MetricCard
              title="Conversion Rate"
              value={metrics.conversionRate.value}
              growth={metrics.conversionRate.growth}
              trend={metrics.conversionRate.trend}
              suffix="%"
              icon={<ShoppingCart className="h-4 w-4" />}
            />
          </motion.div>
          <motion.div variants={pageVariants}>
            <MetricCard
              title="Avg Order Value"
              value={metrics.avgOrderValue.value}
              growth={metrics.avgOrderValue.growth}
              trend={metrics.avgOrderValue.trend}
              prefix="$"
              icon={<TrendingUp className="h-4 w-4" />}
            />
          </motion.div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <AdvancedCharts data={combinedRevenueData} title="Revenue Analytics" type="line" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TrafficChart data={trafficSourceData} />
          </motion.div>
        </div>

        {/* Enhanced Performance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <EnhancedPerformanceSummary />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GrowthChart data={monthlyGrowthData} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-1"
          >
            <AdvancedCharts data={combinedRevenueData} title="Traffic Analytics" type="bar" />
          </motion.div>
        </div>

        {/* Campaign Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <CampaignTable data={combinedCampaignData} />
        </motion.div>

        {/* Data Management Component */}
        <DataManagement onDataUpdate={updateData} />
      </main>

      <AdvancedFooter />
    </motion.div>
  );
}