import React from "react";
import { ArrowUpRight, Flag, Footprints, Rocket, Sparkles } from "lucide-react";

const journey = [
    {
        year: "01",
        label: "THE BEGINNING",
        title: "An Idea Takes Shape",
        description:
            "Every great journey starts with an idea. ARP began with a vision to bring together personal style, everyday comfort, and footwear that feels right.",
        icon: Flag,
        side: "left",
    },
    {
        year: "02",
        label: "FINDING OUR STYLE",
        title: "Defining Our Identity",
        description:
            "We started shaping the ARP identity around versatile designs, thoughtful details, and styles that fit naturally into everyday life.",
        icon: Sparkles,
        side: "right",
    },
    {
        year: "03",
        label: "MOVING FORWARD",
        title: "Growing With Every Step",
        description:
            "With every new collection, we continue exploring fresh styles and creating more ways for people to express themselves through footwear.",
        icon: Footprints,
        side: "left",
    },
    {
        year: "04",
        label: "THE ROAD AHEAD",
        title: "Our Journey Continues",
        description:
            "Our story is still being written. We look forward to reaching more people, exploring new ideas, and moving ahead with the ARP spirit.",
        icon: Rocket,
        side: "right",
    },
];

export default function OurJourney() {
    return (
        <section className="relative overflow-hidden bg-[#f7f4ed] py-20 sm:py-24 lg:py-28">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-[#d9b98b]/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#d9b98b]/15 blur-3xl" />

            <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
                {/* Heading */}
                <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-20">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#a47745]">
                        <span className="h-px w-8 bg-[#a47745]" />
                        Our Story
                        <span className="h-px w-8 bg-[#a47745]" />
                    </span>

                    <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
                        Every Step Has
                        <span className="block font-serif font-medium italic text-[#a47745]">
                            A Story.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                        From a simple idea to a growing identity, discover the
                        journey behind ARP Footwear and the vision that keeps
                        us moving forward.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative mx-auto max-w-5xl">
                    {/* Center line - desktop */}
                    <div className="absolute bottom-10 left-1/2 top-10 hidden w-px -translate-x-1/2 bg-[#d7c5ac] md:block" />

                    {/* Timeline items */}
                    <div className="space-y-10 md:space-y-0">
                        {journey.map((item, index) => {
                            const Icon = item.icon;
                            const isLeft = index % 2 === 0;

                            return (
                                <div
                                    key={item.year}
                                    className="relative grid grid-cols-1 items-center md:min-h-[250px] md:grid-cols-2"
                                >
                                    {/* Left content */}
                                    <div
                                        className={`${
                                            isLeft
                                                ? "md:pr-16 md:text-right"
                                                : "md:order-2 md:pl-16"
                                        }`}
                                    >
                                        <div
                                            className={`rounded-2xl border border-[#e8dfd2] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)] sm:p-8 ${
                                                isLeft ? "md:ml-auto" : ""
                                            }`}
                                        >
                                            <div
                                                className={`flex items-center gap-3 ${
                                                    isLeft
                                                        ? "md:justify-end"
                                                        : ""
                                                }`}
                                            >
                                                <span className="text-xs font-bold tracking-[0.22em] text-[#a47745]">
                                                    {item.label}
                                                </span>
                                                <span className="h-px w-8 bg-[#a47745]" />
                                            </div>

                                            <h3 className="mt-4 text-2xl font-bold leading-tight text-[#171717] sm:text-3xl">
                                                {item.title}
                                            </h3>

                                            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                                                {item.description}
                                            </p>

                                            <div
                                                className={`mt-6 flex items-center gap-2 text-xs font-bold tracking-widest text-[#a47745] ${
                                                    isLeft
                                                        ? "md:justify-end"
                                                        : ""
                                                }`}
                                            >
                                                ARP FOOTWEAR
                                                <ArrowUpRight size={15} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Center timeline point */}
                                    <div
                                        className={`absolute left-0 top-7 z-10 flex h-11 w-11 items-center justify-center rounded-full border-[5px] border-[#f7f4ed] bg-[#171717] text-white shadow-lg md:left-1/2 md:top-1/2 md:h-14 md:w-14 md:-translate-x-1/2 md:-translate-y-1/2 ${
                                            isLeft ? "" : ""
                                        }`}
                                    >
                                        <Icon size={19} />
                                    </div>

                                    {/* Right side year */}
                                    <div
                                        className={`hidden md:flex ${
                                            isLeft
                                                ? "md:order-2 md:pl-16"
                                                : "md:pr-16"
                                        } ${
                                            isLeft
                                                ? "md:justify-start"
                                                : "md:justify-end"
                                        }`}
                                    >
                                        <span className="font-serif text-7xl font-bold text-[#d9cbb8] lg:text-8xl">
                                            {item.year}
                                        </span>
                                    </div>

                                    {/* Mobile year */}
                                    <div className="mb-3 ml-14 md:hidden">
                                        <span className="font-serif text-3xl font-bold text-[#a47745]">
                                            {item.year}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom statement */}
                <div className="mt-16 border-t border-[#ded3c4] pt-10 text-center sm:mt-20">
                    <p className="font-serif text-2xl italic text-[#171717] sm:text-3xl">
                        "The journey never stops. Neither do we."
                    </p>

                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-[#a47745]">
                        Keep Moving With ARP
                    </p>
                </div>
            </div>
        </section>
    );
}