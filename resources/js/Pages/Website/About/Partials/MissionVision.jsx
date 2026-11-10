
import React from "react";
import { Target, Eye, ArrowUpRight } from "lucide-react";

const values = [
    {
        number: "01",
        title: "Our Mission",
        icon: Target,
        description:
            "Our mission is to make stylish, comfortable and quality footwear accessible for everyone. We aim to bring confidence to every step through thoughtful designs and everyday comfort.",
    },
    {
        number: "02",
        title: "Our Vision",
        icon: Eye,
        description:
            "Our vision is to build ARP Footwear as a trusted name in footwear fashion, where modern style, customer satisfaction and quality come together.",
    },
];

export default function MissionVision() {
    return (
        <section className="relative overflow-hidden bg-[#111111] px-5 py-20 text-white sm:px-8 lg:px-16 lg:py-28">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />

            <div className="relative mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500">
                        What Drives Us
                    </span>

                    <h2 className="mt-5 text-4xl font-black uppercase leading-tight sm:text-5xl">
                        Purpose Behind
                        <span className="block font-serif font-normal italic text-amber-500">
                            Every Step.
                        </span>
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
                        Everything we do is guided by our commitment to style,
                        comfort and creating a better footwear experience.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                    {values.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.number}
                                className="group relative overflow-hidden border border-white/10 bg-white/[0.04] p-8 transition duration-500 hover:border-amber-600/60 hover:bg-white/[0.07] sm:p-12"
                            >
                                {/* Number */}
                                <span className="absolute right-7 top-5 text-7xl font-black text-white/[0.04]">
                                    {item.number}
                                </span>

                                <div className="relative">
                                    <div className="flex h-14 w-14 items-center justify-center border border-amber-600/40 bg-amber-600/10 text-amber-500 transition group-hover:bg-amber-600 group-hover:text-white">
                                        <Icon size={27} strokeWidth={1.5} />
                                    </div>

                                    <h3 className="mt-9 text-2xl font-black uppercase tracking-wide sm:text-3xl">
                                        {item.title}
                                    </h3>

                                    <div className="mt-4 h-[2px] w-12 bg-amber-600 transition-all duration-500 group-hover:w-24" />

                                    <p className="mt-7 max-w-lg text-sm leading-8 text-gray-400">
                                        {item.description}
                                    </p>

                                    <div className="mt-9 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
                                        ARP FOOTWEAR
                                        <ArrowUpRight size={16} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>

                {/* Bottom Statement */}
                <div className="mt-16 border-t border-white/10 pt-9 text-center">
                    <p className="font-serif text-xl italic text-gray-300 sm:text-2xl">
                        "Every journey begins with a single step."
                    </p>

                    <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">
                        Step Into Your Style — ARP
                    </p>
                </div>

            </div>
        </section>
    );
}
