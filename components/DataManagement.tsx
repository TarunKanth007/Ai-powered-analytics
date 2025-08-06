'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Save, Upload, Database } from 'lucide-react';
import { addUserData, clearUserData } from '@/lib/mockData';

interface DataManagementProps {
  onDataUpdate: () => void;
}

export function DataManagement({ onDataUpdate }: DataManagementProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [revenueForm, setRevenueForm] = useState({
    date: '',
    revenue: '',
    users: '',
    conversions: '',
    orders: '',
    traffic: ''
  });
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    budget: '',
    platform: '',
    objective: '',
    targetAudience: '',
    startDate: '',
    endDate: ''
  });

  const handleRevenueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      date: revenueForm.date,
      revenue: parseInt(revenueForm.revenue),
      users: parseInt(revenueForm.users),
      conversions: parseInt(revenueForm.conversions),
      orders: parseInt(revenueForm.orders),
      traffic: parseInt(revenueForm.traffic)
    };
    addUserData('revenue', data);
    setRevenueForm({ date: '', revenue: '', users: '', conversions: '', orders: '', traffic: '' });
    onDataUpdate();
  };

  const handleCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      id: Date.now(),
      name: campaignForm.name,
      status: 'Active',
      budget: parseInt(campaignForm.budget),
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      cpc: 0,
      roas: 0,
      startDate: campaignForm.startDate,
      endDate: campaignForm.endDate,
      targetAudience: campaignForm.targetAudience,
      platform: campaignForm.platform,
      objective: campaignForm.objective,
      dailyData: []
    };
    addUserData('campaign', data);
    setCampaignForm({
      name: '', budget: '', platform: '', objective: '',
      targetAudience: '', startDate: '', endDate: ''
    });
    onDataUpdate();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Database className="mr-2 h-5 w-5" />
          Manage Data
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
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
                    <CardTitle className="text-2xl font-bold">Data Management Center</CardTitle>
                    <Button variant="ghost" onClick={() => setIsOpen(false)}>
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 max-h-[70vh] overflow-y-auto">
                  <Tabs defaultValue="revenue" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="revenue">Revenue Data</TabsTrigger>
                      <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                      <TabsTrigger value="import">Import/Export</TabsTrigger>
                    </TabsList>

                    <TabsContent value="revenue" className="space-y-4">
                      <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleRevenueSubmit}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="date">Date</Label>
                            <Input
                              id="date"
                              type="date"
                              value={revenueForm.date}
                              onChange={(e) => setRevenueForm({...revenueForm, date: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="revenue">Revenue ($)</Label>
                            <Input
                              id="revenue"
                              type="number"
                              value={revenueForm.revenue}
                              onChange={(e) => setRevenueForm({...revenueForm, revenue: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="users">Users</Label>
                            <Input
                              id="users"
                              type="number"
                              value={revenueForm.users}
                              onChange={(e) => setRevenueForm({...revenueForm, users: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="conversions">Conversions</Label>
                            <Input
                              id="conversions"
                              type="number"
                              value={revenueForm.conversions}
                              onChange={(e) => setRevenueForm({...revenueForm, conversions: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="orders">Orders</Label>
                            <Input
                              id="orders"
                              type="number"
                              value={revenueForm.orders}
                              onChange={(e) => setRevenueForm({...revenueForm, orders: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="traffic">Traffic</Label>
                            <Input
                              id="traffic"
                              type="number"
                              value={revenueForm.traffic}
                              onChange={(e) => setRevenueForm({...revenueForm, traffic: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Revenue Data
                        </Button>
                      </motion.form>
                    </TabsContent>

                    <TabsContent value="campaigns" className="space-y-4">
                      <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleCampaignSubmit}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="campaignName">Campaign Name</Label>
                            <Input
                              id="campaignName"
                              value={campaignForm.name}
                              onChange={(e) => setCampaignForm({...campaignForm, name: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="budget">Budget ($)</Label>
                            <Input
                              id="budget"
                              type="number"
                              value={campaignForm.budget}
                              onChange={(e) => setCampaignForm({...campaignForm, budget: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="platform">Platform</Label>
                            <Select onValueChange={(value) => setCampaignForm({...campaignForm, platform: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Google Ads">Google Ads</SelectItem>
                                <SelectItem value="Facebook Ads">Facebook Ads</SelectItem>
                                <SelectItem value="LinkedIn Ads">LinkedIn Ads</SelectItem>
                                <SelectItem value="Twitter Ads">Twitter Ads</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="objective">Objective</Label>
                            <Select onValueChange={(value) => setCampaignForm({...campaignForm, objective: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select objective" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Sales">Sales</SelectItem>
                                <SelectItem value="Conversions">Conversions</SelectItem>
                                <SelectItem value="Brand Awareness">Brand Awareness</SelectItem>
                                <SelectItem value="Retargeting">Retargeting</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                              id="startDate"
                              type="date"
                              value={campaignForm.startDate}
                              onChange={(e) => setCampaignForm({...campaignForm, startDate: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                              id="endDate"
                              type="date"
                              value={campaignForm.endDate}
                              onChange={(e) => setCampaignForm({...campaignForm, endDate: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="targetAudience">Target Audience</Label>
                          <Input
                            id="targetAudience"
                            value={campaignForm.targetAudience}
                            onChange={(e) => setCampaignForm({...campaignForm, targetAudience: e.target.value})}
                            placeholder="e.g., Young Adults 18-35"
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Campaign
                        </Button>
                      </motion.form>
                    </TabsContent>

                    <TabsContent value="import" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-20 flex-col">
                          <Upload className="h-6 w-6 mb-2" />
                          Import CSV
                        </Button>
                        <Button variant="outline" className="h-20 flex-col">
                          <Save className="h-6 w-6 mb-2" />
                          Export Data
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Button
                          variant="destructive"
                          onClick={() => {
                            clearUserData('all');
                            onDataUpdate();
                          }}
                          className="w-full"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Clear All User Data
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}