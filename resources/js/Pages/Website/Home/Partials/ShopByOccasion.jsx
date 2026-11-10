import React from "react";
import { Link } from "@inertiajs/react";
import {
    ArrowUpRight,
    BriefcaseBusiness,
    Coffee,
    PartyPopper,
    Footprints,
} from "lucide-react";

const occasions = [
    {
        id: 1,
        title: "Everyday Wear",
        subtitle: "COMFORT MEETS STYLE",
        description: "Footwear for your everyday moments.",
        icon: Coffee,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=85",
        href: "/products",
    },
    {
        id: 2,
        title: "Office & Formal",
        subtitle: "MAKE AN IMPRESSION",
        description: "Discover styles for a polished look.",
        icon: BriefcaseBusiness,
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=85",
        href: "/products",
    },
    {
        id: 3,
        title: "Party & Events",
        subtitle: "OWN THE MOMENT",
        description: "Explore styles for special occasions.",
        icon: PartyPopper,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
        href: "/products",
    },
];

export default function ShopByOccasion() {
    return (
        <section className="overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
            <div className="mx-auto max-w-[1600px]">

                {/* Heading */}
                <div className="mb-12 text-center">
                    <span className="text-[10px] font-bold tracking-[4px] text-[#bd934c]">
                        FIND YOUR MOMENT
                    </span>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl lg:text-5xl">
                        Style For Every
                        <span className="font-serif font-medium italic text-[#bd934c]">
                            {" "}Occasion.
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500">
                        From everyday moments to special occasions,
                        explore footwear styles that complement your lifestyle.
                    </p>
                </div>

                {/* Occasion Cards */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                    {occasions.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className="group relative min-h-[430px] overflow-hidden bg-[#171717] sm:min-h-[500px] lg:min-h-[550px]"
                            >

                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />

                                {/* Top Icon */}
                                <div className="absolute left-7 top-7 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/10 text-white backdrop-blur-sm transition group-hover:border-[#bd934c] group-hover:bg-[#bd934c]">
                                    <Icon size={21} />
                                </div>

                                {/* Number */}
                                <span className="absolute right-7 top-8 text-xs font-semibold tracking-widest text-white/70">
                                    0{item.id}
                                </span>

                                {/* Content */}
                                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">

                                    <span className="text-[10px] font-bold tracking-[3px] text-[#d5ad70]">
                                        {item.subtitle}
                                    </span>

                                    <h3 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm text-gray-300">
                                        {item.description}
                                    </p>

                                    <div className="mt-7 flex items-center justify-between border-t border-white/30 pt-5">

                                        <span className="text-xs font-bold uppercase tracking-[2px] text-white">
                                            Explore Styles
                                        </span>

                                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#bd934c] text-white transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                                            <ArrowUpRight size={21} />
                                        </span>

                                    </div>
                                </div>
                            </Link>
                        );
                    })}

                </div>

                {/* Bottom Statement */}
                <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center">
                    <Footprints size={25} className="text-[#bd934c]" />

                    <p className="font-serif text-xl italic text-gray-700 sm:text-2xl">
                        Different Moments. One Unique Style.
                    </p>
                </div>

            </div>
        </section>
    );
}