import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Brain, Users, Target, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl font-bold mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ReviewAI
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering businesses with AI-driven insights from customer feedback
            </p>
          </div>

          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              ReviewAI was born from a simple observation: businesses were drowning in customer feedback 
              but struggling to extract meaningful insights. We built ReviewAI to bridge that gap, using 
              advanced AI to transform reviews into actionable intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Card className="p-6 bg-card/50 border-primary/20 hover:glow-primary transition-all">
              <Brain className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">
                Our advanced machine learning models analyze sentiment, extract trends, and generate 
                insights with unprecedented accuracy.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 border-primary/20 hover:glow-primary transition-all">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Customer-Focused</h3>
              <p className="text-muted-foreground">
                We believe in putting customers first. Our tools help you understand and respond to 
                customer needs more effectively.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 border-primary/20 hover:glow-primary transition-all">
              <Target className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Results-Driven</h3>
              <p className="text-muted-foreground">
                Our platform is designed to deliver measurable improvements in customer satisfaction 
                and business performance.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 border-primary/20 hover:glow-primary transition-all">
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Get instant insights and automated responses. Our platform processes thousands of 
                reviews in seconds.
              </p>
            </Card>
          </div>

          <Card className="p-8 bg-card/50 border-primary/20 text-center">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To democratize access to enterprise-grade review analytics, helping businesses of all sizes 
              harness the power of customer feedback to drive growth and improvement.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;