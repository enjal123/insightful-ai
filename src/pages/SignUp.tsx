import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";

const plans = [
  { name: "Starter", price: "$19" },
  { name: "Pro", price: "$49" },
  { name: "Enterprise", price: "$99" },
];

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate signup
    setTimeout(() => {
      toast({
        title: "Account created!",
        description: "Your free trial has started.",
      });
      navigate("/dashboard");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 gradient-hero">
      <Card className="w-full max-w-2xl p-8 bg-card/80 backdrop-blur-lg border-primary/20 animate-fade-in-up">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <Sparkles className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ReviewAI
          </span>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Start Your Free Trial</h1>
          <p className="text-muted-foreground">No credit card required • 1 month free</p>
        </div>

        <Tabs value={step === 1 ? "account" : "plan"} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="account" disabled={step !== 1}>
              1. Account Info
            </TabsTrigger>
            <TabsTrigger value="plan" disabled={step !== 2}>
              2. Choose Plan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="My Business"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full glow-primary hover:glow-strong">
                Continue to Plan Selection
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="plan">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <Card
                    key={plan.name}
                    className={`p-6 cursor-pointer transition-all ${
                      selectedPlan === plan.name
                        ? "border-primary glow-primary"
                        : "border-primary/20 hover:border-primary/40"
                    }`}
                    onClick={() => setSelectedPlan(plan.name)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-bold text-lg">{plan.name}</h3>
                      {selectedPlan === plan.name && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <p className="text-3xl font-bold mb-2">{plan.price}</p>
                    <p className="text-sm text-muted-foreground">/month</p>
                  </Card>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <Button
                  type="submit"
                  className="w-full glow-primary hover:glow-strong"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : `Start Free Trial with ${selectedPlan}`}
                </Button>
              </form>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep(1)}
              >
                Back to Account Info
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:text-accent transition-colors font-semibold">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;