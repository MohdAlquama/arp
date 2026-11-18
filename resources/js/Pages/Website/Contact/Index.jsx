import WebsiteLayout from "@/Layouts/webiste/WebsiteLayout";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    ArrowUpRight,
    Send,
    MessageCircle,
    CheckCircle2,
    ChevronDown,
    Package,
    Handshake,
    LifeBuoy,
    Briefcase,
    ShieldCheck,
    Truck,
    BadgeCheck,
} from "lucide-react";
import SEO from "../Home/Partials/SEO";

/* ------------------------------------------------------------------ */
/*  CONFIG – change contact details only here                          */
/* ------------------------------------------------------------------ */
const BRAND = "#E31E24";
const PHONE_DISPLAY = "+91 70783 44153";
const PHONE_TEL = "+917078344153";
const WHATSAPP_NUMBER = "917078344153"; // country code + number, no "+"
const EMAIL = "support@arpfootwear.com";
const ADDRESS = "Azam Rubber Products Pvt. Ltd., GIDA, Gorakhpur, Uttar Pradesh, India";
const MAX_MESSAGE = 500;

const ENQUIRY_TYPES = [
    { id: "Business Enquiry", label: "Business", icon: Briefcase },
    { id: "Product / Bulk Enquiry", label: "Bulk order", icon: Package },
    { id: "Become Distributor", label: "Distributor", icon: Handshake },
    { id: "Support & Help", label: "Support", icon: LifeBuoy },
];

const HINTS = {
    "Business Enquiry": "Tell us what you need: product, quantity and the city you want it delivered to.",
    "Product / Bulk Enquiry": "Share the product, size range and quantity. Bulk orders get special B2B pricing.",
    "Become Distributor": "Tell us your city and shop or business details. We will share the catalogue and pricing.",
    "Support & Help": "Describe your problem with an order, size or quality. Include your order number if you have one.",
};

const FAQS = [
    {
        q: "How can I become an ARP business partner?",
        a: "Fill in the form with your city, shop or business details and expected quantity. Our team will call you within 1 business day and share the catalogue and pricing.",
    },
    {
        q: "Where is ARP located?",
        a: "Azam Rubber Products Pvt. Ltd. is in GIDA, Gorakhpur, Uttar Pradesh, India. You can visit us Monday to Saturday, 9 AM to 6 PM.",
    },
    {
        q: "How do I enquire about a bulk order?",
        a: "Choose “Bulk order” as the enquiry type and mention the product, size range and quantity. We offer special B2B pricing for bulk and distributor orders.",
    },
    {
        q: "How long does a reply take?",
        a: "Usually 2 to 4 hours during working time, and within 1 business day at most. For urgent enquiries, please call us directly.",
    },
];

const TRUST = [
    { icon: ShieldCheck, title: "Trusted brand", text: "Pan India network" },
    { icon: Truck, title: "Fast delivery", text: "All over India" },
    { icon: BadgeCheck, title: "Best quality", text: "Style and comfort" },
];

const EMPTY_FORM = {
    name: "",
    phone: "",
    email: "",
    type: "Business Enquiry",
    subject: "",
    message: "",
};

/* Rubber-sole tread pattern: the one memorable detail of the page */
const treadStyle = {
    backgroundColor: "#141414",
    backgroundImage: [
        "repeating-linear-gradient(135deg, rgba(255,255,255,0.045) 0 2px, transparent 2px 14px)",
        "repeating-linear-gradient(45deg, rgba(255,255,255,0.045) 0 2px, transparent 2px 14px)",
    ].join(","),
};

const fieldBase =
    "w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 " +
    "transition focus:border-[#E31E24] focus:outline-none focus:ring-4 focus:ring-red-100";
const labelBase = "mb-1.5 block text-sm font-semibold text-zinc-800";

export default function Contact({ turnstileSiteKey }) {
    const { flash } = usePage().props;
    const { data: form, setData, post, processing, errors, reset } = useForm({
        ...EMPTY_FORM,
        website: "", // honeypot: real people never fill this
        turnstile_token: "",
    });
    const [sent, setSent] = useState(false);
    const [waLink, setWaLink] = useState("");
    const [captchaReset, setCaptchaReset] = useState(0);

    const onChange = (e) => setData(e.target.name, e.target.value);
    const setType = (type) => setData("type", type);

    const onSubmit = (e) => {
        e.preventDefault();

        // Optional WhatsApp copy of the same enquiry, shown after it is saved
        const text = [
            `*New enquiry - ${form.type}*`,
            `Name: ${form.name}`,
            `Phone: ${form.phone}`,
            form.email && `Email: ${form.email}`,
            `Subject: ${form.subject}`,
            "",
            form.message,
        ]
            .filter((line) => line !== false && line !== "")
            .join("\n");

        post("/contact", {
            preserveScroll: true,
            onSuccess: () => {
                setWaLink(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`);
                setSent(true);
                reset();
                setTimeout(() => setSent(false), 15000);
            },
            // A Turnstile token works once only, so always get a fresh one
            onFinish: () => {
                setData("turnstile_token", "");
                setCaptchaReset((n) => n + 1);
            },
        });
    };

    return (
        <div className="overflow-x-hidden bg-[#F7F6F3] font-['Figtree',system-ui,sans-serif] text-zinc-900 antialiased">
            <SEO
                title="Contact"
                description="Contact ARP Footwear (Azam Rubber Products, Gorakhpur) for bulk orders, distributorship and product enquiries."
            />

            {/* ===================== HERO ===================== */}
            <section style={treadStyle} className="relative text-white">
                <div className="h-1.5 w-full" style={{ backgroundColor: BRAND }} />
                <div className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-24">
                    <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
                        <div>
                            <h1 className="font-['Bricolage_Grotesque',sans-serif] text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                                Style and comfort.
                                <span className="mt-2 block text-zinc-400">Talk to us directly.</span>
                            </h1>
                            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
                                Bulk order, distributorship or product enquiry. Fill in the form or give us a call and the ARP team will get back to you.
                            </p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#contact-form"
                                    className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-bold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                    style={{ backgroundColor: BRAND }}
                                >
                                    Send an enquiry <ArrowUpRight size={18} aria-hidden />
                                </a>
                                <a
                                    href={`tel:${PHONE_TEL}`}
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-base font-bold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    <Phone size={17} aria-hidden /> {PHONE_DISPLAY}
                                </a>
                            </div>
                        </div>

                        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 text-sm sm:grid-cols-3 lg:grid-cols-1">
                            {TRUST.map(({ icon: Icon, title, text }) => (
                                <div key={title} className="flex items-center gap-3.5 bg-[#141414]/90 p-4 backdrop-blur">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                                        <Icon size={19} aria-hidden />
                                    </span>
                                    <div>
                                        <dt className="font-bold">{title}</dt>
                                        <dd className="text-zinc-400">{text}</dd>
                                    </div>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            {/* ===================== FORM + DETAILS ===================== */}
            <section id="contact-form" className="mx-auto max-w-7xl scroll-mt-6 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
                    {/* FORM */}
                    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8">
                        <h2 className="font-['Bricolage_Grotesque',sans-serif] text-3xl font-extrabold tracking-tight sm:text-4xl">
                            How can we help?
                        </h2>
                        <p className="mt-2 max-w-prose text-zinc-600">
                            Fill in your details and we will reply within 1 business day, usually in 2 to 4 hours.
                        </p>

                        {sent && (
                            <div
                                role="status"
                                className="mt-6 flex items-start gap-2.5 rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800"
                            >
                                <CheckCircle2 size={19} className="mt-0.5 shrink-0" aria-hidden />
                                <div>
                                    <p>{flash?.success || "Thank you! Your enquiry has been received."}</p>
                                    {waLink && (
                                        <a href={waLink} target="_blank" rel="noreferrer" className="mt-1 inline-block underline">
                                            Need a faster reply? Send the same enquiry on WhatsApp
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        <form onSubmit={onSubmit} className="mt-7 space-y-5">
                            {/* Enquiry type */}
                            <div>
                                <p id="type-label" className={labelBase}>
                                    Enquiry type
                                </p>
                                <div role="radiogroup" aria-labelledby="type-label" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                    {ENQUIRY_TYPES.map(({ id, label, icon: Icon }) => {
                                        const active = form.type === id;
                                        return (
                                            <button
                                                key={id}
                                                type="button"
                                                role="radio"
                                                aria-checked={active}
                                                onClick={() => setType(id)}
                                                style={
                                                    active
                                                        ? { backgroundColor: BRAND, borderColor: BRAND, color: "#fff" }
                                                        : { backgroundColor: "#fff", borderColor: "#d4d4d8", color: "#3f3f46" }
                                                }
                                                className="relative flex items-center justify-center gap-2 rounded-lg border-2 px-3 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E31E24]"
                                            >
                                                <Icon size={16} aria-hidden />
                                                {label}
                                                {active && (
                                                    <CheckCircle2
                                                        size={16}
                                                        aria-hidden
                                                        className="absolute -right-2 -top-2 rounded-full bg-white"
                                                        style={{ color: BRAND }}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="mt-2 text-sm text-zinc-600" aria-live="polite">
                                    Selected:{" "}
                                    <span className="font-bold" style={{ color: BRAND }}>
                                        {ENQUIRY_TYPES.find((t) => t.id === form.type)?.label}
                                    </span>
                                </p>
                            </div>

                            <div>
                                <label htmlFor="name" className={labelBase}>
                                    Full name *
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    required
                                    autoComplete="name"
                                    value={form.name}
                                    onChange={onChange}
                                    placeholder="e.g. Mohd Honey Ansari"
                                    className={fieldBase}
                                />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="phone" className={labelBase}>
                                        Phone / WhatsApp *
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        inputMode="tel"
                                        required
                                        autoComplete="tel"
                                        pattern="[+0-9\s\-]{10,16}"
                                        title="Enter a valid 10-digit mobile number"
                                        value={form.phone}
                                        onChange={onChange}
                                        placeholder="+91 98XXX XXXXX"
                                        className={fieldBase}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className={labelBase}>
                                        Email (optional)
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={form.email}
                                        onChange={onChange}
                                        placeholder="you@email.com"
                                        className={fieldBase}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className={labelBase}>
                                    Subject *
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    required
                                    value={form.subject}
                                    onChange={onChange}
                                    placeholder="e.g. Bulk order of 500 pairs"
                                    className={fieldBase}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className={labelBase}>
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    maxLength={MAX_MESSAGE}
                                    value={form.message}
                                    onChange={onChange}
                                    placeholder={HINTS[form.type]}
                                    className={`${fieldBase} min-h-32 resize-y`}
                                />
                                <p className="mt-1 text-right text-xs text-zinc-500" aria-live="polite">
                                    {form.message.length} / {MAX_MESSAGE}
                                </p>
                            </div>
                            {/* Honeypot: hidden from people, bots fill it */}
                            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                                <label htmlFor="website">Leave this field empty</label>
                                <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
                            </div>

                            {/* Cloudflare Turnstile human check */}
                            {turnstileSiteKey && (
                                <Turnstile
                                    siteKey={turnstileSiteKey}
                                    resetKey={captchaReset}
                                    onToken={(t) => setData("turnstile_token", t)}
                                />
                            )}

                            {Object.keys(errors).length > 0 && (
                                <ul role="alert" className="space-y-1 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
                                    {Object.values(errors).map((msg, i) => (
                                        <li key={i}>{msg}</li>
                                    ))}
                                </ul>
                            )}

                            <button
                                type="submit"
                                disabled={processing || (turnstileSiteKey && !form.turnstile_token)}
                                className="flex w-full items-center justify-center gap-2 rounded-lg py-4 text-base font-bold text-white transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E31E24]"
                                style={{ backgroundColor: BRAND }}
                            >
                                {processing ? "Sending..." : "Send enquiry"} <Send size={17} aria-hidden />
                            </button>
                            <p className="text-center text-xs text-zinc-500">
                                Your information is used only to reply to your enquiry. No spam.
                            </p>
                        </form>
                    </div>

                    {/* DETAILS */}
                    <aside className="space-y-6 lg:sticky lg:top-6">
                        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                            <ul className="divide-y divide-zinc-100">
                                <ContactRow icon={Phone} label="Call" href={`tel:${PHONE_TEL}`} value={PHONE_DISPLAY} note="Mon – Sat, 9 AM – 6 PM" />
                                <ContactRow
                                    icon={MessageCircle}
                                    label="WhatsApp"
                                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                    value="Start a chat"
                                    note="Get the catalogue and rates directly"
                                    external
                                />
                                <ContactRow icon={Mail} label="Email" href={`mailto:${EMAIL}`} value={EMAIL} note="Reply within 24 hours" />
                                <ContactRow icon={Clock} label="Working hours" value="Monday – Saturday" note="09:00 AM – 06:00 PM" />
                            </ul>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                            <div className="aspect-[4/3] w-full bg-zinc-100">
                                <iframe
                                    title="ARP location map"
                                    src="https://maps.google.com/maps?q=GIDA%20Gorakhpur%20Uttar%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    className="h-full w-full border-0"
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            <div className="flex items-center justify-between gap-4 p-4">
                                <div className="flex items-start gap-3">
                                    <MapPin size={20} className="mt-0.5 shrink-0" style={{ color: BRAND }} aria-hidden />
                                    <p className="text-sm font-medium leading-6 text-zinc-700">{ADDRESS}</p>
                                </div>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=GIDA+Gorakhpur+Uttar+Pradesh"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-black"
                                >
                                    Directions <ArrowUpRight size={15} aria-hidden />
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* ===================== FAQ ===================== */}
            <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
                    <div>
                        <h2 className="font-['Bricolage_Grotesque',sans-serif] text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                            Frequently asked questions
                        </h2>
                        <p className="mt-3 max-w-sm leading-7 text-zinc-600">
                            Can’t find your answer? Fill in the form or call us directly.
                        </p>
                    </div>

                    <div className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
                        {FAQS.map((f, i) => (
                            <details key={f.q} open={i === 0} className="group p-5 sm:px-6">
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-bold leading-snug [&::-webkit-details-marker]:hidden">
                                    {f.q}
                                    <ChevronDown
                                        size={20}
                                        className="shrink-0 text-zinc-400 transition-transform group-open:rotate-180"
                                        aria-hidden
                                    />
                                </summary>
                                <p className="mt-3 max-w-prose leading-7 text-zinc-600">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== CLOSING CTA ===================== */}
            <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
                <div style={treadStyle} className="rounded-2xl p-7 text-white sm:p-10 lg:p-12">
                    <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
                        <div>
                            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                                Grow your business with ARP.
                            </h2>
                            <p className="mt-2 max-w-md text-zinc-400">
                                Distributor, retailer or bulk buyer, get in touch today.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <a
                                href="#contact-form"
                                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-bold text-white transition hover:brightness-110"
                                style={{ backgroundColor: BRAND }}
                            >
                                Become a partner <ArrowUpRight size={17} aria-hidden />
                            </a>
                            <a
                                href={`tel:${PHONE_TEL}`}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-zinc-900 transition hover:bg-zinc-200"
                            >
                                <Phone size={17} aria-hidden /> Call our team
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

/* Cloudflare Turnstile widget (loads Cloudflare's script once) */
function Turnstile({ siteKey, onToken, resetKey }) {
    const box = useRef(null);
    const widgetId = useRef(null);
    const tokenCb = useRef(onToken);
    tokenCb.current = onToken;

    useEffect(() => {
        let cancelled = false;

        const render = () => {
            if (cancelled || !window.turnstile || !box.current || widgetId.current !== null) return;
            widgetId.current = window.turnstile.render(box.current, {
                sitekey: siteKey,
                theme: "light",
                callback: (t) => tokenCb.current(t),
                "expired-callback": () => tokenCb.current(""),
                "error-callback": () => tokenCb.current(""),
            });
        };

        if (window.turnstile) {
            render();
        } else {
            let script = document.querySelector("script[data-turnstile]");
            if (!script) {
                script = document.createElement("script");
                script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
                script.async = true;
                script.defer = true;
                script.dataset.turnstile = "1";
                document.head.appendChild(script);
            }
            script.addEventListener("load", render);
        }

        return () => {
            cancelled = true;
            if (widgetId.current !== null && window.turnstile) {
                window.turnstile.remove(widgetId.current);
                widgetId.current = null;
            }
        };
    }, [siteKey]);

    useEffect(() => {
        if (resetKey && widgetId.current !== null && window.turnstile) {
            window.turnstile.reset(widgetId.current);
        }
    }, [resetKey]);

    return <div ref={box} className="min-h-[65px]" />;
}

/* Single row in the contact list */
function ContactRow({ icon: Icon, label, value, note, href, external }) {
    const body = (
        <div className="flex items-center gap-4 p-4 sm:p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50" style={{ color: BRAND }}>
                <Icon size={20} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-zinc-500">{label}</p>
                <p className="break-words font-bold text-zinc-900">{value}</p>
                <p className="text-sm text-zinc-500">{note}</p>
            </div>
            {href && <ArrowUpRight size={18} className="shrink-0 text-zinc-300 transition group-hover:text-[#E31E24]" aria-hidden />}
        </div>
    );

    return (
        <li>
            {href ? (
                <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group block transition hover:bg-zinc-50"
                >
                    {body}
                </a>
            ) : (
                body
            )}
        </li>
    );
}

Contact.layout = (page) => <WebsiteLayout>{page}</WebsiteLayout>;