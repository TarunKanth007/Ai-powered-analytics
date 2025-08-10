'use client';

import { motion } from 'framer-motion';
import { AdvancedHeader } from '@/components/AdvancedHeader';
import { AdvancedFooter } from '@/components/AdvancedFooter';
import { BackgroundAnimation } from '@/components/BackgroundAnimation';
import { AdvancedCharts } from '@/components/AdvancedCharts';
import { TrafficChart } from '@/components/TrafficChart';
import { GrowthChart } from '@/components/GrowthChart';
import { revenueData, trafficSourceData, monthlyGrowthData } from '@/lib/mockData';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
};

export default function AnalyticsPage() {
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
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Advanced Analytics
          </h1>
          <p className="text-muted-foreground text-lg">
            Deep insights and comprehensive data analysis
          </p>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <AdvancedCharts data={revenueData} title="Revenue Analytics" type="area" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TrafficChart data={trafficSourceData} />
          </motion.div>
        </div>

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
          >
            <AdvancedCharts data={revenueData} title="Traffic Analytics" type="bar" />
          </motion.div>
        </div>
      </main>

      <AdvancedFooter />
    </motion.div>
  );
}