import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, MessageSquare, Star } from "lucide-react";

const sentimentData = [
  { name: "Jan", positive: 65, neutral: 25, negative: 10 },
  { name: "Feb", positive: 70, neutral: 20, negative: 10 },
  { name: "Mar", positive: 75, neutral: 18, negative: 7 },
  { name: "Apr", positive: 80, neutral: 15, negative: 5 },
];

const categoryData = [
  { name: "Service", value: 35, color: "hsl(150 45% 45%)" },
  { name: "Quality", value: 30, color: "hsl(150 45% 35%)" },
  { name: "Price", value: 20, color: "hsl(150 45% 55%)" },
  { name: "Ambiance", value: 15, color: "hsl(150 35% 40%)" },
];

const DashboardOverview = () => {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-card/50 border-primary/20 hover:border-primary/40 transition-all hover:glow-primary">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Reviews</p>
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">1,234</p>
          <p className="text-sm text-primary flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4" />
            +12% from last month
          </p>
        </Card>

        <Card className="p-6 bg-card/50 border-primary/20 hover:border-primary/40 transition-all hover:glow-primary">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Average Rating</p>
            <Star className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">4.6</p>
          <p className="text-sm text-primary flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4" />
            +0.3 from last month
          </p>
        </Card>

        <Card className="p-6 bg-card/50 border-primary/20 hover:border-primary/40 transition-all hover:glow-primary">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Response Rate</p>
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">92%</p>
          <p className="text-sm text-primary flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4" />
            +5% from last month
          </p>
        </Card>

        <Card className="p-6 bg-card/50 border-primary/20 hover:border-primary/40 transition-all hover:glow-primary">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Negative Reviews</p>
            <TrendingDown className="w-5 h-5 text-destructive" />
          </div>
          <p className="text-3xl font-bold">18</p>
          <p className="text-sm text-destructive flex items-center gap-1 mt-2">
            <TrendingDown className="w-4 h-4" />
            -3 from last month
          </p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sentiment Trend */}
        <Card className="lg:col-span-2 p-6 bg-card/50 border-primary/20">
          <h2 className="text-xl font-bold mb-6">Sentiment Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="positive" stroke="hsl(150 45% 45%)" strokeWidth={2} />
              <Line type="monotone" dataKey="neutral" stroke="hsl(150 35% 40%)" strokeWidth={2} />
              <Line type="monotone" dataKey="negative" stroke="hsl(0 65% 50%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 bg-card/50 border-primary/20">
          <h2 className="text-xl font-bold mb-6">Review Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-card/50 border-primary/20">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Top Strengths
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-semibold">Excellent Customer Service</p>
                <p className="text-sm text-muted-foreground">Mentioned in 78% of positive reviews</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-semibold">High Product Quality</p>
                <p className="text-sm text-muted-foreground">Mentioned in 65% of positive reviews</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-semibold">Fast Response Time</p>
                <p className="text-sm text-muted-foreground">Mentioned in 54% of positive reviews</p>
              </div>
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-card/50 border-destructive/20">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-destructive" />
            Areas for Improvement
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-destructive mt-2" />
              <div>
                <p className="font-semibold">Wait Times</p>
                <p className="text-sm text-muted-foreground">Mentioned in 45% of negative reviews</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-destructive mt-2" />
              <div>
                <p className="font-semibold">Pricing Concerns</p>
                <p className="text-sm text-muted-foreground">Mentioned in 32% of negative reviews</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-destructive mt-2" />
              <div>
                <p className="font-semibold">Mobile App Experience</p>
                <p className="text-sm text-muted-foreground">Mentioned in 28% of negative reviews</p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
