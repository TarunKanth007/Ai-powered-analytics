'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle, 
  DollarSign, 
  Target,
  Clock,
  Users,
  BarChart3
} from 'lucide-react';

interface RecommendationDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: {
    type: string;
    title: string;
    description: string;
    impact: string;
    estimatedGain: string;
  };
}

export function RecommendationDetails({ isOpen, onClose, recommendation }: RecommendationDetailsProps) {
  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'optimization':
        return <TrendingUp className="h-8 w-8 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
      case 'opportunity':
        return <Lightbulb className="h-8 w-8 text-blue-500" />;
      default:
        return <CheckCircle className="h-8 w-8 text-gray-500" />;
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

  const getDetailedInfo = (type: string) => {
    switch (type) {
      case 'optimization':
        return {
          advantages: [
            'Increase ROI by focusing on high-performing campaigns',
            'Reduce wasted ad spend on underperforming segments',
            'Improve overall campaign efficiency',
            'Scale successful strategies across other campaigns'
          ],
          implementation: [
            'Analyze current performance metrics',
            'Identify top-performing keywords and audiences',
            'Gradually increase budget allocation',
            'Monitor performance and adjust accordingly'
          ],
          timeline: '2-4 weeks',
          difficulty: 'Medium',
          resources: 'Marketing team, budget reallocation',
          limitations: [
            'May require additional budget',
            'Results may vary based on market conditions',
            'Requires continuous monitoring'
          ]
        };
      case 'warning':
        return {
          advantages: [
            'Prevent further budget waste',
            'Improve conversion rates',
            'Better user experience',
            'Higher quality traffic'
          ],
          implementation: [
            'Review current ad creative and copy',
            'Analyze landing page performance',
            'A/B test new variations',
            'Optimize targeting parameters'
          ],
          timeline: '1-2 weeks',
          difficulty: 'Low',
          resources: 'Creative team, web developer',
          limitations: [
            'May temporarily reduce traffic volume',
            'Requires creative resources',
            'Testing period needed'
          ]
        };
      case 'opportunity':
        return {
          advantages: [
            'Expand market reach',
            'Increase brand visibility',
            'Capture new customer segments',
            'Diversify traffic sources'
          ],
          implementation: [
            'Research new keyword opportunities',
            'Create targeted ad groups',
            'Develop relevant ad creative',
            'Set appropriate budgets and bids'
          ],
          timeline: '3-6 weeks',
          difficulty: 'High',
          resources: 'Marketing team, additional budget, creative resources',
          limitations: [
            'Higher initial investment required',
            'Uncertain performance of new keywords',
            'May dilute focus from existing campaigns'
          ]
        };
      default:
        return {
          advantages: ['General improvement in performance'],
          implementation: ['Follow standard optimization practices'],
          timeline: '2-4 weeks',
          difficulty: 'Medium',
          resources: 'Marketing team',
          limitations: ['Results may vary']
        };
    }
  };

  const details = getDetailedInfo(recommendation.type);

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
            className="bg-background rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-0 shadow-none">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getRecommendationIcon(recommendation.type)}
                    <div>
                      <CardTitle className="text-2xl font-bold">{recommendation.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getImpactColor(recommendation.impact)}>
                          {recommendation.impact} Impact
                        </Badge>
                        <Badge variant="outline">{recommendation.estimatedGain}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Overview */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Overview</h3>
                  <p className="text-muted-foreground">{recommendation.description}</p>
                </div>

                <Separator />

                {/* Implementation Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Target className="mr-2 h-5 w-5 text-green-600" />
                        Advantages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {details.advantages.map((advantage, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{advantage}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
                        Implementation Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-2">
                        {details.implementation.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                      <p className="font-semibold">Timeline</p>
                      <p className="text-sm text-muted-foreground">{details.timeline}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <p className="font-semibold">Difficulty</p>
                      <Badge variant={details.difficulty === 'High' ? 'destructive' : details.difficulty === 'Medium' ? 'secondary' : 'default'}>
                        {details.difficulty}
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="font-semibold">Est. Gain</p>
                      <p className="text-sm font-bold text-green-600">{recommendation.estimatedGain}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Resources Required */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Resources Required</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{details.resources}</p>
                  </CardContent>
                </Card>

                {/* Limitations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-600">Limitations & Considerations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {details.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Implement Recommendation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}