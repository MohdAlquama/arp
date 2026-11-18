import { Head, usePage } from "@inertiajs/react";
import React from "react";

const SITE_URL = "https://arpfootwear.com";
const SITE_NAME = "ARP Footwear";
const DEFAULT_IMAGE = `${SITE_URL}/asset/ARP_Logo.jpg`;
const DEFAULT_DESCRIPTION =
    "Explore ARP Footwear's collection of men's and women's footwear. Discover formal shoes, casual shoes, sandals, loafers and more at great prices.";

/**
 * Usage:
 *   <SEO />                                            // home / defaults
 *   <SEO title="Contact Us" description="..." />       // inner page
 *   <SEO title="Cart" noindex />                       // page hidden from Google
 */
export default function SEO({
    title,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_IMAGE,
    noindex = false,
    type = "website",
}) {
    const { url } = usePage();

    // Canonical = current page without query string or trailing slash (except home)
    const path = url.split("?")[0].replace(/\/+$/, "");
    const canonical = `${SITE_URL}${path}`;

    const fullTitle = title
        ? `${title} | ${SITE_NAME}`
        : `${SITE_NAME} | Premium Shoes Collection for Men & Women`;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        legalName: "Azam Rubber Products Pvt. Ltd.",
        url: SITE_URL,
        logo: DEFAULT_IMAGE,
        telephone: "+91-70783-44153",
        email: "support@arpfootwear.com",
        address: {
            "@type": "PostalAddress",
            streetAddress: "GIDA",
            addressLocality: "Gorakhpur",
            addressRegion: "Uttar Pradesh",
            addressCountry: "IN",
        },
    };

    return (
        <Head>
            <title head-key="title">{fullTitle}</title>

            {/* Basic SEO. head-key stops duplicate tags when navigating between pages */}
            <meta head-key="description" name="description" content={description} />
            <meta head-key="author" name="author" content={SITE_NAME} />
            <meta
                head-key="robots"
                name="robots"
                content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
            />
            <link head-key="canonical" rel="canonical" href={canonical} />

            {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
            <meta head-key="og:type" property="og:type" content={type} />
            <meta head-key="og:title" property="og:title" content={fullTitle} />
            <meta head-key="og:description" property="og:description" content={description} />
            <meta head-key="og:url" property="og:url" content={canonical} />
            <meta head-key="og:site_name" property="og:site_name" content={SITE_NAME} />
            <meta head-key="og:image" property="og:image" content={image} />
            <meta head-key="og:locale" property="og:locale" content="en_IN" />

            {/* Twitter / X */}
            <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta head-key="twitter:title" name="twitter:title" content={fullTitle} />
            <meta head-key="twitter:description" name="twitter:description" content={description} />
            <meta head-key="twitter:image" name="twitter:image" content={image} />

            {/* Theme and favicon */}
            <meta head-key="theme-color" name="theme-color" content="#ffffff" />
            <link head-key="icon" rel="icon" type="image/jpeg" href="/asset/ARP_Logo.jpg" />

            {/* Structured data for Google */}
            <script head-key="ld-json" type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Head>
    );
}