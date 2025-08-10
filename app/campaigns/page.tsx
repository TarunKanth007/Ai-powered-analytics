'use client';

import { motion } from 'framer-motion';
import { AdvancedHeader } from '@/components/AdvancedHeader';
import { AdvancedFooter } from '@/components/AdvancedFooter';
import { BackgroundAnimation } from '@/components/BackgroundAnimation';
import { CampaignTable } from '@/components/CampaignTable';
import { EnhancedPerformanceSummary } from '@/components/EnhancedPerformanceSummary';
import { campaignData } from '@/lib/mockData';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
};

export default function CampaignsPage() {
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
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Campaign Management
          </h1>
          <p className="text-muted-foreground text-lg">
            Monitor and optimize your marketing campaigns
          </p>
        </motion.div>

        {/* Enhanced Performance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <EnhancedPerformanceSummary />
        </motion.div>

        {/* Campaign Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CampaignTable data={campaignData} />
        </motion.div>
      </main>

      <AdvancedFooter />
    </motion.div>
  );
}