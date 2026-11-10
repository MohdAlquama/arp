import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

// Vite: set VITE_API_URL only if API is on another domain. Same Laravel app => '/api'.
const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Shown only if the API is empty or unreachable
const fallbackCategories = [
    {
        id: 1,
        name: 'MEN',
        subtitle: 'CONFIDENCE IN EVERY STEP',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85',
        href: '/men',
    },
    {
        id: 2,
        name: 'WOMEN',
        subtitle: 'STYLE THAT SPEAKS',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&q=85',
        href: '/women',
    },
    {
        id: 3,
        name: 'CASUAL SHOES',
        subtitle: 'EVERYDAY ESSENTIALS',
        image: 'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=700&q=85',
        href: '/category/casual',
    },
    {
        id: 4,
        name: 'FORMAL SHOES',
        subtitle: 'MADE TO IMPRESS',
        image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=700&q=85',
        href: '/category/formal',
    },
    {
        id: 5,
        name: 'SPORTS SHOES',
        subtitle: 'MOVE WITHOUT LIMITS',
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=700&q=85',
        href: '/category/sports',
    },
    {
        id: 6,
        name: 'SANDALS',
        subtitle: 'COMFORT MEETS STYLE',
        image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=700&q=85',
        href: '/category/sandals',
    },
];

// Same tile sizes as the real grid: first 2 large, rest small
const tileSize = (index) =>
    index < 2
        ? 'h-[420px] sm:h-[480px] lg:col-span-2 lg:h-[510px]'
        : 'h-[320px] sm:h-[350px] lg:h-[370px]';

// Skeleton shown while categories load from the API
function CategoryGridSkeleton() {
    return (
        <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
            aria-busy="true"
            aria-label="Loading categories"
        >
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className={`relative block animate-pulse overflow-hidden bg-gray-200 ${tileSize(index)}`}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-400/40 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <div className="mb-3 h-2.5 w-32 rounded bg-white/50" />

                        <div className="flex items-end justify-between gap-3">
                            <div
                                className={`rounded bg-white/60 ${
                                    index < 2 ? 'h-9 w-48 sm:h-11' : 'h-7 w-36'
                                }`}
                            />
                            <div className="h-11 w-11 shrink-0 rounded-full bg-white/50" />
                        </div>

                        <div className="mt-5 h-[1px] w-12 bg-white/60" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function ShopByCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load tiles from Laravel API
    useEffect(() => {
        let cancelled = false;

        fetch(`${API_BASE}/home-categories`, {
            headers: { Accept: 'application/json' },
        })
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((data) => {
                if (cancelled) return;
                setCategories(
                    Array.isArray(data) && data.length > 0 ? data : fallbackCategories
                );
            })
            .catch(() => {
                if (!cancelled) setCategories(fallbackCategories);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-12 lg:py-24">

            <div className="mx-auto max-w-[1600px]">

                {/* SECTION HEADER */}

                <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end lg:mb-14">

                    <div>
                        <span className="text-[10px] font-semibold tracking-[4px] text-[#bd934c]">
                            FIND YOUR PERFECT PAIR
                        </span>

                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                            Shop By Category
                        </h2>

                        <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
                            Explore our exclusive collection designed
                            to complement every style and occasion.
                        </p>
                    </div>

                    <a
                        href="/category"
                        className="group flex w-fit items-center gap-3 border-b border-[#bd934c] pb-2 text-[11px] font-bold tracking-[1.5px] text-gray-900 transition hover:text-[#bd934c]"
                    >
                        VIEW ALL CATEGORIES

                        <ArrowUpRight
                            size={17}
                            className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                    </a>

                </div>

                {/* CATEGORY GRID */}

                {loading ? (
                    <CategoryGridSkeleton />
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">

                        {categories.map((category, index) => (
                            <a
                                key={category.id}
                                href={category.href}
                                className={`group relative block overflow-hidden bg-gray-100 ${tileSize(index)}`}
                            >

                                {/* CATEGORY IMAGE */}

                                {category.image && (
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />
                                )}

                                {/* IMAGE OVERLAY */}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent transition-all duration-500 group-hover:from-black/90" />

                                {/* CATEGORY NUMBER */}

                                <span className="absolute right-6 top-6 text-xs font-medium tracking-widest text-white/70">
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                {/* CATEGORY CONTENT */}

                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">

                                    {category.subtitle && (
                                        <p className="mb-3 text-[9px] font-semibold tracking-[3px] text-[#e4c58c] sm:text-[10px]">
                                            {category.subtitle}
                                        </p>
                                    )}

                                    <div className="flex items-end justify-between gap-3">

                                        <h3 className={`font-semibold tracking-wide ${
                                            index < 2
                                                ? 'text-3xl sm:text-4xl lg:text-5xl'
                                                : 'text-2xl sm:text-3xl'
                                        }`}>
                                            {category.name}
                                        </h3>

                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 transition-all duration-300 group-hover:border-[#bd934c] group-hover:bg-[#bd934c] group-hover:text-black">
                                            <ArrowUpRight size={21} />
                                        </span>

                                    </div>

                                    <div className="mt-5 h-[1px] w-12 bg-[#d1a85e] transition-all duration-500 group-hover:w-full" />

                                </div>

                            </a>
                        ))}

                    </div>
                )}

            </div>

        </section>
    );
}