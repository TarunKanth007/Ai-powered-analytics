// lib/mockData.ts

// Define a union type for the 'trend' property
export type TrendDirection = "up" | "down";

// Define the interface for a single metric item
export interface Metric {
  value: number;
  growth: number;
  trend: TrendDirection; // This is the crucial change
  previousValue?: number;
  target?: number;
  currency?: string;
  newUsers?: number;
  returningUsers?: number;
  industryAvg?: number;
  median?: number;
}

// Define the interface for the overall keyMetrics object
export interface KeyMetricsData {
  totalRevenue: Metric;
  totalUsers: Metric;
  conversionRate: Metric;
  avgOrderValue: Metric;
}

// Enhanced mock data for the advanced analytics dashboard
export const keyMetrics: KeyMetricsData = { // Explicitly type keyMetrics
  totalRevenue: {
    value: 145820,
    growth: 12.5,
    trend: 'up',
    previousValue: 129640,
    target: 160000,
    currency: 'USD'
  },
  totalUsers: {
    value: 32450,
    growth: 8.2,
    trend: 'up',
    previousValue: 29980,
    target: 35000,
    newUsers: 8420,
    returningUsers: 24030
  },
  conversionRate: {
    value: 3.24,
    growth: -2.1,
    trend: 'down',
    previousValue: 3.31,
    target: 3.5,
    industryAvg: 2.86
  },
  avgOrderValue: {
    value: 89.50,
    growth: 15.3,
    trend: 'up',
    previousValue: 77.65,
    target: 95.00,
    median: 67.30
  }
};

// --- Other Data Interfaces ---

export interface RevenueDataItem {
  date: string;
  revenue: number;
  users: number;
  conversions: number;
  orders: number;
  traffic: number;
}

export const revenueData: RevenueDataItem[] = [
  { date: '2024-01-01', revenue: 12000, users: 2400, conversions: 240, orders: 134, traffic: 4800 },
  { date: '2024-01-02', revenue: 15000, users: 2800, conversions: 280, orders: 167, traffic: 5200 },
  { date: '2024-01-03', revenue: 18000, users: 3200, conversions: 320, orders: 201, traffic: 5800 },
  { date: '2024-01-04', revenue: 14000, users: 2600, conversions: 260, orders: 156, traffic: 4900 },
  { date: '2024-01-05', revenue: 16000, users: 3000, conversions: 300, orders: 178, traffic: 5400 },
  { date: '2024-01-06', revenue: 22000, users: 3800, conversions: 380, orders: 245, traffic: 6200 },
  { date: '2024-01-07', revenue: 25000, users: 4200, conversions: 420, orders: 279, traffic: 6800 },
  { date: '2024-01-08', revenue: 20000, users: 3600, conversions: 360, orders: 223, traffic: 5900 },
  { date: '2024-01-09', revenue: 23000, users: 4000, conversions: 400, orders: 256, traffic: 6400 },
  { date: '2024-01-10', revenue: 27000, users: 4500, conversions: 450, orders: 301, traffic: 7100 },
  { date: '2024-01-11', revenue: 24000, users: 4100, conversions: 410, orders: 267, traffic: 6600 },
  { date: '2024-01-12', revenue: 26000, users: 4300, conversions: 430, orders: 289, traffic: 6900 },
  { date: '2024-01-13', revenue: 29000, users: 4800, conversions: 480, orders: 323, traffic: 7400 },
  { date: '2024-01-14', revenue: 31000, users: 5000, conversions: 500, orders: 345, traffic: 7800 }
];

export interface TrafficSourceDataItem {
  name: string;
  value: number;
  fill: string;
  users: number;
  sessions: number;
}

export const trafficSourceData: TrafficSourceDataItem[] = [
  { name: 'Organic Search', value: 45, fill: '#3B82F6', users: 14625, sessions: 18200 },
  { name: 'Social Media', value: 25, fill: '#10B981', users: 8112, sessions: 10140 },
  { name: 'Direct', value: 15, fill: '#8B5CF6', users: 4868, sessions: 6084 },
  { name: 'Email', value: 10, fill: '#F59E0B', users: 3245, sessions: 4056 },
  { name: 'Referral', value: 5, fill: '#EF4444', users: 1623, sessions: 2028 }
];

export interface DailyCampaignData {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
}

export interface CampaignDataItem {
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
  dailyData: DailyCampaignData[];
}

export const campaignData: CampaignDataItem[] = [
  {
    id: 1,
    name: 'Summer Sale Campaign',
    status: 'Active',
    budget: 5000,
    spent: 3420,
    impressions: 125000,
    clicks: 3250,
    conversions: 89,
    ctr: 2.6,
    cpc: 1.05,
    roas: 4.2,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    targetAudience: 'Young Adults 18-35',
    platform: 'Google Ads',
    objective: 'Sales',
    dailyData: [
      { date: '2024-01-01', impressions: 8500, clicks: 221, conversions: 6, spend: 232 },
      { date: '2024-01-02', impressions: 9200, clicks: 239, conversions: 7, spend: 251 },
      { date: '2024-01-03', impressions: 8800, clicks: 229, conversions: 5, spend: 240 },
      { date: '2024-01-04', impressions: 9500, clicks: 247, conversions: 8, spend: 259 },
      { date: '2024-01-05', impressions: 8900, clicks: 231, conversions: 6, spend: 243 }
    ]
  },
  {
    id: 2,
    name: 'Black Friday Promotion',
    status: 'Completed',
    budget: 8000,
    spent: 7850,
    impressions: 200000,
    clicks: 5500,
    conversions: 156,
    ctr: 2.75,
    cpc: 1.43,
    roas: 5.8,
    startDate: '2023-11-20',
    endDate: '2023-11-30',
    targetAudience: 'All Demographics',
    platform: 'Facebook Ads',
    objective: 'Conversions',
    dailyData: [
      { date: '2023-11-20', impressions: 18000, clicks: 495, conversions: 14, spend: 708 },
      { date: '2023-11-21', impressions: 19500, clicks: 536, conversions: 16, spend: 767 },
      { date: '2023-11-22', impressions: 20200, clicks: 556, conversions: 17, spend: 795 },
      { date: '2023-11-23', impressions: 21000, clicks: 578, conversions: 18, spend: 827 },
      { date: '2023-11-24', impressions: 22500, clicks: 619, conversions: 20, spend: 885 }
    ]
  },
  {
    id: 3,
    name: 'New Product Launch',
    status: 'Active',
    budget: 3000,
    spent: 1250,
    impressions: 75000,
    clicks: 1875,
    conversions: 42,
    ctr: 2.5,
    cpc: 0.67,
    roas: 3.1,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    targetAudience: 'Tech Enthusiasts 25-45',
    platform: 'LinkedIn Ads',
    objective: 'Brand Awareness',
    dailyData: [
      { date: '2024-01-15', impressions: 5200, clicks: 130, conversions: 3, spend: 87 },
      { date: '2024-01-16', impressions: 5500, clicks: 138, conversions: 4, spend: 92 },
      { date: '2024-01-17', impressions: 5100, clicks: 128, conversions: 2, spend: 86 },
      { date: '2024-01-18', impressions: 5800, clicks: 145, conversions: 4, spend: 97 },
      { date: '2024-01-19', impressions: 5400, clicks: 135, conversions: 3, spend: 90 }
    ]
  },
  {
    id: 4,
    name: 'Holiday Campaign',
    status: 'Paused',
    budget: 6000,
    spent: 4200,
    impressions: 150000,
    clicks: 4200,
    conversions: 98,
    ctr: 2.8,
    cpc: 1.0,
    roas: 4.5,
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    targetAudience: 'Families 30-55',
    platform: 'Google Ads',
    objective: 'Sales',
    dailyData: [
      { date: '2023-12-01', impressions: 4800, clicks: 134, conversions: 3, spend: 134 },
      { date: '2023-12-02', impressions: 5200, clicks: 146, conversions: 4, spend: 146 },
      { date: '2023-12-03', impressions: 4900, clicks: 137, conversions: 3, spend: 137 },
      { date: '2023-12-04', impressions: 5400, clicks: 151, conversions: 4, spend: 151 },
      { date: '2023-12-05', impressions: 5100, clicks: 143, conversions: 3, spend: 143 }
    ]
  },
  {
    id: 5,
    name: 'Retargeting Campaign',
    status: 'Active',
    budget: 2500,
    spent: 1980,
    impressions: 85000,
    clicks: 2550,
    conversions: 78,
    ctr: 3.0,
    cpc: 0.78,
    roas: 6.2,
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    targetAudience: 'Previous Visitors',
    platform: 'Facebook Ads',
    objective: 'Retargeting',
    dailyData: [
      { date: '2024-01-10', impressions: 2800, clicks: 84, conversions: 3, spend: 65 },
      { date: '2024-01-11', impressions: 3100, clicks: 93, conversions: 3, spend: 73 },
      { date: '2024-01-12', impressions: 2900, clicks: 87, conversions: 2, spend: 68 },
      { date: '2024-01-13', impressions: 3200, clicks: 96, conversions: 4, spend: 75 },
      { date: '2024-01-14', impressions: 3000, clicks: 90, conversions: 3, spend: 70 }
    ]
  },
  {
    id: 6,
    name: 'Brand Awareness',
    status: 'Active',
    budget: 4000,
    spent: 2100,
    impressions: 180000,
    clicks: 3600,
    conversions: 54,
    ctr: 2.0,
    cpc: 0.58,
    roas: 2.8,
    startDate: '2024-01-05',
    endDate: '2024-02-05',
    targetAudience: 'Broad Audience 18-65',
    platform: 'Google Ads',
    objective: 'Brand Awareness',
    dailyData: [
      { date: '2024-01-05', impressions: 6000, clicks: 120, conversions: 2, spend: 70 },
      { date: '2024-01-06', impressions: 6500, clicks: 130, conversions: 2, spend: 75 },
      { date: '2024-01-07', impressions: 6200, clicks: 124, conversions: 1, spend: 72 },
      { date: '2024-01-08', impressions: 6800, clicks: 136, conversions: 2, spend: 79 },
      { date: '2024-01-09', impressions: 6400, clicks: 128, conversions: 2, spend: 74 }
    ]
  }
];

export interface MonthlyGrowthDataItem {
  month: string;
  growth: number;
  revenue: number;
  users: number;
}

export const monthlyGrowthData: MonthlyGrowthDataItem[] = [
  { month: 'Jan', growth: 5.2, revenue: 145000, users: 12400 },
  { month: 'Feb', growth: 8.1, revenue: 156800, users: 13420 },
  { month: 'Mar', growth: 12.5, revenue: 176400, users: 15100 },
  { month: 'Apr', growth: 15.3, revenue: 203400, users: 17400 },
  { month: 'May', growth: 18.7, revenue: 241500, users: 20700 },
  { month: 'Jun', growth: 22.1, revenue: 294800, users: 25300 },
  { month: 'Jul', growth: 19.8, revenue: 353200, users: 30300 },
  { month: 'Aug', growth: 23.4, revenue: 436100, users: 37400 },
  { month: 'Sep', growth: 26.9, revenue: 553600, users: 47500 },
  { month: 'Oct', growth: 24.5, revenue: 689000, users: 59100 },
  { month: 'Nov', growth: 28.3, revenue: 883700, users: 75800 },
  { month: 'Dec', growth: 31.2, revenue: 1159400, users: 99500 }
];

export interface PerformanceOverview {
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  pausedCampaigns: number;
  totalBudget: number;
  totalSpent: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  averageCTR: number;
  averageCPC: number;
  averageROAS: number;
}

export interface TopPerformer {
  metric: string;
  campaign: string;
  value: string;
}

export interface Recommendation {
  type: 'optimization' | 'warning' | 'opportunity';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  estimatedGain: string;
}

export interface PerformanceSummaryData {
  overview: PerformanceOverview;
  topPerformers: TopPerformer[];
  recommendations: Recommendation[];
}

export const performanceSummaryData: PerformanceSummaryData = {
  overview: {
    totalCampaigns: 6,
    activeCampaigns: 4,
    completedCampaigns: 1,
    pausedCampaigns: 1,
    totalBudget: 28500,
    totalSpent: 20800,
    totalImpressions: 815000,
    totalClicks: 20975,
    totalConversions: 517,
    averageCTR: 2.57,
    averageCPC: 0.99,
    averageROAS: 4.43
  },
  topPerformers: [
    { metric: 'Highest ROAS', campaign: 'Retargeting Campaign', value: '6.2x' },
    { metric: 'Best CTR', campaign: 'Holiday Campaign', value: '2.8%' },
    { metric: 'Most Conversions', campaign: 'Black Friday Promotion', value: '156' },
    { metric: 'Lowest CPC', campaign: 'Brand Awareness', value: '$0.58' }
  ],
  recommendations: [
    {
      type: 'optimization',
      title: 'Increase Budget for Retargeting',
      description: 'Your retargeting campaign has the highest ROAS at 6.2x. Consider increasing its budget by 50%.',
      impact: 'High',
      estimatedGain: '+$2,400 revenue'
    },
    {
      type: 'warning',
      title: 'Low Conversion Rate Alert',
      description: 'New Product Launch campaign has a conversion rate below target. Review ad creative and landing page.',
      impact: 'Medium',
      estimatedGain: '+15 conversions'
    },
    {
      type: 'opportunity',
      title: 'Expand Successful Keywords',
      description: 'Summer Sale campaign keywords are performing well. Expand to similar terms.',
      impact: 'Medium',
      estimatedGain: '+$1,800 revenue'
    }
  ]
};

// User-added data storage
export let userAddedData: {
  revenue: RevenueDataItem[];
  campaigns: CampaignDataItem[];
  metrics: { [key: string]: Metric }; // Ensure metrics can store dynamically added Metric types
} = {
  revenue: [],
  campaigns: [],
  metrics: {}
};

export const addUserData = (type: 'revenue' | 'campaign' | 'metrics', data: any) => { // 'any' for data for flexibility, but ideally more specific
  if (type === 'revenue') {
    userAddedData.revenue.push(data as RevenueDataItem); // Type assertion
  } else if (type === 'campaign') {
    userAddedData.campaigns.push(data as CampaignDataItem); // Type assertion
  } else if (type === 'metrics') {
    // Ensure that added metrics also conform to the Metric type
    userAddedData.metrics = { ...userAddedData.metrics, ...data as { [key: string]: Metric } };
  }
};

export const getUserData = () => userAddedData;

export const clearUserData = (type: 'revenue' | 'campaign' | 'metrics' | 'all') => {
  if (type === 'revenue') {
    userAddedData.revenue = [];
  } else if (type === 'campaign') {
    userAddedData.campaigns = [];
  } else if (type === 'metrics') {
    userAddedData.metrics = {};
  } else if (type === 'all') {
    userAddedData = { revenue: [], campaigns: [], metrics: {} };
  }
};
