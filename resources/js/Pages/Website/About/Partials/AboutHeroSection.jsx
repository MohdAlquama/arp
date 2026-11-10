import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight, Play, MoveUpRight } from "lucide-react";

export default function AboutHeroSection() {
    return (
        <section className="relative overflow-hidden bg-[#f5f3ee]">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full border border-[#d6c6a5]/40" />
            <div className="pointer-events-none absolute -left-20 top-32 h-56 w-56 rounded-full border border-[#d6c6a5]/40" />

            <div className="mx-auto grid min-h-[650px] max-w-[1600px] grid-cols-1 lg:grid-cols-2">

                {/* LEFT CONTENT */}
                <div className="relative z-10 flex items-center px-6 py-20 sm:px-12 lg:px-16 xl:px-24">

                    <div className="max-w-xl">

                        {/* Label */}
                        <div className="mb-8 flex items-center gap-3">
                            <span className="h-[2px] w-10 bg-amber-700" />
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-800">
                                The ARP Story
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl font-black leading-[1.08] tracking-tight text-[#171717] sm:text-6xl xl:text-7xl">
                            WALK YOUR
                            <br />
                            <span className="font-serif font-normal italic text-amber-800">
                                Own Way.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-7 max-w-md text-sm leading-8 text-gray-600 sm:text-base">
                            At ARP Footwear, we believe every step tells a story.
                            Our passion is to bring together style, comfort and
                            quality to create footwear that moves with you.
                        </p>

                        {/* Buttons */}
                        <div className="mt-10 flex flex-wrap items-center gap-5">

                            <Link
                                href="/products"
                                className="group inline-flex items-center gap-4 bg-black px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-amber-800"
                            >
                                Explore Collection

                                <ArrowRight
                                    size={17}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Link>

                            <a
                                href="#our-story"
                                className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-800"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-400 transition group-hover:border-black group-hover:bg-black group-hover:text-white">
                                    <Play size={14} fill="currentColor" />
                                </span>

                                Our Story
                            </a>

                        </div>

                        {/* Stats */}
                        <div className="mt-16 grid max-w-md grid-cols-3 border-t border-gray-300 pt-7">

                            <div>
                                <h3 className="text-2xl font-black text-gray-900">
                                    Style
                                </h3>
                                <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                                    Everyday Fashion
                                </p>
                            </div>

                            <div className="border-l border-gray-300 pl-5">
                                <h3 className="text-2xl font-black text-gray-900">
                                    Comfort
                                </h3>
                                <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                                    Made for Movement
                                </p>
                            </div>

                            <div className="border-l border-gray-300 pl-5">
                                <h3 className="text-2xl font-black text-gray-900">
                                    Quality
                                </h3>
                                <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                                    Every Detail Matters
                                </p>
                            </div>

                        </div>

                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative min-h-[450px] overflow-hidden lg:min-h-[650px]">

                    <img
                        src="/asset/ARP_Red_Sneaker_with_Signature_Stripes.png"
                        alt="ARP Red Sneaker with Signature Stripes"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                    {/* Top Label */}
                    <div className="absolute right-7 top-7 flex items-center gap-2 border border-white/50 bg-white/10 px-4 py-3 backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-amber-400" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                            Discover ARP
                        </span>
                    </div>

                    {/* Image Bottom Content */}
                    <div className="absolute bottom-10 left-7 right-7 flex items-end justify-between sm:left-12 sm:right-12">

                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                                Beyond Footwear
                            </p>

                            <h2 className="max-w-sm text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                                Every Step.
                                <br />
                                A New Story.
                            </h2>
                        </div>

                        <div className="hidden h-14 w-14 items-center justify-center rounded-full border border-white/60 text-white transition hover:bg-white hover:text-black sm:flex">
                            <MoveUpRight size={22} />
                        </div>

                    </div>

                </div>

            </div>

            {/* Bottom Brand Strip */}
            <div className="border-t border-[#e5dfd2] bg-[#f5f3ee] px-6 py-5">
                <p className="text-center text-[10px] font-bold uppercase tracking-[0.35em] text-gray-500">
                    ARP FOOTWEAR — STEP INTO YOUR STYLE
                </p>
            </div>

        </section>
    );
}