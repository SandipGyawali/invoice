'use client';
import { useState } from 'react';
import {
  FileText,
  Plus,
  TrendingUp,
  Users,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
  Activity,
  BarChart,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@invoice/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@invoice/ui/card';
import { SidebarTrigger } from '@invoice/ui/sidebar';
import { Progress } from '@invoice/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@invoice/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@invoice/ui/select';

// Enhanced sample data
const invoices = [
  {
    id: 'INV-001',
    client: 'Acme Corp',
    amount: 2500.0,
    status: 'paid',
    dueDate: '2024-01-15',
    issueDate: '2024-01-01',
    category: 'Consulting',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'INV-002',
    client: 'TechStart Inc',
    amount: 1800.0,
    status: 'pending',
    dueDate: '2024-01-20',
    issueDate: '2024-01-05',
    category: 'Development',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'INV-003',
    client: 'Global Solutions',
    amount: 3200.0,
    status: 'overdue',
    dueDate: '2024-01-10',
    issueDate: '2023-12-25',
    category: 'Design',
    paymentMethod: 'PayPal',
  },
  {
    id: 'INV-004',
    client: 'StartupXYZ',
    amount: 950.0,
    status: 'draft',
    dueDate: '2024-01-25',
    issueDate: '2024-01-08',
    category: 'Marketing',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'INV-005',
    client: 'Enterprise Ltd',
    amount: 4500.0,
    status: 'paid',
    dueDate: '2024-01-18',
    issueDate: '2024-01-03',
    category: 'Consulting',
    paymentMethod: 'Wire Transfer',
  },
  {
    id: 'INV-006',
    client: 'Innovation Hub',
    amount: 1200.0,
    status: 'pending',
    dueDate: '2024-01-22',
    issueDate: '2024-01-07',
    category: 'Development',
    paymentMethod: 'Credit Card',
  },
];

// Monthly revenue data for charts
const monthlyData = [
  { month: 'Jan', revenue: 12500, invoices: 45, paid: 38, pending: 7 },
  { month: 'Feb', revenue: 15200, invoices: 52, paid: 47, pending: 5 },
  { month: 'Mar', revenue: 18900, invoices: 61, paid: 55, pending: 6 },
  { month: 'Apr', revenue: 16800, invoices: 58, paid: 51, pending: 7 },
  { month: 'May', revenue: 21300, invoices: 67, paid: 62, pending: 5 },
  { month: 'Jun', revenue: 19600, invoices: 63, paid: 58, pending: 5 },
];

// Client performance data
const topClients = [
  { name: 'Enterprise Ltd', revenue: 12500, invoices: 8, growth: 15.2 },
  { name: 'Global Solutions', revenue: 9800, invoices: 6, growth: -2.1 },
  { name: 'Acme Corp', revenue: 8900, invoices: 12, growth: 8.7 },
  { name: 'TechStart Inc', revenue: 7200, invoices: 9, growth: 22.3 },
  { name: 'Innovation Hub', revenue: 5600, invoices: 7, growth: 5.8 },
];

// Simple chart components (since we can't use external chart libraries)
function SimpleBarChart({ data }: { data: any[] }) {
  const maxValue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="flex items-end justify-between h-32 gap-2">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-1 flex-1">
          <div
            className="bg-blue-500 rounded-t w-full transition-all hover:bg-blue-600"
            style={{ height: `${(item.revenue / maxValue) * 100}%` }}
          />
          <span className="text-xs text-muted-foreground">{item.month}</span>
        </div>
      ))}
    </div>
  );
}

function SimpleLineChart({ data }: { data: any[] }) {
  const maxValue = Math.max(...data.map((d) => d.invoices));

  return (
    <div className="flex items-end justify-between h-32 gap-2">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-1 flex-1">
          <div className="relative w-full">
            <div
              className="bg-green-500 rounded-full w-2 h-2 mx-auto transition-all"
              style={{
                marginTop: `${100 - (item.invoices / maxValue) * 100}%`,
              }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{item.month}</span>
        </div>
      ))}
    </div>
  );
}

function AdvancedInvoiceDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedView, setSelectedView] = useState('overview');

  const totalRevenue = invoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );
  const paidInvoices = invoices.filter((inv) => inv.status === 'paid');
  const pendingInvoices = invoices.filter((inv) => inv.status === 'pending');
  const overdueInvoices = invoices.filter((inv) => inv.status === 'overdue');
  const draftInvoices = invoices.filter((inv) => inv.status === 'draft');

  // Calculate growth percentages (simulated)
  const revenueGrowth = 12.5;
  const invoiceGrowth = 8.3;
  const clientGrowth = 15.2;
  const collectionRate = 94.2;

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </div>
        <div className="ml-auto flex items-center gap-2 px-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        {/* Advanced Key Metrics */}
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <div className="flex items-center gap-1">
                {revenueGrowth > 0 ? (
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-red-600" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span
                  className={
                    revenueGrowth > 0 ? 'text-green-600' : 'text-red-600'
                  }
                >
                  {revenueGrowth > 0 ? '+' : ''}
                  {revenueGrowth}%
                </span>
                from last month
              </p>
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
                <TrendingUp className="w-full h-full" />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Invoices
              </CardTitle>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{invoices.length}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="text-green-600">+{invoiceGrowth}%</span>
                from last month
              </p>
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
                <FileText className="w-full h-full" />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Collection Rate
              </CardTitle>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{collectionRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.1%</span> from last month
              </p>
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
                <Target className="w-full h-full" />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Payment Time
              </CardTitle>
              <div className="flex items-center gap-1">
                <ArrowDownRight className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.5 days</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-2.3 days</span> improvement
              </p>
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
                <Clock className="w-full h-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Analytics Tabs */}
        <Tabs
          value={selectedView}
          onValueChange={setSelectedView}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 lg:grid-cols-3">
              {/* Revenue Trend */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Revenue Trend</CardTitle>
                      <CardDescription>
                        Monthly revenue over the last 6 months
                      </CardDescription>
                    </div>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <SimpleBarChart data={monthlyData} />
                </CardContent>
              </Card>

              {/* Invoice Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Status</CardTitle>
                  <CardDescription>
                    Current invoice distribution
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Paid</span>
                      </div>
                      <span className="text-sm font-medium">
                        {paidInvoices.length}
                      </span>
                    </div>
                    <Progress
                      value={(paidInvoices.length / invoices.length) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">Pending</span>
                      </div>
                      <span className="text-sm font-medium">
                        {pendingInvoices.length}
                      </span>
                    </div>
                    <Progress
                      value={(pendingInvoices.length / invoices.length) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm">Overdue</span>
                      </div>
                      <span className="text-sm font-medium">
                        {overdueInvoices.length}
                      </span>
                    </div>
                    <Progress
                      value={(overdueInvoices.length / invoices.length) * 100}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Clients Performance */}
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Top Clients Performance</CardTitle>
                      <CardDescription>
                        Revenue and growth by client
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topClients.map((client, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{client.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {client.invoices} invoices
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            ${client.revenue.toLocaleString()}
                          </p>
                          <div
                            className={`text-xs flex items-center justify-end gap-1 ${
                              client.growth > 0
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {client.growth > 0 ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {client.growth > 0 ? '+' : ''}
                            {client.growth}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                  <CardDescription>Service category breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Consulting', 'Development', 'Design', 'Marketing'].map(
                      (category, index) => {
                        const categoryInvoices = invoices.filter(
                          (inv) => inv.category === category
                        );
                        const categoryRevenue = categoryInvoices.reduce(
                          (sum, inv) => sum + inv.amount,
                          0
                        );
                        const percentage =
                          (categoryRevenue / totalRevenue) * 100;
                        const colors = [
                          'bg-blue-500',
                          'bg-green-500',
                          'bg-purple-500',
                          'bg-orange-500',
                        ];

                        return (
                          <div key={category} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-3 h-3 rounded-full ${colors[index]}`}
                                />
                                <span className="text-sm font-medium">
                                  {category}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-semibold">
                                  ${categoryRevenue.toLocaleString()}
                                </span>
                                <span className="text-xs text-muted-foreground ml-2">
                                  ({percentage.toFixed(1)}%)
                                </span>
                              </div>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      }
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Volume Trend</CardTitle>
                  <CardDescription>
                    Number of invoices created monthly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SimpleLineChart data={monthlyData} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Distribution of payment methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    'Bank Transfer',
                    'Credit Card',
                    'PayPal',
                    'Wire Transfer',
                  ].map((method, index) => {
                    const count = invoices.filter(
                      (inv) => inv.paymentMethod === method
                    ).length;
                    const percentage = (count / invoices.length) * 100;
                    return (
                      <div key={method} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">{method}</span>
                          <span className="text-sm font-medium">
                            {count} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Collection Efficiency</CardTitle>
                  <CardDescription>
                    Average days to collect payment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">18.5</div>
                  <p className="text-sm text-muted-foreground">days average</p>
                  <div className="mt-4">
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      25% faster than industry average
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Invoice Accuracy</CardTitle>
                  <CardDescription>Invoices without disputes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">98.2%</div>
                  <p className="text-sm text-muted-foreground">accuracy rate</p>
                  <div className="mt-4">
                    <Progress value={98.2} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Excellent performance
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Satisfaction</CardTitle>
                  <CardDescription>Based on payment behavior</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4.8/5</div>
                  <p className="text-sm text-muted-foreground">
                    satisfaction score
                  </p>
                  <div className="mt-4">
                    <Progress value={96} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on 127 interactions
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>AI Insights</CardTitle>
                  <CardDescription>
                    Automated business intelligence
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Revenue Opportunity
                      </p>
                      <p className="text-sm text-blue-700">
                        Following up on 3 overdue invoices could recover $8,400
                        this week.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">
                        Growth Pattern
                      </p>
                      <p className="text-sm text-green-700">
                        Enterprise clients show 23% higher payment reliability.
                        Consider targeting similar prospects.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900">Risk Alert</p>
                      <p className="text-sm text-yellow-700">
                        2 clients have extended payment delays. Consider
                        adjusting credit terms.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>
                    Action items to improve performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <div className="flex-1">
                      <p className="font-medium">High Priority</p>
                      <p className="text-sm text-muted-foreground">
                        Send payment reminders for 3 overdue invoices
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Act
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <div className="flex-1">
                      <p className="font-medium">Medium Priority</p>
                      <p className="text-sm text-muted-foreground">
                        Update payment terms for 2 slow-paying clients
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <div className="flex-1">
                      <p className="font-medium">Low Priority</p>
                      <p className="text-sm text-muted-foreground">
                        Optimize invoice templates for faster processing
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest invoice and payment activities
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Activity className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  {
                    action: 'Payment received',
                    client: 'Enterprise Ltd',
                    amount: '$4,500',
                    time: '2 min ago',
                    type: 'payment',
                  },
                  {
                    action: 'Invoice sent',
                    client: 'TechStart Inc',
                    amount: '$1,800',
                    time: '1 hr ago',
                    type: 'invoice',
                  },
                  {
                    action: 'Payment overdue',
                    client: 'Global Solutions',
                    amount: '$3,200',
                    time: '2 hrs ago',
                    type: 'overdue',
                  },
                  {
                    action: 'Invoice created',
                    client: 'Innovation Hub',
                    amount: '$1,200',
                    time: '3 hrs ago',
                    type: 'invoice',
                  },
                  {
                    action: 'Payment received',
                    client: 'Acme Corp',
                    amount: '$2,500',
                    time: '5 hrs ago',
                    type: 'payment',
                  },
                  {
                    action: 'Invoice updated',
                    client: 'StartupXYZ',
                    amount: '$950',
                    time: '6 hrs ago',
                    type: 'invoice',
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={`h-2 w-2 rounded-full flex-shrink-0 ${
                        activity.type === 'payment'
                          ? 'bg-green-500'
                          : activity.type === 'overdue'
                          ? 'bg-red-500'
                          : 'bg-blue-500'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">
                          {activity.action}
                        </p>
                        <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                          {activity.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate">
                          {activity.client}
                        </p>
                        <span className="text-xs font-semibold flex-shrink-0 ml-2">
                          {activity.amount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Today&nbsp;s summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-100">
                <div>
                  <p className="text-sm font-medium text-green-900">
                    Payments Today
                  </p>
                  <p className="text-lg font-bold text-green-900">$7,000</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-100">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Invoices Sent
                  </p>
                  <p className="text-lg font-bold text-blue-900">12</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-100">
                <div>
                  <p className="text-sm font-medium text-yellow-900">
                    Follow-ups Due
                  </p>
                  <p className="text-lg font-bold text-yellow-900">3</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-purple-100">
                <div>
                  <p className="text-sm font-medium text-purple-900">
                    New Clients
                  </p>
                  <p className="text-lg font-bold text-purple-900">2</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default AdvancedInvoiceDashboard;
