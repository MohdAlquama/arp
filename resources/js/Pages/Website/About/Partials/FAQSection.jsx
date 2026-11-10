import React, { useState } from "react";
import {
    ChevronDown,
    HelpCircle,
    MessageCircle,
    Sparkles,
    Footprints,
} from "lucide-react";
import { Link } from "@inertiajs/react";

const faqs = [
    {
        question: "What is ARP Footwear?",
        answer:
            "ARP Footwear is a footwear brand focused on modern styles and everyday footwear choices. Our aim is to bring together style, comfort, and designs that match different personalities.",
    },
    {
        question: "What types of footwear does ARP offer?",
        answer:
            "ARP Footwear showcases different footwear styles and collections. Explore our website to discover the available categories and designs.",
    },
    {
        question: "How can I explore ARP collections?",
        answer:
            "Visit our Collections or Products section to explore different footwear designs, categories, and styles available on our website.",
    },
    {
        question: "How do I choose the right footwear style?",
        answer:
            "Consider your personal style, daily activities, preferred design, and comfort. You can explore different product categories to find a style that suits you.",
    },
    {
        question: "What makes ARP Footwear unique?",
        answer:
            "ARP believes footwear is more than just an accessory. Our focus is on bringing together modern designs, thoughtful details, and styles that let you express yourself.",
    },
    {
        question: "Does ARP introduce new collections?",
        answer:
            "We aim to keep exploring fresh footwear styles and collections. Keep visiting our website to discover the latest additions.",
    },
    {
        question: "How can I contact ARP Footwear?",
        answer:
            "For general questions or brand-related information, visit our Contact Us page and connect with the ARP Footwear team.",
    },
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFAQ = (index) => {
        setActiveIndex((current) => current === index ? null : index);
    };

    return (
        <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#d9b98b]/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-[#d9b98b]/10 blur-3xl" />

            <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

                {/* Heading */}
                <div className="mb-14 text-center">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#a47745]">
                        <span className="h-px w-8 bg-[#a47745]" />
                        Everything You Need To Know
                        <span className="h-px w-8 bg-[#a47745]" />
                    </span>

                    <h2 className="mt-5 text-4xl font-black tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
                        Frequently Asked
                        <span className="block font-serif font-medium italic text-[#a47745]">
                            Questions.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                        Curious about ARP Footwear? Find answers to common
                        questions about our brand, collections, and footwear
                        styles.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">

                    {/* Left Card */}
                    <div className="relative overflow-hidden rounded-3xl bg-[#171717] p-8 text-white sm:p-10 lg:sticky lg:top-28">

                        {/* Decoration */}
                        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/10" />

                        <div className="relative">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c49a6c]">
                                <HelpCircle size={28} />
                            </div>

                            <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-[#c49a6c]">
                                Get To Know Us
                            </p>

                            <h3 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                                Discover
                                <span className="block font-serif font-medium italic text-[#c49a6c]">
                                    ARP Footwear.
                                </span>
                            </h3>

                            <p className="mt-5 text-sm leading-7 text-gray-400">
                                Want to know more about our brand, footwear
                                styles, and collections? We are here to help
                                you discover ARP.
                            </p>

                            <div className="my-8 h-px bg-white/10" />

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                                    <MessageCircle size={21} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        Have More Questions?
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        We would love to hear from you.
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/contact"
                                className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#c49a6c] px-6 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-[#171717]"
                            >
                                Contact Us
                                <span className="text-lg">↗</span>
                            </Link>

                        </div>
                    </div>

                    {/* Right FAQ Accordion */}
                    <div className="space-y-4">

                        {faqs.map((faq, index) => {
                            const isOpen = activeIndex === index;

                            return (
                                <div
                                    key={index}
                                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                                        isOpen
                                            ? "border-[#c49a6c] bg-[#faf8f4] shadow-[0_12px_35px_rgba(0,0,0,0.04)]"
                                            : "border-gray-200 bg-white hover:border-[#c49a6c]/60"
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleFAQ(index)}
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-answer-${index}`}
                                        className="flex w-full items-center justify-between gap-5 p-5 text-left sm:p-6"
                                    >
                                        <div className="flex items-center gap-4">

                                            <span
                                                className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold sm:flex ${
                                                    isOpen
                                                        ? "bg-[#171717] text-white"
                                                        : "bg-[#f2eee8] text-[#a47745]"
                                                }`}
                                            >
                                                {String(index + 1).padStart(2, "0")}
                                            </span>

                                            <span
                                                className={`text-sm font-bold leading-6 sm:text-base ${
                                                    isOpen
                                                        ? "text-[#a47745]"
                                                        : "text-[#222]"
                                                }`}
                                            >
                                                {faq.question}
                                            </span>
                                        </div>

                                        <span
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                                                isOpen
                                                    ? "rotate-180 bg-[#171717] text-white"
                                                    : "bg-[#f2eee8] text-[#171717]"
                                            }`}
                                        >
                                            <ChevronDown size={18} />
                                        </span>
                                    </button>

                                    <div
                                        id={`faq-answer-${index}`}
                                        className={`grid transition-all duration-300 ease-in-out ${
                                            isOpen
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="border-t border-[#e8dfd2] px-5 pb-6 pt-4 sm:ml-[72px] sm:px-0 sm:pr-8">
                                                <p className="text-sm leading-7 text-gray-600">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>

                {/* Bottom Banner */}
                <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#e8dfd2] bg-[#faf8f4] p-7 sm:flex-row sm:p-10">

                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#171717] text-[#c49a6c]">
                            <Footprints size={27} />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-[#171717] sm:text-2xl">
                                Find Your Own Style
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Explore footwear that matches your personality.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/products"
                        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#171717] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#c49a6c] sm:w-auto"
                    >
                        Explore Collection
                        <Sparkles size={17} />
                    </Link>

                </div>

            </div>
        </section>
    );
}