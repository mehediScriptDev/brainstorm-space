import Hero from "@/app/components/home/Hero";
import TrendingIdeas from "@/app/components/home/TrendingIdeas";
import AssessmentTool from "@/app/components/home/AssessmentTool";
import AnalyticsHub from "@/app/components/home/AnalyticsHub";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TrendingIdeas />
      <AssessmentTool />
      <AnalyticsHub />
    </main>
  );
}
