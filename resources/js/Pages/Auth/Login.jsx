import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import {
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ArrowRight,
    ShieldCheck,
    Footprints,
    Sparkles,
} from 'lucide-react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Admin Login | ARP Footwear" />

            <div className="min-h-screen bg-[#f7f5f0] p-3 sm:p-6 lg:p-8">
                <div className="mx-auto grid min-h-[calc(100vh-24px)] max-w-[1500px] overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/10 sm:min-h-[calc(100vh-48px)] lg:grid-cols-2">

                    {/* LEFT BRAND SECTION */}
                    <div className="relative hidden overflow-hidden bg-[#171717] lg:flex lg:flex-col lg:justify-between">

                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&q=90"
                                alt="Premium footwear"
                                className="h-full w-full object-cover opacity-35"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/50 to-[#171717]/90" />
                        </div>

                        <div className="relative z-10 p-12 xl:p-16">

                            <div className="flex items-center gap-3">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c49a6c] text-black">
                                    <Footprints size={30} />
                                </div>

                                <div>
                                    <h1 className="text-3xl font-black tracking-[0.2em] text-white">
                                        ARP
                                    </h1>
                                    <p className="text-[10px] tracking-[0.35em] text-[#c49a6c]">
                                        FOOTWEAR
                                    </p>
                                </div>
                            </div>

                            <div className="mt-28 max-w-lg">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#c49a6c]/40 bg-[#c49a6c]/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#d6b58e]">
                                    <Sparkles size={14} />
                                    Admin Portal
                                </span>

                                <h2 className="mt-7 text-5xl font-bold leading-tight text-white xl:text-6xl">
                                    Style Begins
                                    <br />
                                    <span className="text-[#c49a6c]">
                                        With Every Step.
                                    </span>
                                </h2>

                                <p className="mt-6 max-w-md text-base leading-8 text-white/60">
                                    Welcome to the ARP Footwear administration
                                    portal. Manage your brand, products and
                                    collections from one place.
                                </p>
                            </div>
                        </div>

                        <div className="relative z-10 flex items-center justify-between border-t border-white/10 px-12 py-8 xl:px-16">
                            <p className="text-xs text-white/40">
                                © {new Date().getFullYear()} ARP Footwear
                            </p>

                            <div className="flex items-center gap-2 text-xs text-[#c49a6c]">
                                <ShieldCheck size={16} />
                                Secure Admin Access
                            </div>
                        </div>
                    </div>

                    {/* RIGHT LOGIN SECTION */}
                    <div className="flex items-center justify-center px-5 py-12 sm:px-12 lg:px-16 xl:px-24">

                        <div className="w-full max-w-md">

                            {/* Mobile Logo */}
                            <div className="mb-12 flex justify-center lg:hidden">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#171717] text-[#c49a6c]">
                                        <Footprints size={27} />
                                    </div>

                                    <div>
                                        <h1 className="text-2xl font-black tracking-[0.2em] text-[#171717]">
                                            ARP
                                        </h1>
                                        <p className="text-[10px] tracking-[0.3em] text-[#c49a6c]">
                                            FOOTWEAR
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-10">
                                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#c49a6c]">
                                    Welcome Back
                                </p>

                                <h2 className="text-4xl font-bold tracking-tight text-[#171717]">
                                    Admin Login
                                </h2>

                                <p className="mt-3 text-sm leading-6 text-gray-500">
                                    Enter your credentials to access the
                                    administration dashboard.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* EMAIL */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Email Address
                                    </label>

                                    <div className="relative">
                                        <Mail
                                            size={19}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            placeholder="admin@example.com"
                                            autoComplete="username"
                                            className="h-14 w-full rounded-xl border border-gray-200 bg-[#fafafa] pl-12 pr-4 text-sm outline-none transition focus:border-[#c49a6c] focus:ring-4 focus:ring-[#c49a6c]/10"
                                        />
                                    </div>

                                    {errors.email && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* PASSWORD */}
                                <div>
                                    <div className="mb-2">
                                        <label className="text-sm font-semibold text-gray-700">
                                            Password
                                        </label>

                                    </div>

                                    <div className="relative">
                                        <LockKeyhole
                                            size={19}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={(e) =>
                                                setData('password', e.target.value)
                                            }
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            className="h-14 w-full rounded-xl border border-gray-200 bg-[#fafafa] pl-12 pr-12 text-sm outline-none transition focus:border-[#c49a6c] focus:ring-4 focus:ring-[#c49a6c]/10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#c49a6c]"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={19} />
                                            ) : (
                                                <Eye size={19} />
                                            )}
                                        </button>
                                    </div>

                                    {errors.password && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* REMEMBER ME */}
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData('remember', e.target.checked)
                                        }
                                        className="h-4 w-4 cursor-pointer accent-[#c49a6c]"
                                    />

                                    <label
                                        htmlFor="remember"
                                        className="cursor-pointer text-sm text-gray-500"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                {/* LOGIN BUTTON */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#171717] text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#c49a6c] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? 'Signing In...' : 'Sign In to Dashboard'}

                                    {!processing && (
                                        <ArrowRight
                                            size={19}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    )}
                                </button>

                            </form>

                            <div className="mt-10 flex items-center justify-center gap-2 border-t border-gray-100 pt-7 text-xs text-gray-400">
                                <ShieldCheck size={15} className="text-[#c49a6c]" />
                                Protected Admin Authentication
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
