import React from 'react';
import { Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    Footprints,
    BriefcaseBusiness,
    Sparkles,
    Mountain,
    Baby,
    ShoppingBag,
} from 'lucide-react';

const categories = [
    {
        id: 1,
        name: 'Sports Shoes',
        subtitle: 'Performance, Comfort & Durability',
        image: '/asset/categories/sports-shoes.jpg',
        size: 'large',
        icon: Footprints,
        background: 'bg-[#171d22]',
        textColor: 'text-white',
    },
    {
        id: 2,
        name: 'Formal Shoes',
        subtitle: 'Elegant Style for Every Occasion',
        image: '/asset/categories/formal-shoes.jpg',
        size: 'normal',
        icon: BriefcaseBusiness,
        background: 'bg-[#f1e4d7]',
        textColor: 'text-[#171717]',
    },
    {
        id: 3,
        name: 'Casual Shoes',
        subtitle: 'Everyday Style with Extra Comfort',
        image: '/asset/categories/casual-shoes.jpg',
        size: 'normal',
        icon: Sparkles,
        background: 'bg-[#e2eff8]',
        textColor: 'text-[#171717]',
    },
    {
        id: 4,
        name: 'Sandals',
        subtitle: 'Lightweight & Breathable',
        image: '/asset/categories/sandals.jpg',
        size: 'small',
        icon: ShoppingBag,
        background: 'bg-[#f4e9dc]',
        textColor: 'text-[#171717]',
    },
    {
        id: 5,
        name: 'Slippers',
        subtitle: 'Soft, Flexible & Everyday Comfort',
        image: '/asset/categories/slippers.jpg',
        size: 'small',
        icon: Footprints,
        background: 'bg-[#e4f0f9]',
        textColor: 'text-[#171717]',
    },
    {
        id: 6,
        name: 'Kids Footwear',
        subtitle: 'Style and Comfort for Little Steps',
        image: '/asset/categories/kids-shoes.jpg',
        size: 'small',
        icon: Baby,
        background: 'bg-[#fae8e9]',
        textColor: 'text-[#171717]',
    },
    {
        id: 7,
        name: 'Outdoor Footwear',
        subtitle: 'Rugged Style for Every Adventure',
        image: '/asset/categories/outdoor-shoes.jpg',
        size: 'small',
        icon: Mountain,
        background: 'bg-[#e9e1d6]',
        textColor: 'text-[#171717]',
    },
];

function CategoryCard({ category }) {
    const Icon = category.icon;

    return (
        <Link
            href={`/products?category=${category.id}`}
            className={`
                group relative isolate flex min-h-[260px]
                overflow-hidden rounded-2xl
                ${category.size === 'large'
                    ? 'min-h-[340px] lg:col-span-2'
                    : category.size === 'normal'
                        ? 'min-h-[300px]'
                        : 'min-h-[260px]'
                }
                ${category.background}
            `}
        >
            {/* Background Image */}
            <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="absolute inset-0 -z-20 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div
                className={`absolute inset-0 -z-10 transition duration-500 ${
                    category.size === 'large'
                        ? 'bg-gradient-to-r from-black/85 via-black/40 to-transparent'
                        : 'bg-gradient-to-r from-black/10 via-transparent to-transparent'
                }`}
            />

            <div className={`relative z-10 flex w-full flex-col items-start justify-center p-6 sm:p-8 ${
                category.size === 'large' ? 'max-w-[55%]' : 'max-w-[65%]'
            } ${category.textColor}`}>

                {/* Icon */}
                <div className="mb-5">
                    <Icon size={30} strokeWidth={1.7} />
                </div>

                {/* Category Name */}
                <h3 className={`font-black leading-tight tracking-tight ${
                    category.size === 'large'
                        ? 'text-3xl sm:text-4xl lg:text-5xl'
                        : 'text-2xl sm:text-3xl'
                }`}>
                    {category.name}
                </h3>

                {/* Subtitle */}
                <p className="mt-3 max-w-[220px] text-sm font-medium leading-6 opacity-80">
                    {category.subtitle}
                </p>

                {/* Explore Button */}
                <span className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-xs font-bold text-[#171717] shadow-lg transition-all duration-300 group-hover:bg-[#ed1c24] group-hover:text-white">
                    Explore Now
                    <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                </span>
            </div>

            {/* Category Number */}
            <span className="absolute bottom-5 right-6 text-sm font-black text-white/50">
                0{category.id}
            </span>
        </Link>
    );
}

export default function MenCategories() {
    return (
        <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24">

            <div className="mx-auto max-w-[1550px] px-5 sm:px-8 lg:px-12">

                {/* Heading */}
                <div className="mb-12 text-center">

                    <span className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-[#ed1c24]">
                        <span className="h-[2px] w-10 bg-[#ed1c24]" />
                        Our Categories
                        <span className="h-[2px] w-10 bg-[#ed1c24]" />
                    </span>

                    <h2 className="mt-5 text-4xl font-black tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
                        Shop by <span className="text-[#ed1c24]">Category</span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                        Explore our footwear collections, thoughtfully
                        selected for every style, lifestyle and occasion.
                    </p>

                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                        />
                    ))}

                </div>

                {/* Bottom Brand Line */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 sm:flex-row">

                    <div>
                        <h3 className="text-xl font-black tracking-widest text-[#171717]">
                            ARP <span className="text-[#ed1c24]">FOOTWEAR</span>
                        </h3>

                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                            Style Bhi Comfort Bhi
                        </p>
                    </div>

                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#171717] transition hover:text-[#ed1c24]"
                    >
                        View All Collections
                        <ArrowUpRight size={18} />
                    </Link>

                </div>

            </div>
        </section>
    );
}