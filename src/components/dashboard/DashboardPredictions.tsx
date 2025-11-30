import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, AlertTriangle, Info } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const predictionData = {
  rating: [
    { name: "May", actual: 4.6, predicted: 4.7 },
    { name: "Jun", predicted: 4.8 },
    { name: "Jul", predicted: 4.9 },
  ],
  negativeReviews: [
    { name: "May", actual: 18, predicted: 15 },
    { name: "Jun", predicted: 12 },
    { name: "Jul", predicted: 10 },
  ],
  responseRate: [
    { name: "May", actual: 92, predicted: 94 },
    { name: "Jun", predicted: 95 },
    { name: "Jul", predicted: 97 },
  ],
  sentiment: [
    { name: "May", positive: 80, neutral: 15, negative: 5 },
    { name: "Jun", positive: 82, neutral: 13, negative: 5 },
    { name: "Jul", positive: 85, neutral: 12, negative: 3 },
  ],
};

const DashboardPredictions = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Future Predictions</h2>
          <p className="text-muted-foreground">AI-powered forecasts based on your review trends</p>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="service">Service</SelectItem>
            <SelectItem value="quality">Quality</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="ambiance">Ambiance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Alert Banner */}
      <Card className="p-4 bg-primary/10 border-primary/30">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-semibold text-primary">Trending Positive</p>
            <p className="text-sm text-muted-foreground">Your ratings are predicted to improve by 0.3 points over the next quarter based on current trends.</p>
          </div>
        </div>
      </Card>

      {/* Prediction Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Average Rating Prediction */}
        <Card className="p-6 bg-card/50 border-primary/20">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Predicted Average Rating
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={predictionData.rating}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={[4, 5]} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="hsl(150 45% 45%)" strokeWidth={2} name="Actual" />
              <Line type="monotone" dataKey="predicted" stroke="hsl(150 45% 65%)" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Negative Reviews Prediction */}
        <Card className="p-6 bg-card/50 border-primary/20">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Predicted Negative Reviews
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={predictionData.negativeReviews}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="hsl(0 65% 50%)" strokeWidth={2} name="Actual" />
              <Line type="monotone" dataKey="predicted" stroke="hsl(0 65% 70%)" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Response Rate Prediction */}
        <Card className="p-6 bg-card/50 border-primary/20">
          <h3 className="text-lg font-bold mb-4">Predicted Response Rate</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={predictionData.responseRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={[80, 100]} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="hsl(150 45% 45%)" strokeWidth={2} name="Actual" />
              <Line type="monotone" dataKey="predicted" stroke="hsl(150 45% 65%)" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Overall Sentiment Prediction */}
        <Card className="p-6 bg-card/50 border-primary/20">
          <h3 className="text-lg font-bold mb-4">Predicted Sentiment Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={predictionData.sentiment}>
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
      </div>

      {/* Insights */}
      <Card className="p-6 bg-card/50 border-primary/20">
        <h3 className="text-lg font-bold mb-4">AI-Generated Insights</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
            <p className="text-sm">Your response rate is trending upward. Maintain this momentum to reach 97% by July.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
            <p className="text-sm">Negative reviews are decreasing steadily. Continue focusing on wait times to accelerate this trend.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
            <p className="text-sm">Service quality improvements are driving positive sentiment. Consider highlighting this in marketing.</p>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default DashboardPredictions;
