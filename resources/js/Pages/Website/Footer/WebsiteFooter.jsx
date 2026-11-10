import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    ArrowRight,
    ArrowUpRight,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Mail,
    Phone,
    MapPin,
    Footprints,
    ChevronRight,
    Send,
    Heart,
} from "lucide-react";

const footerLinks = {
    company: [
        { label: "About Us", href: "/about" },
        { label: "Our Journey", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQs", href: "/about" },
    ],

    categories: [
        { label: "Men's Footwear", href: "/products" },
        { label: "Women's Footwear", href: "/products" },
        { label: "Casual Shoes", href: "/products" },
        { label: "Formal Shoes", href: "/products" },
    ],

    information: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
        { label: "Disclaimer", href: "/disclaimer" },
    ],
};

const socialLinks = [
    {
        icon: Instagram,
        href: "#",
        label: "Instagram",
    },
    {
        icon: Facebook,
        href: "#",
        label: "Facebook",
    },
    {
        icon: Twitter,
        href: "#",
        label: "Twitter",
    },
    {
        icon: Youtube,
        href: "#",
        label: "YouTube",
    },
];

const FooterHeading = ({ children }) => (
    <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-white">
        {children}
    </h3>
);

const FooterLink = ({ href, children }) => (
    <Link
        href={href}
        className="group inline-flex items-center gap-2 text-sm text-gray-400 transition duration-300 hover:translate-x-1 hover:text-[#c49a6c]"
    >
        <ChevronRight
            size={13}
            className="text-[#c49a6c] opacity-0 transition group-hover:opacity-100"
        />
        {children}
    </Link>
);

export default function WebsiteFooter() {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();

        if (!email.trim()) return;

        // Connect newsletter subscription API here.
        console.log("Newsletter email:", email);

        setEmail("");
    };

    return (
        <footer className="relative overflow-hidden bg-[#151515] text-white">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full border border-white/[0.04]" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full border border-white/[0.04]" />

            {/* Newsletter Section */}
            <div className="relative border-b border-white/10">
                <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-20">

                    <div>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#c49a6c]">
                            Stay Connected
                        </span>

                        <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                            Stay In Style.
                            <span className="block font-serif font-medium italic text-[#c49a6c]">
                                Stay With ARP.
                            </span>
                        </h2>

                        <p className="mt-4 max-w-lg text-sm leading-7 text-gray-400">
                            Discover new footwear styles, fresh collections,
                            and updates from the world of ARP Footwear.
                        </p>
                    </div>

                    <div className="lg:pl-10">
                        <form
                            onSubmit={handleSubscribe}
                            className="flex flex-col gap-3 sm:flex-row"
                        >
                            <div className="flex flex-1 items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-4 transition focus-within:border-[#c49a6c]">
                                <Mail
                                    size={19}
                                    className="shrink-0 text-[#c49a6c]"
                                />

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                    className="w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500 focus:ring-0"
                                />
                            </div>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#c49a6c] px-7 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-[#171717]"
                            >
                                Subscribe
                                <Send size={16} />
                            </button>
                        </form>

                        <p className="mt-3 text-xs text-gray-500">
                            Stay updated with ARP. No unnecessary emails.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">

                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_0.9fr_1.1fr] lg:gap-10">

                    {/* Brand Column */}
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3"
                        >
                            <img
                                src="/asset/ARP_Logo.jpg"
                                alt="ARP Footwear"
                                className="h-14 w-14 rounded-xl object-contain"
                            />

                            <div>
                                <h2 className="text-2xl font-black tracking-[0.15em] text-white">
                                    ARP
                                </h2>
                                <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#c49a6c]">
                                    Footwear
                                </p>
                            </div>
                        </Link>

                        <p className="mt-6 max-w-xs text-sm leading-7 text-gray-400">
                            Step into your own style with ARP Footwear.
                            Explore footwear that brings together modern
                            design and everyday expression.
                        </p>

                        {/* Social Icons */}
                        <div className="mt-7 flex items-center gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition duration-300 hover:border-[#c49a6c] hover:bg-[#c49a6c] hover:text-white"
                                    >
                                        <Icon size={17} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <FooterHeading>Company</FooterHeading>

                        <ul className="space-y-4">
                            {footerLinks.company.map((item) => (
                                <li key={item.label}>
                                    <FooterLink href={item.href}>
                                        {item.label}
                                    </FooterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <FooterHeading>Collections</FooterHeading>

                        <ul className="space-y-4">
                            {footerLinks.categories.map((item) => (
                                <li key={item.label}>
                                    <FooterLink href={item.href}>
                                        {item.label}
                                    </FooterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Information */}
                    <div>
                        <FooterHeading>Information</FooterHeading>

                        <ul className="space-y-4">
                            {footerLinks.information.map((item) => (
                                <li key={item.label}>
                                    <FooterLink href={item.href}>
                                        {item.label}
                                    </FooterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <FooterHeading>Get In Touch</FooterHeading>

                        <div className="space-y-6">

                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#c49a6c]">
                                    <MapPin size={18} />
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-white">
                                        Our Location
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-gray-400">
                                        Add your business address here.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#c49a6c]">
                                    <Phone size={18} />
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-white">
                                        Phone
                                    </p>
                                    <p className="mt-2 text-sm text-gray-400">
                                        Add your contact number
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#c49a6c]">
                                    <Mail size={18} />
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-white">
                                        Email
                                    </p>
                                    <p className="mt-2 break-all text-sm text-gray-400">
                                        Add your business email
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Brand Statement */}
                <div className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 sm:px-10">
                    <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

                        <div className="flex items-center gap-3">
                            <Footprints
                                size={30}
                                className="text-[#c49a6c]"
                            />

                            <div>
                                <p className="font-serif text-xl italic text-white sm:text-2xl">
                                    Walk Your Own Way.
                                </p>
                                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-500">
                                    The ARP Identity
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-sm font-bold text-[#c49a6c] transition hover:text-white"
                        >
                            Explore Our Collection
                            <ArrowUpRight size={17} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-5 py-6 text-center sm:px-8 md:flex-row lg:px-12">

                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} ARP Footwear. All rights reserved.
                    </p>

                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                        Made with
                        <Heart
                            size={13}
                            className="fill-[#c49a6c] text-[#c49a6c]"
                        />
                        for footwear lovers.
                    </p>

                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }}
                        className="text-xs font-semibold text-gray-400 transition hover:text-[#c49a6c]"
                    >
                        Back To Top ↑
                    </a>

                </div>
            </div>
        </footer>
    );
}