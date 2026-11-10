
import React from 'react';
import {
    Footprints,
    Heart,
    Sparkles,
    Award,
    ArrowUpRight
} from 'lucide-react';

const benefits = [
    {
        id: 1,
        title: 'MODERN DESIGNS',
        description: 'Discover footwear styles inspired by modern fashion and trends.',
        icon: Sparkles,
    },
    {
        id: 2,
        title: 'EVERYDAY COMFORT',
        description: 'Footwear styles designed with everyday comfort in mind.',
        icon: Heart,
    },
    {
        id: 3,
        title: 'PREMIUM STYLE',
        description: 'Explore versatile styles that complement your personality.',
        icon: Footprints,
    },
    {
        id: 4,
        title: 'QUALITY FOCUS',
        description: 'A thoughtful approach to footwear design and quality.',
        icon: Award,
    },
];

export default function BrandBenefits() {
    return (
        <section className="bg-[#faf9f6] px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
            <div className="mx-auto max-w-[1600px]">

                {/* SECTION HEADING */}
                <div className="mb-9 text-center">
                    <span className="text-[10px] font-semibold tracking-[4px] text-[#bd934c]">
                        THE ARP PROMISE
                    </span>

                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                        More Than Just Footwear
                    </h2>

                    <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
                        Discover the world of ARP Footwear, where modern
                        designs meet everyday comfort and personal style.
                    </p>
                </div>

                {/* BENEFIT CARDS */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    {benefits.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.id}
                                className="group relative overflow-hidden border border-[#eae5dc] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#bd934c] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] sm:p-7"
                            >
                                {/* CARD TOP */}
                                <div className="mb-7 flex items-center justify-between">
                                    <div className="flex h-14 w-14 items-center justify-center bg-[#f8f5ef] text-[#b58b43] transition-all duration-300 group-hover:bg-[#bd934c] group-hover:text-white">
                                        <Icon size={27} strokeWidth={1.5} />
                                    </div>

                                    <span className="text-xs font-medium tracking-widest text-gray-300">
                                        0{item.id}
                                    </span>
                                </div>

                                {/* CARD CONTENT */}
                                <h3 className="text-[13px] font-bold tracking-[1.2px] text-gray-900">
                                    {item.title}
                                </h3>

                                <p className="mt-3 max-w-[230px] text-[13px] leading-6 text-gray-500">
                                    {item.description}
                                </p>

                                {/* BOTTOM */}
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="h-[2px] w-10 bg-[#bd934c] transition-all duration-300 group-hover:w-16" />

                                    <ArrowUpRight
                                        size={18}
                                        className="text-gray-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#bd934c]"
                                    />
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}
