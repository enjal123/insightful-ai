import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Building2, Lock, Bell, CreditCard, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

const DashboardSettings = () => {
  const [name, setName] = useState("John Doe");
  const [businessName, setBusinessName] = useState("My Business");
  const [email, setEmail] = useState("john@example.com");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your account settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences and subscription</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Information */}
        <Card className="p-6 bg-card/50 border-primary/20">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Account Information
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="mb-2 block">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="business" className="mb-2 block">Business Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="business" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="mb-2 block">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
              </div>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-6 bg-card/50 border-primary/20">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Security
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password" className="mb-2 block">Current Password</Label>
              <Input id="current-password" type="password" placeholder="Enter current password" />
            </div>
            <div>
              <Label htmlFor="new-password" className="mb-2 block">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="mb-2 block">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" />
            </div>
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6 bg-card/50 border-primary/20">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Preferences
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Theme</p>
                <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                >
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                >
                  Dark
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive alerts for negative reviews</p>
              </div>
              <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Response Reminders</p>
                <p className="text-sm text-muted-foreground">Get reminded about unreplied reviews</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Subscription */}
        <Card className="p-6 bg-card/50 border-primary/20">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Subscription
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <p className="font-semibold">Current Plan</p>
                <p className="text-sm text-muted-foreground">Pro Plan</p>
              </div>
              <Badge className="glow-primary">Active</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">AI Replies Used</span>
                <span className="font-semibold">25 / 50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Billing Cycle</span>
                <span className="font-semibold">Monthly</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Billing Date</span>
                <span className="font-semibold">May 15, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold">$49.00</span>
              </div>
            </div>
            <div className="pt-3 space-y-2">
              <Button variant="outline" className="w-full">
                Upgrade Plan
              </Button>
              <Button variant="ghost" className="w-full text-destructive hover:text-destructive">
                Cancel Subscription
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Connected Accounts */}
      <Card className="p-6 bg-card/50 border-primary/20">
        <h3 className="text-lg font-bold mb-6">Connected Review Platforms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-lg">G</span>
              </div>
              <div>
                <p className="font-semibold">Google Business</p>
                <p className="text-xs text-muted-foreground">Connected</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Disconnect</Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-lg">Y</span>
              </div>
              <div>
                <p className="font-semibold">Yelp</p>
                <p className="text-xs text-muted-foreground">Not Connected</p>
              </div>
            </div>
            <Button size="sm" className="glow-primary">Connect</Button>
          </div>
        </div>
      </Card>

      <Button onClick={handleSave} className="w-full glow-primary">
        <Save className="w-4 h-4 mr-2" />
        Save All Changes
      </Button>
    </div>
  );
};

export default DashboardSettings;
