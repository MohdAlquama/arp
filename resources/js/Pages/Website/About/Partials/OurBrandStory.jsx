
import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function OurBrandStory() {
    const highlights = [
        "Style that matches your personality",
        "Comfort for your everyday journey",
        "Attention to detail and design",
    ];

    return (
        <section id="our-story" className="overflow-hidden bg-white px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">

                {/* LEFT IMAGES */}
                <div className="relative mx-auto w-full max-w-xl">

                    <div className="relative h-[430px] overflow-hidden sm:h-[520px]">
                        <img
                            src="/asset/ARP Everyday Comfort Footwear.png"
                            alt="Premium footwear collection"
                            className=" object-cover transition duration-700 hover:scale-105"
                        />
                    </div>

                    {/* Floating Image */}
                    {/* <div className="absolute -bottom-10 -right-3 h-48 w-40 overflow-hidden border-[8px] border-white shadow-xl sm:-right-10 sm:h-60 sm:w-52">
                        <img
                            src="/asset/ARP Everyday Comfort Footwear.png"
                            alt="ARP footwear style"
                            className="h-full w-full object-cover"
                        />
                    </div> */}

                

                </div>

                {/* RIGHT CONTENT */}
                <div className="pt-5 lg:pt-0">

                    <div className="mb-6 flex items-center gap-3">
                        <span className="h-[2px] w-10 bg-amber-700" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-800">
                            Who We Are
                        </span>
                    </div>

                    <h2 className="text-4xl font-black leading-tight tracking-tight text-gray-950 sm:text-5xl">
                        More Than Shoes.
                        <br />
                        <span className="font-serif font-normal italic text-amber-800">
                            It's Your Identity.
                        </span>
                    </h2>

                    <p className="mt-7 text-sm leading-8 text-gray-600 sm:text-base">
                        ARP Footwear is built around a simple idea: footwear
                        should make you feel confident, comfortable and
                        stylish. We bring together modern designs and
                        everyday practicality for people who love to move
                        forward with confidence.
                    </p>

                    <p className="mt-4 text-sm leading-8 text-gray-600 sm:text-base">
                        From everyday essentials to statement styles, our
                        collection is created to complement different
                        lifestyles, occasions and personalities.
                    </p>

                    {/* Highlights */}
                    <div className="mt-8 space-y-4">
                        {highlights.map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <CheckCircle2
                                    size={19}
                                    className="shrink-0 text-amber-700"
                                />
                                <span className="text-sm font-medium text-gray-800">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-10">
                        <Link
                            href="/products"
                            className="group inline-flex items-center gap-4 bg-black px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-amber-800"
                        >
                            Discover Our Collection
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
