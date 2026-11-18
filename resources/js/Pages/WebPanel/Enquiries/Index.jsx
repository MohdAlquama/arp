import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import {
    Search,
    Phone,
    Mail,
    MessageCircle,
    Trash2,
    X,
    Inbox,
    CircleDot,
    PhoneCall,
    CheckCircle2,
    Clock,
} from "lucide-react";
import DashboardLayout from "@/Layouts/AdministrationPanelLayout/DashboardLayout";

const BRAND = "#E31E24";

const STATUS = {
    new: { label: "New", cls: "bg-red-50 text-red-700 border-red-200" },
    contacted: { label: "Contacted", cls: "bg-amber-50 text-amber-800 border-amber-200" },
    closed: { label: "Closed", cls: "bg-green-50 text-green-700 border-green-200" },
};

const TYPES = ["Business Enquiry", "Product / Bulk Enquiry", "Become Distributor", "Support & Help"];

const fmtDate = (d) =>
    new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const cleanLabel = (l) =>
    l.replace("&laquo; Previous", "Previous").replace("Next &raquo;", "Next");

export default function Index({ enquiries, filters, counts }) {
    const [search, setSearch] = useState(filters.search || "");
    const [active, setActive] = useState(null); // enquiry opened in the side panel
    const first = useRef(true);

    /* Run the search 400ms after the user stops typing */
    useEffect(() => {
        if (first.current) {
            first.current = false;
            return;
        }
        const t = setTimeout(() => go({ search }), 400);
        return () => clearTimeout(t);
    }, [search]);

    const go = (patch) => {
        const params = { ...filters, ...patch };
        Object.keys(params).forEach((k) => !params[k] && delete params[k]);
        router.get("/admin/enquiries", params, { preserveState: true, preserveScroll: true, replace: true });
    };

    const setStatus = (enq, status) => {
        router.patch(`/admin/enquiries/${enq.id}`, { status }, {
            preserveScroll: true,
            onSuccess: () => setActive((a) => (a && a.id === enq.id ? { ...a, status } : a)),
        });
    };

    const remove = (enq) => {
        if (!window.confirm(`Delete the enquiry from ${enq.name}? This cannot be undone.`)) return;
        router.delete(`/admin/enquiries/${enq.id}`, {
            preserveScroll: true,
            onSuccess: () => setActive(null),
        });
    };

    const tabs = [
        { key: "", label: "All", count: counts.all, icon: Inbox },
        { key: "new", label: "New", count: counts.new, icon: CircleDot },
        { key: "contacted", label: "Contacted", count: counts.contacted, icon: PhoneCall },
        { key: "closed", label: "Closed", count: counts.closed, icon: CheckCircle2 },
    ];

    return (
        <div className="min-h-screen bg-[#F7F6F3] font-sans text-zinc-900 antialiased">
            <Head title="Enquiries | ARP Admin" />

            {/* Top bar */}
            <header className="border-b border-zinc-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <span className="h-8 w-1.5 rounded-full" style={{ backgroundColor: BRAND }} />
                        <div>
                            <h1 className="text-xl font-extrabold tracking-tight">Enquiries</h1>
                            <p className="text-sm text-zinc-500">Messages from the website contact form</p>
                        </div>
                    </div>
                    <a href="/" className="text-sm font-semibold text-zinc-600 hover:text-zinc-900">
                        View website
                    </a>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Status tabs */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {tabs.map(({ key, label, count, icon: Icon }) => {
                        const on = (filters.status || "") === key;
                        return (
                            <button
                                key={label}
                                onClick={() => go({ status: key })}
                                style={on ? { borderColor: BRAND, boxShadow: `0 0 0 3px ${BRAND}1A` } : undefined}
                                className="flex items-center gap-3 rounded-xl border-2 border-zinc-200 bg-white p-4 text-left transition hover:border-zinc-300"
                            >
                                <span
                                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                                    style={on ? { backgroundColor: BRAND, color: "#fff" } : { backgroundColor: "#f4f4f5", color: "#52525b" }}
                                >
                                    <Icon size={19} />
                                </span>
                                <span>
                                    <span className="block text-2xl font-extrabold leading-none">{count}</span>
                                    <span className="text-sm font-medium text-zinc-500">{label}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Filters */}
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                        <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, phone, email or subject"
                            className="w-full rounded-lg border border-zinc-300 bg-white py-3 pl-10 pr-4 text-sm focus:border-[#E31E24] focus:outline-none focus:ring-4 focus:ring-red-100"
                        />
                    </div>
                    <select
                        value={filters.type || ""}
                        onChange={(e) => go({ type: e.target.value })}
                        className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm focus:border-[#E31E24] focus:outline-none focus:ring-4 focus:ring-red-100"
                    >
                        <option value="">All enquiry types</option>
                        {TYPES.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>

                {/* List */}
                <div className="mt-5 overflow-hidden rounded-xl border border-zinc-200 bg-white">
                    {enquiries.data.length === 0 ? (
                        <div className="p-12 text-center">
                            <Inbox size={36} className="mx-auto text-zinc-300" />
                            <p className="mt-3 font-bold">No enquiries found</p>
                            <p className="text-sm text-zinc-500">Try a different search or filter.</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop table */}
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full text-left text-sm">
                                    <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-600">
                                        <tr>
                                            <th className="px-5 py-3 font-semibold">Customer</th>
                                            <th className="px-5 py-3 font-semibold">Subject</th>
                                            <th className="px-5 py-3 font-semibold">Type</th>
                                            <th className="px-5 py-3 font-semibold">Received</th>
                                            <th className="px-5 py-3 font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100">
                                        {enquiries.data.map((e) => (
                                            <tr key={e.id} onClick={() => setActive(e)} className="cursor-pointer transition hover:bg-zinc-50">
                                                <td className="px-5 py-4">
                                                    <p className="font-bold">{e.name}</p>
                                                    <p className="text-zinc-500">{e.phone}</p>
                                                </td>
                                                <td className="max-w-xs px-5 py-4">
                                                    <p className="truncate font-medium">{e.subject}</p>
                                                    <p className="truncate text-zinc-500">{e.message}</p>
                                                </td>
                                                <td className="px-5 py-4 text-zinc-600">{e.type}</td>
                                                <td className="whitespace-nowrap px-5 py-4 text-zinc-600">{fmtDate(e.created_at)}</td>
                                                <td className="px-5 py-4">
                                                    <StatusBadge status={e.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile cards */}
                            <ul className="divide-y divide-zinc-100 md:hidden">
                                {enquiries.data.map((e) => (
                                    <li key={e.id}>
                                        <button onClick={() => setActive(e)} className="block w-full p-4 text-left">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="truncate font-bold">{e.name}</p>
                                                    <p className="text-sm text-zinc-500">{e.phone}</p>
                                                </div>
                                                <StatusBadge status={e.status} />
                                            </div>
                                            <p className="mt-2 truncate text-sm font-medium">{e.subject}</p>
                                            <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                                                <Clock size={13} /> {fmtDate(e.created_at)}
                                            </p>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                {/* Pagination */}
                {enquiries.last_page > 1 && (
                    <nav className="mt-5 flex flex-wrap items-center justify-center gap-1.5" aria-label="Pagination">
                        {enquiries.links.map((l, i) =>
                            l.url ? (
                                <Link
                                    key={i}
                                    href={l.url}
                                    preserveScroll
                                    style={l.active ? { backgroundColor: BRAND, borderColor: BRAND, color: "#fff" } : undefined}
                                    className="rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-sm font-semibold hover:border-zinc-400"
                                >
                                    {cleanLabel(l.label)}
                                </Link>
                            ) : (
                                <span key={i} className="rounded-lg px-3.5 py-2 text-sm text-zinc-400">
                                    {cleanLabel(l.label)}
                                </span>
                            )
                        )}
                    </nav>
                )}
            </main>

            {/* Detail panel */}
            {active && (
                <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
                    <button className="absolute inset-0 bg-black/40" onClick={() => setActive(null)} aria-label="Close panel" />
                    <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
                        <div className="flex items-start justify-between border-b border-zinc-200 p-5">
                            <div>
                                <h2 className="text-lg font-extrabold">{active.name}</h2>
                                <p className="text-sm text-zinc-500">{fmtDate(active.created_at)}</p>
                            </div>
                            <button onClick={() => setActive(null)} className="rounded-lg p-2 hover:bg-zinc-100" aria-label="Close">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 space-y-5 overflow-y-auto p-5">
                            <div className="grid grid-cols-3 gap-2">
                                <a href={`tel:${active.phone}`} className="flex items-center justify-center gap-1.5 rounded-lg bg-zinc-900 py-2.5 text-sm font-bold text-white">
                                    <Phone size={15} /> Call
                                </a>
                                <a
                                    href={`https://wa.me/${active.phone.replace(/\D/g, "").replace(/^(\d{10})$/, "91$1")}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-bold text-white"
                                    style={{ backgroundColor: "#16a34a" }}
                                >
                                    <MessageCircle size={15} /> WhatsApp
                                </a>
                                {active.email ? (
                                    <a href={`mailto:${active.email}`} className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-300 py-2.5 text-sm font-bold">
                                        <Mail size={15} /> Email
                                    </a>
                                ) : (
                                    <span className="flex items-center justify-center rounded-lg border border-zinc-200 py-2.5 text-sm text-zinc-400">No email</span>
                                )}
                            </div>

                            <Detail label="Phone" value={active.phone} />
                            <Detail label="Email" value={active.email || "Not given"} />
                            <Detail label="Enquiry type" value={active.type} />
                            <Detail label="Subject" value={active.subject} />
                            <div>
                                <p className="text-sm font-semibold text-zinc-500">Message</p>
                                <p className="mt-1 whitespace-pre-wrap rounded-lg bg-zinc-50 p-4 text-sm leading-6">{active.message}</p>
                            </div>

                            <div>
                                <p className="mb-2 text-sm font-semibold text-zinc-500">Status</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {Object.entries(STATUS).map(([key, s]) => {
                                        const on = active.status === key;
                                        return (
                                            <button
                                                key={key}
                                                onClick={() => setStatus(active, key)}
                                                style={on ? { backgroundColor: BRAND, borderColor: BRAND, color: "#fff" } : undefined}
                                                className="rounded-lg border-2 border-zinc-300 py-2.5 text-sm font-bold transition hover:border-zinc-400"
                                            >
                                                {s.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-zinc-200 p-4">
                            <button
                                onClick={() => remove(active)}
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-2.5 text-sm font-bold text-red-700 hover:bg-red-50"
                            >
                                <Trash2 size={16} /> Delete enquiry
                            </button>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
}

function StatusBadge({ status }) {
    const s = STATUS[status] || STATUS.new;
    return <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-bold ${s.cls}`}>{s.label}</span>;
}

function Detail({ label, value }) {
    return (
        <div>
            <p className="text-sm font-semibold text-zinc-500">{label}</p>
            <p className="mt-0.5 break-words font-medium">{value}</p>
        </div>
    );
}
Index.layout = (page) => <DashboardLayout title="Enquiries">{page}</DashboardLayout>
