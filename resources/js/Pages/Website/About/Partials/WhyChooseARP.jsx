
import React from "react";
import { Link } from "@inertiajs/react";
import {
    ArrowUpRight,
    ShieldCheck,
    Footprints,
    Gem,
    HeartHandshake,
    MoveRight,
} from "lucide-react";

const features = [
    {
        number: "01",
        title: "Premium Style",
        description:
            "Modern footwear designs that complement your personality and make every outfit stand out.",
        icon: Gem,
    },
    {
        number: "02",
        title: "Everyday Comfort",
        description:
            "Footwear designed for everyday movement, comfort and practicality.",
        icon: Footprints,
    },
    {
        number: "03",
        title: "Quality Focus",
        description:
            "We pay attention to materials, finishing and details that matter.",
        icon: ShieldCheck,
    },
    {
        number: "04",
        title: "Customer First",
        description:
            "We believe in creating a shopping experience built around customer satisfaction and trust.",
        icon: HeartHandshake,
    },
];

export default function WhyChooseARP() {
    return (
        <section className="overflow-hidden bg-[#f7f6f2] px-4 py-16 sm:px-6 md:py-20 lg:px-8 xl:px-12 2xl:px-16">

            <div className="mx-auto max-w-[1400px]">

                {/* Section Heading */}
                <div className="mb-10 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">

                    <div className="max-w-2xl">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-[2px] w-9 bg-amber-700" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-800 sm:text-xs">
                                The ARP Difference
                            </span>
                        </div>

                        <h2 className="text-3xl font-black uppercase leading-[1.1] tracking-tight text-[#171717] sm:text-4xl md:text-5xl xl:text-6xl">
                            Why Choose
                            <span className="block font-serif font-normal italic text-amber-800">
                                ARP Footwear?
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-md text-sm leading-7 text-gray-500 lg:max-w-sm">
                        Great footwear is more than just appearance. It is
                        about how you feel, move and express yourself with
                        every step.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6 xl:grid-cols-[0.9fr_1.1fr]">

                    {/* Image */}
                    <div className="group relative min-h-[380px] overflow-hidden bg-[#ded8ce] sm:min-h-[480px] lg:min-h-[540px]">

                        <img
                            src="/asset/ARP Slippers_ Style Meets Comfort.png"
                            alt="Stylish footwear collection"
                            className="absolute inset-0  object-cover transition duration-1000 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                        {/* <div className="absolute left-5 top-5 border border-white/40 bg-black/10 px-4 py-2 backdrop-blur-sm sm:left-7 sm:top-7">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                                Designed For You
                            </span>
                        </div> */}

                        <div className="absolute bottom-7 left-6 right-6 sm:bottom-10 sm:left-9 sm:right-9">
                            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400 sm:text-xs">
                                Your Style. Your Identity.
                            </p>

                            <h3 className="text-3xl font-black uppercase leading-tight text-white sm:text-4xl xl:text-5xl">
                                Make Every
                                <span className="block font-serif font-normal italic">
                                    Step Count.
                                </span>
                            </h3>
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.number}
                                    className="group relative flex min-h-[210px] flex-col justify-between border border-[#e6e2d9] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-700 hover:shadow-lg sm:min-h-[245px] sm:p-7 xl:p-8"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-11 w-11 items-center justify-center bg-[#f6f2e9] text-amber-800 transition-all duration-300 group-hover:bg-amber-800 group-hover:text-white sm:h-12 sm:w-12">
                                            <Icon size={22} strokeWidth={1.6} />
                                        </div>

                                        <span className="text-xs font-bold tracking-widest text-gray-300">
                                            {feature.number}
                                        </span>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-base font-black uppercase tracking-wide text-gray-950 sm:text-lg">
                                            {feature.title}
                                        </h3>

                                        <p className="mt-3 text-xs leading-6 text-gray-500 sm:text-sm sm:leading-7">
                                            {feature.description}
                                        </p>
                                    </div>

                                    <ArrowUpRight
                                        size={19}
                                        className="absolute bottom-6 right-6 text-amber-800 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                                    />
                                </div>
                            );
                        })}

                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-[#ded9ce] pt-7 sm:flex-row lg:mt-12">

                    <p className="text-center text-xs font-medium text-gray-600 sm:text-left sm:text-sm">
                        Find the perfect pair for your everyday journey.
                    </p>

                    <Link
                        href="/products"
                        className="group inline-flex w-full items-center justify-center gap-4 bg-black px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-amber-800 sm:w-auto sm:text-xs"
                    >
                        Shop Collection
                        <MoveRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>
                </div>

            </div>
        </section>
    );
}
