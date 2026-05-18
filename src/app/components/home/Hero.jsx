"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { 
            title: "Share Your Vision", 
            desc: "Turn your startup concepts into reality by sharing them with a community of innovators.", 
            img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
        },
        { 
            title: "Validate with Experts", 
            desc: "Get constructive feedback and validate your ideas before writing a single line of code.", 
            img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
        },
        { 
            title: "Discover Innovations", 
            desc: "Explore trending concepts across Tech, Health, AI, and more.", 
            img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="relative h-[500px] overflow-hidden bg-gray-900 transition-colors duration-200">
            {slides.map((slide, index) => (
                <div 
                    key={index} 
                    className={`absolute inset-0 transition-all duration-1000 transform ${
                        index === currentSlide 
                            ? "opacity-100 scale-100 z-10" 
                            : "opacity-0 scale-105 z-0 pointer-events-none"
                    }`}
                >
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-black/65 z-10" />
                    
                    {/* Slide image */}
                    <img 
                        src={slide.img} 
                        alt={slide.title} 
                        className="w-full h-full object-cover" 
                    />

                    {/* Centered content block */}
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                        <span className="inline-flex rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 mb-4.5 backdrop-blur-xs">
                            IdeaVault Hub
                        </span>
                        
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight max-w-4xl drop-shadow-lg">
                            {slide.title}
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl font-medium leading-relaxed drop-shadow-md">
                            {slide.desc}
                        </p>
                        
                        <Link 
                            href="/ideas"
                            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-bold rounded-full shadow-lg hover:shadow-indigo-500/25 transition-all transform hover:scale-105"
                        >
                            Explore Ideas
                        </Link>
                    </div>
                </div>
            ))}

            {/* Navigation Bullets */}
            <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-2.5">
                {slides.map((_, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => setCurrentSlide(idx)} 
                        className={`w-3.5 h-3.5 rounded-full transition-all border ${
                            idx === currentSlide 
                                ? "bg-indigo-500 border-indigo-500 w-8" 
                                : "bg-white/50 border-transparent hover:bg-white"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
