import React, { useEffect, useState } from 'react';
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    MoveDown,
} from 'lucide-react';

// Vite: set VITE_API_URL in .env only if API is on another domain (e.g. https://admin.yoursite.com/api).
// Same Laravel app => relative '/api' works.
const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Shown only if the API is empty or unreachable
const fallbackSlides = [
    {
        subtitle: 'THE NEW COLLECTION',
        title: 'STEP INTO YOUR',
        highlight: 'STYLE.',
        description:
            'Discover footwear that defines your personality. Premium comfort, timeless design and everyday elegance.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=2000&q=90',
        button: 'EXPLORE COLLECTION',
        link: '/category',
        label: '01',
    },
    {
        subtitle: 'ELEVATE YOUR EVERYDAY',
        title: 'WALK WITH',
        highlight: 'CONFIDENCE.',
        description:
            'Designed for every occasion. Find your perfect pair and make every step memorable.',
        image: 'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=2000&q=90',
        button: 'SHOP MEN',
        link: '/men',
        label: '02',
    },
    {
        subtitle: 'EFFORTLESS ELEGANCE',
        title: 'YOUR STYLE.',
        highlight: 'YOUR STORY.',
        description:
            'From everyday essentials to statement styles, discover footwear made to stand out.',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=2000&q=90',
        button: 'SHOP WOMEN',
        link: '/women',
        label: '03',
    },
];

// Skeleton shown while slides load from the API (same size as the real hero)
function HeroSkeleton() {
    return (
        <section className="relative w-full overflow-hidden bg-[#111111]" aria-busy="true" aria-label="Loading hero banner">
            <div className="relative min-h-[580px] h-[calc(100vh-124px)] max-h-[780px] w-full animate-pulse">

                <div className="absolute inset-0 bg-gradient-to-r from-[#1b1b1b] via-[#161616] to-[#111111]" />

                <div className="relative z-10 mx-auto flex h-full max-w-[1600px] items-center px-6 sm:px-10 lg:px-20 xl:px-28">
                    <div className="w-full max-w-[700px]">

                        {/* subtitle */}
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-[1px] w-10 bg-white/20" />
                            <div className="h-3 w-40 rounded bg-white/10" />
                        </div>

                        {/* heading */}
                        <div className="h-11 w-[80%] rounded bg-white/10 sm:h-16 lg:h-20" />
                        <div className="mt-3 h-11 w-[55%] rounded bg-[#d1a85e]/20 sm:h-16 lg:h-20" />

                        {/* description */}
                        <div className="mt-8 space-y-3">
                            <div className="h-3 w-[75%] max-w-[470px] rounded bg-white/10" />
                            <div className="h-3 w-[60%] max-w-[380px] rounded bg-white/10" />
                        </div>

                        {/* buttons */}
                        <div className="mt-9 flex flex-wrap items-center gap-4">
                            <div className="h-[52px] w-52 bg-[#d1a85e]/25" />
                            <div className="h-[52px] w-36 border border-white/15" />
                        </div>

                    </div>
                </div>

                {/* controls */}
                <div className="absolute bottom-9 left-6 right-6 z-20 flex items-center justify-between sm:left-10 sm:right-10 lg:left-20 lg:right-20">
                    <div className="flex items-center gap-4">
                        <div className="h-7 w-8 rounded bg-white/10" />
                        <span className="h-[1px] w-12 bg-white/20" />
                        <div className="h-3 w-5 rounded bg-white/10" />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="mr-3 flex items-center gap-2">
                            <span className="h-[3px] w-9 bg-[#d1a85e]/40" />
                            <span className="h-[3px] w-4 bg-white/20" />
                            <span className="h-[3px] w-4 bg-white/20" />
                        </div>
                        <div className="h-10 w-10 border border-white/15" />
                        <div className="h-10 w-10 border border-white/15" />
                    </div>
                </div>

            </div>
        </section>
    );
}

export default function HeroSection() {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSlide, setActiveSlide] = useState(0);

    // Load slides from Laravel API
    useEffect(() => {
        let cancelled = false;

        fetch(`${API_BASE}/hero-slides`, {
            headers: { Accept: 'application/json' },
        })
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((data) => {
                if (cancelled) return;
                setSlides(Array.isArray(data) && data.length > 0 ? data : fallbackSlides);
                setActiveSlide(0);
            })
            .catch(() => {
                if (!cancelled) setSlides(fallbackSlides);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const total = slides.length;

    const nextSlide = () => setActiveSlide((prev) => (prev + 1) % total);
    const prevSlide = () => setActiveSlide((prev) => (prev - 1 + total) % total);

    // Auto-play (restarts when slide count changes)
    useEffect(() => {
        if (total < 2) return undefined;
        const interval = setInterval(
            () => setActiveSlide((prev) => (prev + 1) % total),
            5000
        );
        return () => clearInterval(interval);
    }, [total]);

    if (loading || total === 0) {
        return <HeroSkeleton />;
    }

    const current = slides[activeSlide] || slides[0];

    return (
        <section className="relative w-full overflow-hidden bg-[#111111]">

            {/* HERO SLIDER */}

            <div className="relative min-h-[580px] h-[calc(100vh-124px)] max-h-[780px] w-full">

                {/* BACKGROUND IMAGE */}

                {slides.map((slide, index) => (
                    <div
                        key={slide.id ?? slide.label}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            activeSlide === index ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        {slide.image && (
                            <img
                                src={slide.image}
                                alt={slide.title || 'ARP Footwear Collection'}
                                className="h-full w-full  object-center"
                            />
                        )}

                        {/* DARK OVERLAY */}

                        <div className="absolute inset-0 bg-black/45" />

                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
                    </div>
                ))}

                {/* CONTENT */}

                <div className="relative z-10 mx-auto flex h-full max-w-[1600px] items-center px-6 sm:px-10 lg:px-20 xl:px-28">

                    <div className="max-w-[700px] text-white">

                        {/* SUBTITLE */}

                        {current.subtitle && (
                            <div className="mb-6 flex items-center gap-3">

                                <span className="h-[1px] w-10 bg-[#d5ae64]" />

                                <p className="text-[10px] font-semibold tracking-[4px] text-[#e4c58c] sm:text-xs">
                                    {current.subtitle}
                                </p>

                            </div>
                        )}

                        {/* HEADING */}

                        <h1
                            key={current.id ?? current.label}
                            className="animate-[fadeUp_0.8s_ease-out] text-[43px] font-semibold leading-[1.12] tracking-[-1.5px] sm:text-6xl lg:text-[76px] xl:text-[88px]"
                        >
                            {current.title}

                            {current.highlight && (
                                <span className="mt-2 block text-[#d9b36e]">
                                    {current.highlight}
                                </span>
                            )}
                        </h1>

                        {/* DESCRIPTION */}

                        {current.description && (
                            <p className="mt-6 max-w-[470px] text-sm leading-7 text-gray-200 sm:text-base sm:leading-8">
                                {current.description}
                            </p>
                        )}

                        {/* BUTTONS */}

                        <div className="mt-9 flex flex-wrap items-center gap-4">

                            {current.button && current.link && (
                                <a
                                    href={current.link}
                                    className="group flex h-[52px] items-center gap-5 bg-[#d1a85e] px-7 text-[11px] font-bold tracking-[1.5px] text-black transition duration-300 hover:bg-white"
                                >
                                    {current.button}

                                    <ArrowRight
                                        size={17}
                                        className="transition-transform group-hover:translate-x-2"
                                    />
                                </a>
                            )}

                            <a
                                href="/category"
                                className="flex h-[52px] items-center border border-white/60 px-7 text-[11px] font-semibold tracking-[1.5px] text-white transition hover:border-[#d1a85e] hover:text-[#d1a85e]"
                            >
                                VIEW ALL
                            </a>

                        </div>

                    </div>

                </div>

                {/* SLIDER CONTROLS */}

                <div className="absolute bottom-9 left-6 right-6 z-20 flex items-center justify-between sm:left-10 sm:right-10 lg:left-20 lg:right-20">

                    {/* SLIDE NUMBER */}

                    <div className="flex items-center gap-4 text-white">

                        <span className="text-2xl font-semibold">
                            {String(activeSlide + 1).padStart(2, '0')}
                        </span>

                        <span className="h-[1px] w-12 bg-white/40" />

                        <span className="text-xs text-white/60">
                            {String(total).padStart(2, '0')}
                        </span>

                    </div>

                    {/* DOTS + ARROWS */}

                    <div className="flex items-center gap-3">

                        <div className="mr-3 flex items-center gap-2">

                            {slides.map((slide, index) => (
                                <button
                                    key={slide.id ?? slide.label}
                                    onClick={() => setActiveSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    className={`h-[3px] transition-all duration-300 ${
                                        activeSlide === index
                                            ? 'w-9 bg-[#d1a85e]'
                                            : 'w-4 bg-white/50'
                                    }`}
                                />
                            ))}

                        </div>

                        <button
                            onClick={prevSlide}
                            aria-label="Previous slide"
                            className="flex h-10 w-10 items-center justify-center border border-white/40 text-white transition hover:border-[#d1a85e] hover:bg-[#d1a85e] hover:text-black"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <button
                            onClick={nextSlide}
                            aria-label="Next slide"
                            className="flex h-10 w-10 items-center justify-center border border-white/40 text-white transition hover:border-[#d1a85e] hover:bg-[#d1a85e] hover:text-black"
                        >
                            <ChevronRight size={20} />
                        </button>

                    </div>

                </div>

                {/* SCROLL INDICATOR */}

                <a
                    href="#home-collections"
                    className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/80 transition hover:text-[#d1a85e] md:flex"
                >
                    <span className="text-[9px] tracking-[3px]">SCROLL DOWN</span>

                    <MoveDown size={17} className="animate-bounce" />
                </a>

            </div>

            {/* ANIMATION */}

            <style>{`
                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(25px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

        </section>
    );
}