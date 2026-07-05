export type Trend = 'up' | 'down';

export interface Kpi {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: Trend;
  spark: number[];
  icon: 'revenue' | 'users' | 'orders' | 'conversion';
}

export const kpis: Kpi[] = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '$284,920',
    delta: '+12.4%',
    trend: 'up',
    spark: [12, 18, 14, 22, 19, 28, 24, 32, 30, 38],
    icon: 'revenue',
  },
  {
    id: 'users',
    label: 'Active Users',
    value: '18,402',
    delta: '+8.1%',
    trend: 'up',
    spark: [20, 22, 19, 24, 28, 26, 30, 29, 34, 36],
    icon: 'users',
  },
  {
    id: 'orders',
    label: 'New Orders',
    value: '1,284',
    delta: '-3.2%',
    trend: 'down',
    spark: [30, 28, 26, 27, 24, 22, 23, 21, 20, 19],
    icon: 'orders',
  },
  {
    id: 'conversion',
    label: 'Conversion Rate',
    value: '4.7%',
    delta: '+0.6%',
    trend: 'up',
    spark: [3.2, 3.5, 3.4, 3.8, 4.0, 3.9, 4.2, 4.4, 4.5, 4.7],
    icon: 'conversion',
  },
];

export const revenueSeries = [
  { label: 'Jan', revenue: 42000, target: 38000 },
  { label: 'Feb', revenue: 48000, target: 40000 },
  { label: 'Mar', revenue: 45000, target: 42000 },
  { label: 'Apr', revenue: 56000, target: 45000 },
  { label: 'May', revenue: 61000, target: 50000 },
  { label: 'Jun', revenue: 58000, target: 52000 },
  { label: 'Jul', revenue: 72000, target: 55000 },
  { label: 'Aug', revenue: 68000, target: 58000 },
  { label: 'Sep', revenue: 78000, target: 60000 },
  { label: 'Oct', revenue: 84000, target: 62000 },
  { label: 'Nov', revenue: 91000, target: 65000 },
  { label: 'Dec', revenue: 98000, target: 70000 },
];

export const channelData = [
  { label: 'Organic', value: 42, color: '#3372ff' },
  { label: 'Direct', value: 28, color: '#0fc189' },
  { label: 'Referral', value: 18, color: '#f59e0b' },
  { label: 'Social', value: 12, color: '#f43f5e' },
];

export interface Activity {
  id: string;
  who: string;
  action: string;
  target: string;
  time: string;
  initials: string;
  tone: 'brand' | 'accent' | 'warning' | 'danger';
}

export const activities: Activity[] = [
  { id: 'a1', who: 'Maya Chen', action: 'approved invoice', target: '#INV-2049', time: '2m ago', initials: 'MC', tone: 'brand' },
  { id: 'a2', who: 'Devin Park', action: 'upgraded plan to', target: 'Scale', time: '14m ago', initials: 'DP', tone: 'accent' },
  { id: 'a3', who: 'Lila Ortiz', action: 'refunded order', target: '#ORD-8831', time: '1h ago', initials: 'LO', tone: 'warning' },
  { id: 'a4', who: 'Noah Kim', action: 'flagged a dispute on', target: '#ORD-8820', time: '3h ago', initials: 'NK', tone: 'danger' },
  { id: 'a5', who: 'Priya Shah', action: 'invited a teammate to', target: 'Billing', time: '5h ago', initials: 'PS', tone: 'brand' },
];

export interface Transaction {
  id: string;
  customer: string;
  email: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Refunded';
  method: 'Visa' | 'Mastercard' | 'PayPal' | 'ACH';
  date: string;
}

export const transactions: Transaction[] = [
  { id: 't1', customer: 'Aria Sutton', email: 'aria@northwind.co', amount: '$1,290.00', status: 'Paid', method: 'Visa', date: 'Jul 5' },
  { id: 't2', customer: 'Marcus Lee', email: 'marcus@brightlab.io', amount: '$420.00', status: 'Pending', method: 'PayPal', date: 'Jul 5' },
  { id: 't3', customer: 'Sofia Reyes', email: 'sofia@helix.dev', amount: '$2,840.00', status: 'Paid', method: 'Mastercard', date: 'Jul 4' },
  { id: 't4', customer: 'Theo Walsh', email: 'theo@quill.studio', amount: '$96.50', status: 'Refunded', method: 'Visa', date: 'Jul 4' },
  { id: 't5', customer: 'Ines Costa', email: 'ines@maple.app', amount: '$1,499.00', status: 'Paid', method: 'ACH', date: 'Jul 3' },
  { id: 't6', customer: 'Jonah Pierce', email: 'jonah@driftwave.com', amount: '$310.00', status: 'Pending', method: 'Mastercard', date: 'Jul 3' },
];
