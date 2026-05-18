import React from "react";

const AnalyticsHub = () => {
    const metrics = [
        { label: "Ideas Cultivated", value: "1,240+", desc: "Startup concepts published", icon: "💡" },
        { label: "Active Innovators", value: "8,500+", desc: "Founders, engineers & creators", icon: "👥" },
        { label: "Validation Loops", value: "32,900+", desc: "Feedback rounds & metrics", icon: "🔄" },
        { label: "Simulated Funding", value: "$4.8M", desc: "Estimated startup budgeting", icon: "💰" }
    ];

    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    
                    {/* Left Column: Metrics Grid */}
                    <div className="order-2 lg:order-1 grid gap-6 sm:grid-cols-2">
                        {metrics.map((metric) => (
                            <div
                                key={metric.label}
                                className="group rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:border-custom/30 hover:shadow-lg hover:shadow-base-200/50"
                            >
                                <div className="text-4xl">{metric.icon}</div>
                                <div className="text-3xl font-black text-base-content tracking-tight mt-4">
                                    {metric.value}
                                </div>
                                <p className="text-sm font-bold text-base-content/85 mt-1">{metric.label}</p>
                                <p className="text-xs text-base-content/50 font-medium mt-0.5">{metric.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Spotlight Panel */}
                    <div className="order-1 lg:order-2 space-y-6 text-left">
                        <span className="inline-flex rounded-full border border-custom/15 bg-custom/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-custom">
                            Founder Spotlight
                        </span>
                        <h2 className="text-3xl font-black text-base-content sm:text-4xl tracking-tight leading-tight">
                            The 24-Hour Validation Blueprint
                        </h2>
                        <p className="text-base leading-relaxed text-base-content/70 font-medium">
                            Don't burn capital building before validating. Leverage our simple 3-step framework to test startup ideas before coding a single line.
                        </p>

                        {/* Guide Steps */}
                        <div className="space-y-4.5 pt-2">
                            <div className="flex gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-2xl bg-custom/10 text-custom font-extrabold flex items-center justify-center text-sm shadow-sm">
                                    01
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-base font-bold text-base-content">Define Core Value Prop</h4>
                                    <p className="text-sm text-base-content/65 font-medium leading-relaxed">
                                        Isolate the single primary pain point you solve and write down a clear one-sentence proposition that anyone can grasp instantly.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-2xl bg-custom/10 text-custom font-extrabold flex items-center justify-center text-sm shadow-sm">
                                    02
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-base font-bold text-base-content">Publish a Landing Page Widget</h4>
                                    <p className="text-sm text-base-content/65 font-medium leading-relaxed">
                                        Use a mock dashboard, outline the main user journey, and place an email signup widget to measure initial engagement.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-2xl bg-custom/10 text-custom font-extrabold flex items-center justify-center text-sm shadow-sm">
                                    03
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-base font-bold text-base-content">Host Feedback Iterations</h4>
                                    <p className="text-sm text-base-content/65 font-medium leading-relaxed">
                                        Expose the page to 100 niche community targets, study their comments, adjust the positioning, and pivot immediately if needed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AnalyticsHub;
