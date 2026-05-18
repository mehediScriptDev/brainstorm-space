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
            <Hero />
            <TrendingIdeas />
            <HowItWorks />
            <div className="py-8 bg-base-100">
                <AssessmentTool />
            </div>
            <Stats />
        </div>
    );
}
