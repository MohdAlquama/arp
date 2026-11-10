import { Head } from '@inertiajs/react'
import React from 'react'

export default function SEO() {
  return (
    
<Head>
    <title>ARP Footwear | Premium Shoes Collection for Men & Women</title>

    {/* Basic SEO */}
    <meta
        name="description"
        content="Explore ARP Footwear's premium collection of men's and women's footwear. Discover stylish formal shoes, casual shoes, sandals, loafers and more at great prices."
    />

    <meta
        name="keywords"
        content="ARP Footwear, footwear, shoes, men's shoes, women's shoes, formal shoes, casual shoes, sandals, loafers, online footwear shopping"
    />

    <meta name="author" content="ARP Footwear" />
    <meta name="robots" content="index, follow" />

    {/* Viewport */}
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    {/* Theme */}
    <meta name="theme-color" content="#ffffff" />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content="ARP Footwear | Premium Footwear Collection" />
    <meta
        property="og:description"
        content="Discover stylish and comfortable footwear for men and women with ARP Footwear."
    />
    <meta property="og:url" content="https://arpfootwear.com/" />
    <meta property="og:site_name" content="ARP Footwear" />
    <meta property="og:image" content="https://arpfootwear.com/asset/ARP_Logo.jpg" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="ARP Footwear | Premium Footwear" />
    <meta
        name="twitter:description"
        content="Shop premium footwear for men and women at ARP Footwear."
    />
    <meta name="twitter:image" content="https://arpfootwear.com/asset/ARP_Logo.jpg" />

    {/* Canonical */}
    <link rel="canonical" href="https://arpfootwear.com/" />

    {/* Favicon */}
    <link rel="icon" type="image/jpeg" href="/asset/ARP_Logo.jpg" />
</Head>

  )
}
