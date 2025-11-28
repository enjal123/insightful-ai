import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "$19",
    description: "Perfect for small businesses getting started",
    features: [
      "10 AI review replies per month",
      "Basic sentiment analysis",
      "Dashboard analytics",
      "Email support",
      "Manual reply option",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    description: "For growing businesses that need more power",
    features: [
      "50 AI review replies per month",
      "Advanced trend analysis",
      "Priority issue alerts",
      "Custom AI tone settings",
      "Interactive charts & graphs",
      "Priority support",
      "Bulk reply tools",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "Complete solution for established businesses",
    features: [
      "Unlimited AI replies",
      "Deep trend forecasting",
      "Full dashboard analytics",
      "AI action plan generation",
      "Custom integrations",
      "Dedicated account manager",
      "White-label options",
      "API access",
    ],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Choose the plan that fits your business needs
          </p>
          <p className="text-primary font-semibold">
            🎉 Get 1 month free on any plan!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-8 relative ${
                plan.popular
                  ? "border-primary glow-primary scale-105"
                  : "border-primary/20"
              } transition-all duration-300 hover:glow-primary`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/signup">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "glow-primary"
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Start Free Trial
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;