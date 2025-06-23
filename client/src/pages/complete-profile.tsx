import { useState } from "react";
import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const TRAITS = [
  "Curious", "Collaborative", "Analytical", "Creative", "Empathetic", "Resilient", "Organized", "Visionary"
];

export default function CompleteProfilePage() {
  const [, params] = useRoute("/complete-profile/:id");
  const onboardingId = params?.id;

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [personalityTraits, setPersonalityTraits] = useState<string[]>([]);
  const [goals, setGoals] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleTraitToggle = (trait: string) => {
    setPersonalityTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/complete-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          onboardingId: Number(onboardingId),
          fullName,
          bio,
          personalityTraits,
          goals,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Profile completed!", description: "You can now get matched." });
        setSubmitted(true);
        setFullName(""); setBio(""); setPersonalityTraits([]); setGoals("");
      } else {
        toast({ title: "Error", description: data.message || "Failed to save profile." });
      }
    } catch (err) {
      toast({ title: "Error", description: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark px-4 py-12">
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="pt-6">
          {submitted ? (
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold mb-4 text-purple-600">All set!</h2>
              <p className="text-lg mb-2">We'll get back to you soon with the best personalized recommendations.</p>
              <p className="text-md text-gray-500">Thank you for completing your profile.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <Input value={fullName} onChange={e => setFullName(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <Textarea value={bio} onChange={e => setBio(e.target.value)} required rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Personality Traits</label>
                  <div className="flex flex-wrap gap-2">
                    {TRAITS.map(trait => (
                      <button
                        type="button"
                        key={trait}
                        className={`px-3 py-1 rounded-full border transition-all ${personalityTraits.includes(trait) ? "bg-purple-500 text-white border-purple-500" : "bg-white/10 text-gray-700 border-gray-300"}`}
                        onClick={() => handleTraitToggle(trait)}
                      >
                        {trait}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Goals</label>
                  <Input value={goals} onChange={e => setGoals(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Saving..." : "Complete Profile"}
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 