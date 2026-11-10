
import React from "react";
import {
    Sparkles,
    Heart,
    Compass,
    Award,
    ArrowUpRight,
} from "lucide-react";

const values = [
    {
        number: "01",
        title: "Authentic Style",
        description: "Be yourself. Express your personality through every step.",
        icon: Sparkles,
    },
    {
        number: "02",
        title: "Customer Love",
        description: "Our customers are at the heart of everything we create.",
        icon: Heart,
    },
    {
        number: "03",
        title: "Keep Moving",
        description: "Inspired by ambition, movement and new possibilities.",
        icon: Compass,
    },
    {
        number: "04",
        title: "Quality Matters",
        description: "Thoughtful details and a commitment to better experiences.",
        icon: Award,
    },
];

export default function BrandPhilosophy() {
    return (
        <section className="relative overflow-hidden bg-[#111111] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute -right-32 top-0 h-[450px] w-[450px] rounded-full border border-white/[0.06]" />
            <div className="pointer-events-none absolute -right-20 top-12 h-[320px] w-[320px] rounded-full border border-white/[0.06]" />

            <div className="relative mx-auto max-w-[1400px]">

                {/* Header */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">

                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-[2px] w-10 bg-amber-600" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500 sm:text-xs">
                                What We Believe
                            </span>
                        </div>

                        <h2 className="text-4xl font-black uppercase leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                            Our Brand
                            <span className="block font-serif font-normal italic text-amber-500">
                                Philosophy.
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-lg text-sm leading-8 text-gray-400 lg:ml-auto">
                        We believe footwear is more than something you wear.
                        It is a reflection of your confidence, personality
                        and the journey you choose to take.
                    </p>

                </div>

                {/* Philosophy Statement */}
                <div className="my-14 border-y border-white/10 py-10 sm:my-20 sm:py-14">
                    <p className="max-w-5xl font-serif text-3xl leading-snug text-white sm:text-4xl lg:text-5xl">
                        "Style is not about following every trend.
                        It's about finding
                        <span className="italic text-amber-500">
                            {" "}your own way.
                        </span>"
                    </p>

                    <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
                        The ARP Way
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">

                    {values.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.number}
                                className={`group relative border-b border-white/10 px-5 py-8 transition duration-300 hover:bg-white/[0.04] sm:px-7 lg:border-b-0 lg:border-r lg:px-6 xl:px-8 ${
                                    index === 0 ? "lg:border-l" : ""
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <Icon
                                        size={27}
                                        strokeWidth={1.4}
                                        className="text-amber-500 transition-transform duration-300 group-hover:scale-110"
                                    />

                                    <span className="text-xs font-bold tracking-widest text-white/20">
                                        {item.number}
                                    </span>
                                </div>

                                <h3 className="mt-10 text-lg font-black uppercase tracking-wide text-white">
                                    {item.title}
                                </h3>

                                <p className="mt-4 min-h-[60px] text-sm leading-7 text-gray-400">
                                    {item.description}
                                </p>

                                <div className="mt-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
                                    ARP VALUES
                                    <ArrowUpRight
                                        size={15}
                                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />
                                </div>
                            </div>
                        );
                    })}

                </div>

                {/* Bottom Brand Name */}
                <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row">
                    <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
                        ARP FOOTWEAR — STEP INTO YOUR STYLE
                    </p>

                    <span className="font-serif text-2xl italic tracking-wider text-amber-500">
                        ARP.
                    </span>
                </div>

            </div>
        </section>
    );
}
