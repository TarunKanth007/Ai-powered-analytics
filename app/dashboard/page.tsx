'use client';

import { motion } from 'framer-motion';
import { AdvancedHeader } from '@/components/AdvancedHeader';
import { AdvancedFooter } from '@/components/AdvancedFooter';
import { BackgroundAnimation } from '@/components/BackgroundAnimation';
import { MetricCard } from '@/components/MetricCard';
import { AdvancedCharts } from '@/components/AdvancedCharts';
import { keyMetrics, revenueData } from '@/lib/mockData';
import { DollarSign, Users, ShoppingCart, TrendingUp, BarChart3 } from 'lucide-react';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
};

export default function DashboardPage() {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time insights into your business performance
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={pageVariants}
        >
          <motion.div variants={pageVariants}>
            <MetricCard
              title="Total Revenue"
              value={keyMetrics.totalRevenue.value}
              growth={keyMetrics.totalRevenue.growth}
              trend={keyMetrics.totalRevenue.trend}
              prefix="$"
              icon={<DollarSign className="h-4 w-4" />}
            />
          </motion.div>
          <motion.div variants={pageVariants}>
            <MetricCard
              title="Total Users"
              value={keyMetrics.totalUsers.value}
              growth={keyMetrics.totalUsers.growth}
              trend={keyMetrics.totalUsers.trend}
              icon={<Users className="h-4 w-4" />}
            />
          </motion.div>
          <motion.div variants={pageVariants}>
            <MetricCard
              title="Conversion Rate"
              value={keyMetrics.conversionRate.value}
              growth={keyMetrics.conversionRate.growth}
              trend={keyMetrics.conversionRate.trend}
              suffix="%"
              icon={<ShoppingCart className="h-4 w-4" />}
            />
          </motion.div>
          <motion.div variants={pageVariants}>
            <MetricCard
              title="Avg Order Value"
              value={keyMetrics.avgOrderValue.value}
              growth={keyMetrics.avgOrderValue.growth}
              trend={keyMetrics.avgOrderValue.trend}
              prefix="$"
              icon={<TrendingUp className="h-4 w-4" />}
            />
          </motion.div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <AdvancedCharts data={revenueData} title="Dashboard Analytics" type="line" />
        </div>
      </main>

      <AdvancedFooter />
    </motion.div>
  );
}