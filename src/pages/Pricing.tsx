import Navigation from "@/components/Navigation";
import PricingSection from "@/components/Pricing";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <PricingSection />
      </div>
      
      <footer className="border-t border-border/50 py-12 mt-16">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2024 ReviewAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
