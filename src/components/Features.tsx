import { Brain, MessageSquare, TrendingUp, Zap, Shield, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze sentiment, trends, and insights from thousands of reviews instantly.",
  },
  {
    icon: MessageSquare,
    title: "Automated Responses",
    description: "Generate personalized, on-brand responses to customer reviews automatically, saving hours of manual work.",
  },
  {
    icon: TrendingUp,
    title: "Trend Forecasting",
    description: "Identify emerging patterns and predict future trends to stay ahead of customer expectations.",
  },
  {
    icon: Zap,
    title: "Real-Time Insights",
    description: "Get instant notifications about critical reviews and actionable insights as they happen.",
  },
  {
    icon: Shield,
    title: "Reputation Protection",
    description: "Proactively manage your online reputation with priority alerts for negative feedback.",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Beautiful, interactive dashboards that turn complex data into clear, actionable insights.",
  },
];

const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ReviewAI
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to turn customer feedback into your competitive advantage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:glow-primary group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;