import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, MessageSquare, Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type Review = {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
  platform: string;
  sentiment: "positive" | "neutral" | "negative";
  replied: boolean;
  aiGenerated: boolean;
};

const mockReviews: Review[] = [
  {
    id: 1,
    author: "John Doe",
    rating: 5,
    text: "Excellent service! The staff was very helpful and professional.",
    date: "2024-04-15",
    platform: "Google",
    sentiment: "positive",
    replied: true,
    aiGenerated: true,
  },
  {
    id: 2,
    author: "Jane Smith",
    rating: 2,
    text: "Service was slow and the wait time was too long.",
    date: "2024-04-14",
    platform: "Yelp",
    sentiment: "negative",
    replied: false,
    aiGenerated: false,
  },
  {
    id: 3,
    author: "Bob Johnson",
    rating: 4,
    text: "Pretty good experience overall. Would come back.",
    date: "2024-04-13",
    platform: "Google",
    sentiment: "positive",
    replied: true,
    aiGenerated: false,
  },
  {
    id: 4,
    author: "Alice Williams",
    rating: 3,
    text: "It was okay. Nothing special but not bad either.",
    date: "2024-04-12",
    platform: "Yelp",
    sentiment: "neutral",
    replied: false,
    aiGenerated: false,
  },
  {
    id: 5,
    author: "Charlie Brown",
    rating: 5,
    text: "Amazing! Best experience I've had in a long time.",
    date: "2024-04-11",
    platform: "Google",
    sentiment: "positive",
    replied: true,
    aiGenerated: true,
  },
];

const DashboardReviews = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReviews, setSelectedReviews] = useState<number[]>([]);
  const { toast } = useToast();

  const filteredReviews = mockReviews.filter((review) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "positive" && review.sentiment === "positive") ||
      (filter === "neutral" && review.sentiment === "neutral") ||
      (filter === "negative" && review.sentiment === "negative") ||
      (filter === "unreplied" && !review.replied) ||
      (filter === "ai-replied" && review.aiGenerated);

    const matchesSearch =
      searchQuery === "" ||
      review.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleSelectReview = (id: number) => {
    setSelectedReviews((prev) =>
      prev.includes(id) ? prev.filter((reviewId) => reviewId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedReviews.length === filteredReviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(filteredReviews.map((r) => r.id));
    }
  };

  const handleBulkAIReply = () => {
    toast({
      title: "AI replies generated",
      description: `Generated ${selectedReviews.length} AI replies. Review and send them individually.`,
    });
    setSelectedReviews([]);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-500";
    if (rating >= 3) return "text-yellow-500";
    return "text-red-500";
  };

  const getSentimentBadge = (sentiment: string) => {
    if (sentiment === "positive") return <Badge className="bg-green-500/20 text-green-500">Positive</Badge>;
    if (sentiment === "neutral") return <Badge className="bg-yellow-500/20 text-yellow-500">Neutral</Badge>;
    return <Badge className="bg-red-500/20 text-red-500">Negative</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">All Reviews</h2>
          <p className="text-muted-foreground">Manage and respond to customer reviews</p>
        </div>
        <Badge variant="outline" className="gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          25 AI replies remaining
        </Badge>
      </div>

      {/* Filters and Search */}
      <Card className="p-4 bg-card/50 border-primary/20">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter reviews" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reviews</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
              <SelectItem value="unreplied">Unreplied</SelectItem>
              <SelectItem value="ai-replied">AI Replied</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedReviews.length > 0 && (
        <Card className="p-4 bg-primary/10 border-primary/30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm font-semibold">
              {selectedReviews.length} review{selectedReviews.length !== 1 ? "s" : ""} selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedReviews([])}>
                Clear Selection
              </Button>
              <Button size="sm" onClick={handleBulkAIReply} className="glow-primary">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Replies
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Select All */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="select-all"
          checked={selectedReviews.length === filteredReviews.length && filteredReviews.length > 0}
          onCheckedChange={handleSelectAll}
        />
        <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
          Select all ({filteredReviews.length})
        </label>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="p-6 bg-card/50 border-primary/20 hover:border-primary/40 transition-all">
            <div className="flex items-start gap-4">
              <Checkbox
                checked={selectedReviews.includes(review.id)}
                onCheckedChange={() => handleSelectReview(review.id)}
              />
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{review.author}</h4>
                      <Badge variant="outline" className="text-xs">{review.platform}</Badge>
                      {review.aiGenerated && (
                        <Badge className="text-xs gap-1">
                          <Sparkles className="w-3 h-3" />
                          AI Reply
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className={`flex gap-0.5 ${getRatingColor(review.rating)}`}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                        ))}
                      </div>
                      <span>•</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                  {getSentimentBadge(review.sentiment)}
                </div>

                <p className="text-sm">{review.text}</p>

                <div className="flex items-center gap-2 pt-2">
                  {review.replied ? (
                    <Badge variant="outline" className="gap-1">
                      <MessageSquare className="w-3 h-3" />
                      Replied
                    </Badge>
                  ) : (
                    <>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Manual Reply
                      </Button>
                      <Button size="sm" className="glow-primary">
                        <Sparkles className="w-4 h-4 mr-2" />
                        AI Reply
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <Card className="p-12 bg-card/50 border-primary/20 text-center">
          <p className="text-muted-foreground">No reviews match your filters</p>
        </Card>
      )}
    </div>
  );
};

export default DashboardReviews;
