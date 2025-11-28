import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Features />
      <Pricing />
      
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2024 ReviewAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
