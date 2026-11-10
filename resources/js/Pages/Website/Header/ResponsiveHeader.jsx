import React, { useEffect, useState } from 'react';
import { Deferred, Link, usePage } from '@inertiajs/react';

import {
    Search,
    UserRound,
    ShoppingBag,
    Menu,
    X,
    ChevronDown,
    Heart,
    Phone,
    Mail,
    ArrowRight,
    Instagram,
} from 'lucide-react';

/*
|--------------------------------------------------------------------------
| DESKTOP NAVIGATION SKELETON
|--------------------------------------------------------------------------
*/

function DesktopNavigationSkeleton() {
    return (
        <div className="hidden h-full items-center gap-5 lg:flex xl:gap-8">
            {[65, 75, 85, 70, 90, 60].map((width, index) => (
                <div
                    key={index}
                    className="h-3 animate-pulse rounded-full bg-gray-200"
                    style={{ width: `${width}px` }}
                />
            ))}
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| MOBILE NAVIGATION SKELETON
|--------------------------------------------------------------------------
*/

function MobileNavigationSkeleton() {
    return (
        <div className="space-y-1 px-4 py-3">
            {Array.from({ length: 8 }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between border-b border-gray-100 py-4"
                >
                    <div
                        className="h-3 animate-pulse rounded-full bg-gray-200"
                        style={{
                            width: `${90 + (index % 3) * 20}px`,
                        }}
                    />

                    <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                </div>
            ))}
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| MAIN RESPONSIVE HEADER
|--------------------------------------------------------------------------
*/

export default function ResponsiveHeader() {
    const { props } = usePage();

    const headerCategories = props.headerCategories ?? [];

    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [expanded, setExpanded] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | STATIC NAVIGATION
    |--------------------------------------------------------------------------
    */

    const staticNavigation = [
        {
            id: 'new-in',
            name: 'NEW IN',
            href: '/new-in',
        },
        {
            id: 'top-picks',
            name: 'TOP PICKS',
            href: '/top-picks',
        },
    ];

    /*
    |--------------------------------------------------------------------------
    | DYNAMIC CATEGORY NAVIGATION
    |--------------------------------------------------------------------------
    */

    const dynamicNavigation = headerCategories.map((category) => ({
        id: category.id,
        name: category.name.toUpperCase(),
        href: `/products?category=${category.id}`,

        children: (category.sub_categories ?? []).map((subCategory) => ({
            id: subCategory.id,
            name: subCategory.name,
            href: `/products?category=${category.id}&subcategory=${subCategory.id}`,
        })),
    }));

    /*
    |--------------------------------------------------------------------------
    | COMPLETE DESKTOP NAVIGATION
    |--------------------------------------------------------------------------
    */

    const navigation = [
        ...staticNavigation,
        ...dynamicNavigation,

        {
            id: 'luxure',
            name: 'LUXURE',
            href: '/luxure',
        },

        {
            id: 'deals',
            name: 'DEALS',
            href: '/deals',
            highlight: true,
        },
    ];

    /*
    |--------------------------------------------------------------------------
    | MOBILE NAVIGATION
    |--------------------------------------------------------------------------
    */

    const mobileNavigation = [
        ...navigation,

        {
            id: 'shop-by-occasion',
            name: 'SHOP BY OCCASION',
            href: '/occasion',

            children: [
                {
                    id: 'wedding',
                    name: 'Wedding',
                    href: '/occasion/wedding',
                },
                {
                    id: 'party-wear',
                    name: 'Party Wear',
                    href: '/occasion/party-wear',
                },
                {
                    id: 'office-wear',
                    name: 'Office Wear',
                    href: '/occasion/office-wear',
                },
                {
                    id: 'casual-wear',
                    name: 'Casual Wear',
                    href: '/occasion/casual-wear',
                },
            ],
        },

        {
            id: 'accessories',
            name: 'ACCESSORIES',
            href: '/accessories',
        },

        {
            id: 'my-account',
            name: 'MY ACCOUNT',
            href: '/account',

            children: [
                {
                    id: 'my-profile',
                    name: 'My Profile',
                    href: '/account',
                },
                {
                    id: 'my-wishlist',
                    name: 'Wishlist',
                    href: '/wishlist',
                },
            ],
        },
    ];

    /*
    |--------------------------------------------------------------------------
    | PREVENT BACKGROUND SCROLL
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    /*
    |--------------------------------------------------------------------------
    | CLOSE MOBILE MENU
    |--------------------------------------------------------------------------
    */

    const closeMobileMenu = () => {
        setMobileOpen(false);
        setExpanded(null);
    };

    /*
    |--------------------------------------------------------------------------
    | MOBILE ACCORDION
    |--------------------------------------------------------------------------
    */

    const toggleAccordion = (name) => {
        setExpanded((current) => (
            current === name ? null : name
        ));
    };

    /*
    |--------------------------------------------------------------------------
    | SEARCH HANDLER
    |--------------------------------------------------------------------------
    */

    const handleSearch = (e) => {
        e.preventDefault();

        const value = searchValue.trim();

        if (!value) return;

        window.location.href = `/products?search=${encodeURIComponent(value)}`;
    };

    return (
        <header className="relative z-50 w-full bg-white text-black">

            {/* =====================================================
                ANNOUNCEMENT BAR
            ====================================================== */}

            <div className="relative flex h-9 items-center justify-between bg-black px-4 text-[10px] tracking-[0.8px] text-white md:px-8 lg:px-12">

                <a
                    href="tel:+917078344153"
                    className="hidden items-center gap-2 transition hover:text-[#d5a84b] md:flex"
                >
                    <Phone size={13} />
                    +91-7078344153
                </a>

                <div className="mx-auto flex items-center justify-center gap-2 whitespace-nowrap md:absolute md:left-1/2 md:-translate-x-1/2">
                    <span className="text-[#d6ad5b]">✦</span>

                    STYLE BHI COMFORT BHI

                    <span className="text-[#d6ad5b]">✦</span>
                </div>

                <a
                    href="mailto:support@arpfootwear.com"
                    className="hidden items-center gap-2 transition hover:text-[#d5a84b] md:flex"
                >
                    <Mail size={14} />
                    support@arpfootwear.com
                </a>

            </div>

            {/* =====================================================
                MAIN HEADER
            ====================================================== */}

            <div className="relative border-b border-gray-100 bg-white">

                <div className="mx-auto flex h-[76px] max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:h-[88px] lg:px-12 xl:px-16">

                    {/* LOGO AND MOBILE MENU */}

                    <div className="flex shrink-0 items-center gap-3">

                        <button
                            type="button"
                            onClick={() => setMobileOpen(true)}
                            className="flex items-center justify-center lg:hidden"
                            aria-label="Open navigation"
                        >
                            <Menu size={25} strokeWidth={1.7} />
                        </button>

                        <Link
                            href="/"
                            className="flex items-center"
                        >
                            <img
                                src="/asset/ARP_Logo.jpg"
                                alt="ARP Footwear"
                                className="h-[57px] w-[110px] object-contain sm:w-[125px] lg:h-[68px] lg:w-[145px]"
                            />
                        </Link>

                    </div>

                    {/* =================================================
                        DESKTOP NAVIGATION WITH SKELETON
                    ================================================== */}

                    <Deferred
                        data="headerCategories"
                        fallback={<DesktopNavigationSkeleton />}
                    >

                        <nav className="hidden h-full items-center gap-5 lg:flex xl:gap-8">

                            {navigation.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative flex h-full items-center"
                                >

                                    <Link
                                        href={item.href}
                                        className={`relative flex h-full items-center text-[12px] font-semibold tracking-[0.5px] transition-colors duration-200 xl:text-[13px]
                                            ${
                                                item.highlight
                                                    ? 'text-[#bd8b32]'
                                                    : 'text-gray-800 hover:text-[#bd8b32]'
                                            }`}
                                    >
                                        {item.name}

                                        {item.children?.length > 0 && (
                                            <ChevronDown
                                                size={13}
                                                className="ml-1 transition-transform duration-200 group-hover:rotate-180"
                                            />
                                        )}

                                        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#bd8b32] transition-all duration-300 group-hover:w-full" />
                                    </Link>

                                    {/* DESKTOP DROPDOWN */}

                                    {item.children?.length > 0 && (
                                        <div className="invisible absolute left-0 top-full z-50 w-[245px] translate-y-3 border-t-2 border-[#c49a4a] bg-white opacity-0 shadow-[0_12px_35px_rgba(0,0,0,0.09)] transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                                            <div className="py-3">

                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.id}
                                                        href={child.href}
                                                        className="flex items-center justify-between px-6 py-3 text-[13px] text-gray-600 transition-all hover:bg-gray-50 hover:pl-8 hover:text-[#bd8b32]"
                                                    >
                                                        {child.name}

                                                        <ArrowRight
                                                            size={13}
                                                            className="opacity-0 transition group-hover:opacity-100"
                                                        />
                                                    </Link>
                                                ))}

                                            </div>

                                        </div>
                                    )}

                                </div>
                            ))}

                        </nav>

                    </Deferred>

                    {/* RIGHT ACTION ICONS */}

                    <div className="flex shrink-0 items-center gap-3 sm:gap-5 lg:gap-6">

                        {/* SEARCH */}

                        <button
                            type="button"
                            onClick={() => setSearchOpen((current) => !current)}
                            aria-label="Search products"
                            className="transition duration-200 hover:text-[#bd8b32]"
                        >
                            {searchOpen ? (
                                <X size={22} strokeWidth={1.8} />
                            ) : (
                                <Search size={22} strokeWidth={1.8} />
                            )}
                        </button>

                        {/* ACCOUNT */}

                        <Link
                            href="/account"
                            aria-label="My account"
                            className="hidden transition duration-200 hover:text-[#bd8b32] sm:block"
                        >
                            <UserRound size={23} strokeWidth={1.8} />
                        </Link>

                        {/* WISHLIST */}

                        <Link
                            href="/wishlist"
                            aria-label="Wishlist"
                            className="hidden transition duration-200 hover:text-[#bd8b32] sm:block"
                        >
                            <Heart size={22} strokeWidth={1.8} />
                        </Link>

                        {/* CART */}

                        <Link
                            href="/cart"
                            aria-label="Shopping bag"
                            className="relative transition duration-200 hover:text-[#bd8b32]"
                        >
                            <ShoppingBag size={23} strokeWidth={1.8} />

                            <span className="absolute -right-2 -top-2 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#bd8b32] px-1 text-[9px] font-semibold text-white">
                                0
                            </span>
                        </Link>

                    </div>

                </div>

            </div>

            {/* =====================================================
                SEARCH PANEL
            ====================================================== */}

            <div
                className={`absolute left-0 top-full z-40 w-full border-t border-gray-100 bg-white shadow-xl transition-all duration-300 ${
                    searchOpen
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible -translate-y-3 opacity-0'
                }`}
            >

                <form
                    onSubmit={handleSearch}
                    className="mx-auto flex max-w-3xl items-center gap-4 px-5 py-5"
                >

                    <Search
                        size={22}
                        className="shrink-0 text-gray-400"
                    />

                    <input
                        type="search"
                        placeholder="Search for shoes, styles and more..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full border-none bg-transparent py-2 text-sm outline-none placeholder:text-gray-400 focus:ring-0"
                    />

                    <button
                        type="submit"
                        className="text-xs font-semibold tracking-wider text-gray-700 transition hover:text-[#bd8b32]"
                    >
                        SEARCH
                    </button>

                    <button
                        type="button"
                        onClick={() => setSearchOpen(false)}
                        className="text-xs font-semibold tracking-wider text-gray-500 hover:text-black"
                    >
                        CLOSE
                    </button>

                </form>

            </div>

            {/* =====================================================
                MOBILE OVERLAY
            ====================================================== */}

            <div
                onClick={closeMobileMenu}
                className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
                    mobileOpen
                        ? 'visible opacity-100'
                        : 'invisible opacity-0'
                }`}
            />

            {/* =====================================================
                MOBILE SIDEBAR
            ====================================================== */}

            <aside
                className={`fixed left-0 top-0 z-[70] flex h-[100dvh] w-[85%] max-w-[360px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
                    mobileOpen
                        ? 'translate-x-0'
                        : '-translate-x-full'
                }`}
            >

                {/* SIDEBAR HEADER */}

                <div className="flex h-[75px] shrink-0 items-center justify-between border-b border-gray-100 px-5">

                    <Link
                        href="/"
                        onClick={closeMobileMenu}
                    >
                        <img
                            src="/asset/ARP_Logo.jpg"
                            alt="ARP Footwear"
                            className="h-[55px] w-[115px] object-contain"
                        />
                    </Link>

                    <button
                        type="button"
                        onClick={closeMobileMenu}
                        aria-label="Close navigation"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* SIDEBAR SEARCH */}

                <form
                    onSubmit={handleSearch}
                    className="shrink-0 px-4 py-5"
                >

                    <div className="flex items-center gap-3 rounded-md bg-[#f5f5f5] px-4">

                        <input
                            type="search"
                            placeholder="Search products..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="h-[48px] w-full border-none bg-transparent text-sm outline-none focus:ring-0"
                        />

                        <button type="submit" aria-label="Search">
                            <Search
                                size={20}
                                className="shrink-0 text-gray-500"
                            />
                        </button>

                    </div>

                </form>

                {/* =================================================
                    MOBILE NAVIGATION WITH SKELETON
                ================================================== */}

                <Deferred
                    data="headerCategories"
                    fallback={<MobileNavigationSkeleton />}
                >

                    <nav className="flex-1 overflow-y-auto px-4">

                        {mobileNavigation.map((item) => (
                            <div
                                key={item.id}
                                className="border-b border-gray-200"
                            >

                                <div className="flex items-center justify-between">

                                    <Link
                                        href={item.href}
                                        onClick={closeMobileMenu}
                                        className={`flex-1 py-[15px] text-[13px] font-semibold tracking-[0.4px] ${
                                            item.highlight
                                                ? 'text-[#bd8b32]'
                                                : 'text-gray-900'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>

                                    {item.children?.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => toggleAccordion(item.name)}
                                            className="flex h-11 w-11 items-center justify-center"
                                            aria-label={`Expand ${item.name}`}
                                            aria-expanded={expanded === item.name}
                                        >
                                            <ChevronDown
                                                size={19}
                                                className={`transition-transform duration-300 ${
                                                    expanded === item.name
                                                        ? 'rotate-180 text-[#bd8b32]'
                                                        : ''
                                                }`}
                                            />
                                        </button>
                                    )}

                                </div>

                                {/* MOBILE ACCORDION */}

                                {item.children?.length > 0 && (
                                    <div
                                        className={`grid transition-all duration-300 ${
                                            expanded === item.name
                                                ? 'grid-rows-[1fr] opacity-100'
                                                : 'grid-rows-[0fr] opacity-0'
                                        }`}
                                    >

                                        <div className="overflow-hidden">

                                            <div className="mb-3 ml-3 border-l-2 border-[#bd8b32] pl-4">

                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.id}
                                                        href={child.href}
                                                        onClick={closeMobileMenu}
                                                        className="block py-2.5 text-[13px] text-gray-600 transition hover:text-[#bd8b32]"
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}

                                            </div>

                                        </div>

                                    </div>
                                )}

                            </div>
                        ))}

                        {/* CONTACT DETAILS */}

                        <div className="mt-2">

                            <a
                                href="mailto:support@arpfootwear.com"
                                className="flex items-center gap-3 border-b border-gray-200 py-4 text-[13px] font-medium"
                            >
                                <Mail size={19} />
                                support@arpfootwear.com
                            </a>

                            <a
                                href="tel:+917078344153"
                                className="flex items-center gap-3 border-b border-gray-200 py-4 text-[13px] font-medium"
                            >
                                <Phone size={19} />
                                +91-7078344153
                            </a>

                        </div>

                        {/* SOCIAL LINKS */}

                        <div className="flex items-center gap-4 py-6">

                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 transition hover:border-[#bd8b32] hover:text-[#bd8b32]"
                            >
                                <Instagram size={17} />
                            </a>

                            <span className="text-[11px] tracking-wider text-gray-400">
                                FOLLOW US FOR NEW COLLECTIONS
                            </span>

                        </div>

                    </nav>

                </Deferred>

                {/* SIDEBAR BOTTOM */}

                <div className="shrink-0 border-t border-gray-100 bg-[#fafafa] p-4">

                    <Link
                        href="/contact"
                        onClick={closeMobileMenu}
                        className="flex items-center justify-center gap-2 bg-black py-3.5 text-[11px] font-semibold tracking-[1.5px] text-white transition hover:bg-[#bd8b32]"
                    >
                        CONTACT US

                        <ArrowRight size={15} />
                    </Link>

                </div>

            </aside>

        </header>
    );
}
