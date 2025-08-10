'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  X, 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3,
  Calendar,
  Target
} from 'lucide-react';
import { campaignData, revenueData } from '@/lib/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const campaignResults = campaignData
        .filter(campaign => 
          campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.status.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(campaign => ({ ...campaign, type: 'campaign' }));

      const revenueResults = revenueData
        .filter(data => 
          new Date(data.date).toLocaleDateString().includes(searchTerm) ||
          data.revenue.toString().includes(searchTerm)
        )
        .slice(0, 5)
        .map(data => ({ ...data, type: 'revenue' }));

      setResults([...campaignResults, ...revenueResults]);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'campaign':
        return <Target className="h-4 w-4 text-blue-500" />;
      case 'revenue':
        return <DollarSign className="h-4 w-4 text-green-500" />;
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            className="bg-background rounded-xl shadow-2xl max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-0 shadow-none">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns, revenue data, metrics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border-0 focus-visible:ring-0 text-lg"
                    autoFocus
                  />
                  <Button variant="ghost" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {searchTerm && (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {results.length > 0 ? (
                      results.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent cursor-pointer"
                        >
                          {getResultIcon(result.type)}
                          <div className="flex-1">
                            {result.type === 'campaign' ? (
                              <div>
                                <p className="font-medium">{result.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {result.platform} • {result.status} • ${result.budget.toLocaleString()} budget
                                </p>
                              </div>
                            ) : (
                              <div>
                                <p className="font-medium">${result.revenue.toLocaleString()} Revenue</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(result.date).toLocaleDateString()} • {result.users} users
                                </p>
                              </div>
                            )}
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {result.type}
                          </Badge>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No results found for "{searchTerm}"</p>
                      </div>
                    )}
                  </div>
                )}

                {!searchTerm && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Start typing to search campaigns, revenue data, and metrics</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}