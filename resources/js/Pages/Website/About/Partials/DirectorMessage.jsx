import React from 'react';
import { ArrowUpRight, Quote, MoveUpRight } from 'lucide-react';

const directors = [
    {
        id: 1,
        name: 'Director One',
        role: 'Managing Director',
        image: '/asset/director-1.jpg',
        message:
            'At ARP Footwear, our vision is to bring style and comfort together. We believe that every step represents confidence, personality and individuality.',
    },
    {
        id: 2,
        name: 'Director Two',
        role: 'Executive Director',
        image: '/asset/director-2.jpg',
        message:
            'Our commitment is to continuously explore new designs, improve our products and create footwear that connects with modern lifestyles.',
    },
    {
        id: 3,
        name: 'Director Three',
        role: 'Director',
        image: '/asset/director-3.jpg',
        message:
            'We are building ARP with dedication, creativity and a clear vision. Customer trust and our passion for footwear inspire our journey.',
    },
];

export default function DirectorMessage() {
    const [activeDirector, setActiveDirector] = React.useState(0);

    const director = directors[activeDirector];

    return (
        <section className="overflow-hidden bg-white py-20 sm:py-24 lg:py-28">

            <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">

                {/* Header */}
                <div className="mb-14 flex flex-col justify-between gap-6 border-b border-gray-200 pb-8 md:flex-row md:items-end">

                    <div>
                        <span className="text-xs font-bold uppercase tracking-[0.35em] text-red-600">
                            The People Behind ARP
                        </span>

                        <h2 className="mt-4 text-4xl font-black tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
                            Leadership<span className="text-red-600">.</span>
                        </h2>
                    </div>

                    <p className="max-w-md text-sm leading-7 text-gray-500">
                        A shared vision, a passion for footwear and a
                        commitment to bringing style and comfort together.
                    </p>
                </div>

                {/* Featured Director */}
                <div className="grid overflow-hidden bg-[#f7f6f3] lg:grid-cols-[0.85fr_1.15fr]">

                    {/* Image */}
                    <div className="relative min-h-[420px] overflow-hidden sm:min-h-[550px]">

                        <img
                            key={director.id}
                            src={director.image}
                            alt={director.name}
                            className="absolute inset-0 h-full w-full object-cover transition duration-700"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        <div className="absolute bottom-8 left-8 text-white sm:bottom-12 sm:left-12">

                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-400">
                                ARP Leadership
                            </span>

                            <h3 className="mt-3 text-3xl font-black sm:text-4xl">
                                {director.name}
                            </h3>

                            <p className="mt-2 text-sm text-white/70">
                                {director.role}
                            </p>
                        </div>

                        <div className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white">
                            <MoveUpRight size={25} />
                        </div>
                    </div>

                    {/* Message Content */}
                    <div className="flex flex-col justify-center px-7 py-12 sm:px-12 lg:px-16 xl:px-20">

                        <Quote
                            size={48}
                            className="mb-8 text-red-600"
                            strokeWidth={1.5}
                        />

                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-600">
                            A Message From Our Director
                        </span>

                        <h3 className="mt-6 text-3xl font-black leading-tight text-[#171717] sm:text-4xl xl:text-5xl">
                            Building a Brand
                            <br />
                            <span className="text-red-600">
                                With Every Step.
                            </span>
                        </h3>

                        <p className="mt-8 max-w-xl text-base leading-9 text-gray-600">
                            {director.message}
                        </p>

                        <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-7">

                            <div>
                                <p className="text-2xl font-black tracking-widest text-[#171717]">
                                    ARP
                                </p>

                                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                                    Style Bhi Comfort Bhi
                                </p>
                            </div>

                            <a
                                href="/about"
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-[#171717] transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                                aria-label="About ARP"
                            >
                                <ArrowUpRight size={22} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Director Selector */}
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {directors.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveDirector(index)}
                            className={`group flex items-center gap-4 border-b-2 p-4 text-left transition sm:p-5 ${
                                activeDirector === index
                                    ? 'border-red-600 bg-[#faf9f7]'
                                    : 'border-gray-100 hover:border-gray-300'
                            }`}
                        >

                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                    Director 0{index + 1}
                                </p>

                                <h4 className="mt-1 truncate text-base font-bold text-[#171717]">
                                    {item.name}
                                </h4>

                                <p className="mt-1 text-xs text-gray-500">
                                    {item.role}
                                </p>
                            </div>

                            <ArrowUpRight
                                size={20}
                                className={`shrink-0 transition ${
                                    activeDirector === index
                                        ? 'text-red-600'
                                        : 'text-gray-300 group-hover:text-red-600'
                                }`}
                            />
                        </button>
                    ))}

                </div>

                {/* Bottom Brand Statement */}
                <div className="mt-20 flex flex-col items-center justify-between gap-5 border-t border-gray-200 pt-10 text-center sm:flex-row sm:text-left">

                    <h3 className="text-2xl font-black tracking-tight text-[#171717] sm:text-3xl">
                        STYLE BHI <span className="text-red-600">COMFORT BHI.</span>
                    </h3>

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                        The ARP Footwear Vision
                    </p>

                </div>

            </div>
        </section>
    );
}