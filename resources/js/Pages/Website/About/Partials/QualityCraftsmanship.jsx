
import React from "react";
import { Link } from "@inertiajs/react";
import {
    ArrowUpRight,
    Check,
    Sparkles,
    ShieldCheck,
    Footprints,
} from "lucide-react";

const qualities = [
    {
        icon: Sparkles,
        title: "Thoughtful Design",
        description: "Modern styles created to complement your everyday look.",
    },
    {
        icon: ShieldCheck,
        title: "Quality Focus",
        description: "Attention to materials, finishing and product details.",
    },
    {
        icon: Footprints,
        title: "Everyday Wear",
        description: "Footwear selected with everyday use and comfort in mind.",
    },
];

export default function QualityCraftsmanship() {
    return (
        <section className="overflow-hidden bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

            <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

                {/* LEFT IMAGE AREA */}
                <div className="relative mx-auto w-full max-w-[600px]">

                    {/* Main Image */}
                    <div className="relative h-[420px] overflow-hidden bg-white sm:h-[520px]">
                        <img
                        src="/asset/ARP Premium Footwear Collection.png"
                            alt="ARP footwear design"
                            className=" object-cover transition duration-700 hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        <div className="absolute bottom-7 left-7">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-300">
                                ARP Collection
                            </span>

                            <h3 className="mt-2 text-3xl font-black uppercase text-white sm:text-4xl">
                                Details Matter.
                            </h3>
                        </div>
                    </div>

                    {/* Small Floating Image */}
                    {/* <div className="absolute -bottom-10 -right-2 h-40 w-36 overflow-hidden border-[7px] border-white shadow-xl sm:-right-8 sm:h-52 sm:w-48">
                        <img
                            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=90"
                            alt="Footwear collection detail"
                            className="h-full w-full object-cover"
                        />
                    </div> */}

                    {/* Floating Label */}
                    {/* <div className="absolute -left-2 top-8 flex items-center gap-3 bg-white px-5 py-4 shadow-xl sm:-left-5">
                        <div className="flex h-9 w-9 items-center justify-center bg-amber-700 text-white">
                            <Check size={18} />
                        </div>

                        <div>
                            <p className="text-xs font-black uppercase text-gray-900">
                                Made With Care
                            </p>
                            <p className="mt-1 text-[9px] uppercase tracking-wider text-gray-500">
                                Quality Focus
                            </p>
                        </div>
                    </div> */}

                </div>

                {/* RIGHT CONTENT */}
                <div className="pt-5 lg:pt-0">

                    <div className="mb-6 flex items-center gap-3">
                        <span className="h-[2px] w-10 bg-amber-700" />

                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-800 sm:text-xs">
                            Quality & Craftsmanship
                        </span>
                    </div>

                    <h2 className="text-4xl font-black uppercase leading-[1.12] tracking-tight text-gray-950 sm:text-5xl xl:text-6xl">
                        Designed With
                        <span className="block font-serif font-normal italic text-amber-800">
                            Every Detail.
                        </span>
                    </h2>

                    <p className="mt-7 max-w-xl text-sm leading-8 text-gray-500 sm:text-base">
                        At ARP Footwear, we believe the difference is in
                        the details. From design choices to finishing,
                        we focus on bringing together style, practicality
                        and a better everyday footwear experience.
                    </p>

                    {/* Quality Features */}
                    <div className="mt-9 space-y-6">

                        {qualities.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className="group flex gap-5 border-b border-gray-100 pb-6"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#f6f2e9] text-amber-800 transition duration-300 group-hover:bg-amber-800 group-hover:text-white">
                                        <Icon size={22} strokeWidth={1.5} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-black uppercase tracking-wide text-gray-900">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-gray-500">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    {/* CTA */}
                    <div className="mt-9">
                        <Link
                            href="/products"
                            className="group inline-flex items-center gap-4 bg-black px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-amber-800 sm:text-xs"
                        >
                            Explore Our Products

                            <ArrowUpRight
                                size={17}
                                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>
                    </div>

                </div>
            </div>

        </section>
    );
}
