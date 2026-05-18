"use client";

import React from "react";
import Hero from "@/app/components/home/Hero";
import TrendingIdeas from "@/app/components/home/TrendingIdeas";
import HowItWorks from "@/app/components/home/HowItWorks";
import AssessmentTool from "@/app/components/home/AssessmentTool";
import Stats from "@/app/components/home/Stats";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. Hero Interval Slider Banner */}
            <Hero />

            {/* 2. Trending Grid Section */}
            <TrendingIdeas />

            {/* 3. Steps Grid Sequence */}
            <HowItWorks />

            {/* 4. Interactive Viability Engine */}
            <div className="py-8 bg-base-100">
                <AssessmentTool />
            </div>

            {/* 5. Metrics Subbar */}
            <Stats />
        </div>
    );
}
