import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const DashboardAutoReplier = () => {
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [signature, setSignature] = useState("");
  const [aiEnabled, setAiEnabled] = useState(true);
  const [customTemplate, setCustomTemplate] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your AI auto-reply settings have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">AI Auto-Replier Settings</h2>
          <p className="text-muted-foreground">Customize how AI generates replies to your reviews</p>
        </div>
        <Badge variant="outline" className="gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          25 AI replies remaining
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings */}
        <div className="space-y-6">
          <Card className="p-6 bg-card/50 border-primary/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Enable AI Replies</h3>
                <p className="text-sm text-muted-foreground">Automatically generate replies using AI</p>
              </div>
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">Reply Tone</Label>
                <RadioGroup value={tone} onValueChange={setTone}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="friendly" id="friendly" />
                    <Label htmlFor="friendly" className="font-normal cursor-pointer">
                      Friendly - Warm and approachable
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="professional" id="professional" />
                    <Label htmlFor="professional" className="font-normal cursor-pointer">
                      Professional - Formal and business-like
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="casual" id="casual" />
                    <Label htmlFor="casual" className="font-normal cursor-pointer">
                      Casual - Relaxed and conversational
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="humorous" id="humorous" />
                    <Label htmlFor="humorous" className="font-normal cursor-pointer">
                      Humorous - Light and playful
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Reply Length</Label>
                <RadioGroup value={length} onValueChange={setLength}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="short" id="short" />
                    <Label htmlFor="short" className="font-normal cursor-pointer">
                      Short - 1-2 sentences
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="font-normal cursor-pointer">
                      Medium - 3-4 sentences
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="long" id="long" />
                    <Label htmlFor="long" className="font-normal cursor-pointer">
                      Long - 5+ sentences
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="signature" className="text-base font-semibold mb-3 block">
                  Signature (Optional)
                </Label>
                <Input
                  id="signature"
                  placeholder="e.g., - The ReviewAI Team"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Will be appended to all AI-generated replies
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 border-primary/20">
            <h3 className="text-lg font-bold mb-3">Custom Template (Optional)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Provide a custom template or guidelines for AI to follow when generating replies
            </p>
            <Textarea
              placeholder="e.g., Always mention our 24/7 customer support and thank customers for their feedback..."
              value={customTemplate}
              onChange={(e) => setCustomTemplate(e.target.value)}
              className="min-h-[120px]"
            />
          </Card>

          <Button onClick={handleSave} className="w-full glow-primary">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card className="p-6 bg-card/50 border-primary/20">
            <h3 className="text-lg font-bold mb-4">Preview</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-4 h-4 text-yellow-500">★</div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">Positive Review</span>
                </div>
                <p className="text-sm mb-3">
                  "Excellent service! The staff was very helpful and professional. Would definitely recommend."
                </p>
                <div className="border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground mb-2">AI-Generated Reply ({tone}, {length}):</p>
                  {tone === "professional" && length === "medium" && (
                    <p className="text-sm">
                      Thank you for your kind words! We're delighted to hear you had a positive experience with our team. 
                      We strive to provide excellent service to all our customers and appreciate you taking the time to share your feedback.
                      {signature && <span className="block mt-2 text-muted-foreground">{signature}</span>}
                    </p>
                  )}
                  {tone === "friendly" && (
                    <p className="text-sm">
                      We're so happy you enjoyed your experience! Our team loves what they do, and it's wonderful to hear that it shows. 
                      Thanks for the awesome review!
                      {signature && <span className="block mt-2 text-muted-foreground">{signature}</span>}
                    </p>
                  )}
                  {tone === "casual" && (
                    <p className="text-sm">
                      Thanks for the great review! Really glad our team could help you out. Appreciate you spreading the word!
                      {signature && <span className="block mt-2 text-muted-foreground">{signature}</span>}
                    </p>
                  )}
                  {tone === "humorous" && (
                    <p className="text-sm">
                      You just made our day! ⭐ Our staff will be walking around with extra pep in their step now. Thanks for being awesome!
                      {signature && <span className="block mt-2 text-muted-foreground">{signature}</span>}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {[1, 2].map((i) => (
                      <div key={i} className="w-4 h-4 text-yellow-500">★</div>
                    ))}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-4 h-4 text-muted">★</div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">Negative Review</span>
                </div>
                <p className="text-sm mb-3">
                  "Service was slow and the wait time was too long. Not happy with the experience."
                </p>
                <div className="border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground mb-2">AI-Generated Reply ({tone}, {length}):</p>
                  {tone === "professional" && length === "medium" && (
                    <p className="text-sm">
                      We sincerely apologize for the delay you experienced. This doesn't meet our standards, and we're taking immediate steps to improve our service efficiency. 
                      We'd appreciate the opportunity to make this right. Please contact us directly so we can address your concerns.
                      {signature && <span className="block mt-2 text-muted-foreground">{signature}</span>}
                    </p>
                  )}
                  {tone === "friendly" && (
                    <p className="text-sm">
                      We're really sorry you had to wait longer than expected. That's definitely not the experience we want for our customers! 
                      We're working on speeding things up. Would love to make it up to you - please reach out to us!
                      {signature && <span className="block mt-2 text-muted-foreground">{signature}</span>}
                    </p>
                  )}
                  {tone === "casual" && (
                    <p className="text-sm">
                      Sorry about the wait! We know that's frustrating. We're making changes to speed things up. 
                      Hit us up directly and let's see how we can fix this.
                      {signature && <span className="block mt-2 text-muted-foreground">{signature}</span>}
                    </p>
                  )}
                  {tone === "humorous" && (
                    <p className="text-sm">
                      Ouch, that hurts to hear! Our team is usually faster than a caffeine-powered cheetah. 
                      We're working on getting back to speed. Give us another shot?
                      {signature && <span className="block mt-2 text-muted-foreground">{signature}</span>}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-primary/10 border-primary/30">
            <p className="text-sm">
              <strong>Pro Tip:</strong> You can generate and preview multiple variations before sending. 
              AI replies count towards your monthly limit only when sent.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardAutoReplier;
