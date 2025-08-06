'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Award,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import { performanceSummaryData } from '@/lib/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function EnhancedPerformanceSummary() {
  const { overview, topPerformers, recommendations } = performanceSummaryData;

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'optimization':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'opportunity':
        return <Lightbulb className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Campaign Overview */}
      <motion.div variants={itemVariants}>
        <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold">
              <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
              Campaign Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{overview.totalCampaigns}</p>
                <p className="text-sm text-muted-foreground">Total Campaigns</p>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{overview.activeCampaigns}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>

            <Separator />

            {/* Budget Utilization */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Budget Utilization</span>
                <span className="text-sm text-muted-foreground">
                  ${overview.totalSpent.toLocaleString()} / ${overview.totalBudget.toLocaleString()}
                </span>
              </div>
              <Progress 
                value={(overview.totalSpent / overview.totalBudget) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {((overview.totalSpent / overview.totalBudget) * 100).toFixed(1)}% of total budget used
              </p>
            </div>

            <Separator />

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Avg CTR</p>
                <p className="font-semibold">{overview.averageCTR}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg CPC</p>
                <p className="font-semibold">${overview.averageCPC}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Conversions</p>
                <p className="font-semibold">{overview.totalConversions}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg ROAS</p>
                <p className="font-semibold text-green-600">{overview.averageROAS}x</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Performers */}
      <motion.div variants={itemVariants}>
        <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold">
              <Award className="mr-2 h-5 w-5 text-green-600" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformers.map((performer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm">{performer.metric}</p>
                  <p className="text-xs text-muted-foreground">{performer.campaign}</p>
                </div>
                <Badge variant="secondary" className="font-bold">
                  {performer.value}
                </Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recommendations */}
      <motion.div variants={itemVariants} className="lg:col-span-2">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold">
              <Target className="mr-2 h-5 w-5 text-purple-600" />
              AI-Powered Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border-l-4 border-l-purple-500"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getRecommendationIcon(rec.type)}
                      <h4 className="font-semibold text-sm">{rec.title}</h4>
                    </div>
                    <Badge className={`text-xs ${getImpactColor(rec.impact)}`}>
                      {rec.impact}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {rec.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-green-600">
                      {rec.estimatedGain}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-2 py-1 rounded"
                    >
                      Apply
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}