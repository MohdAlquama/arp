
import React from "react";
import { Link } from "@inertiajs/react";
import { Heart, ShoppingBag, ArrowRight, Star } from "lucide-react";

const products = [
    {
        id: 1,
        name: "Premium Casual Sneakers",
        category: "MEN'S FOOTWEAR",
        price: 1499,
        oldPrice: 2499,
        discount: "40% OFF",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
        badge: "BESTSELLER",
    },
    {
        id: 2,
        name: "Classic White Sneakers",
        category: "WOMEN'S FOOTWEAR",
        price: 1799,
        oldPrice: 2999,
        discount: "40% OFF",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700",
        badge: "NEW",
    },
    {
        id: 3,
        name: "Urban Running Shoes",
        category: "SPORTS COLLECTION",
        price: 1299,
        oldPrice: 1999,
        discount: "35% OFF",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=700",
        badge: "TRENDING",
    },
    {
        id: 4,
        name: "Premium Leather Shoes",
        category: "FORMAL COLLECTION",
        price: 2199,
        oldPrice: 3499,
        discount: "37% OFF",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=700",
        badge: "POPULAR",
    },
];

export default function NewArrivals() {
    const handleAddToCart = (product) => {
        console.log("Add to cart:", product);
    };

    const handleWishlist = (product) => {
        console.log("Wishlist:", product);
    };

    return (
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700">
                            Discover Our Collection
                        </span>

                        <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-gray-950 sm:text-4xl">
                            New <span className="text-amber-700">Arrivals</span>
                        </h2>

                        <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
                            Explore our latest footwear collection, designed
                            for comfort, confidence and everyday style.
                        </p>
                    </div>

                    <Link
                        href="/products"
                        className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900 transition hover:text-amber-700"
                    >
                        View All Products
                        <ArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">

                    {products.map((product) => (
                        <div key={product.id} className="group">

                            {/* Product Image */}
                            <div className="relative overflow-hidden bg-[#f5f4f0]">

                                <Link href={`/products/${product.id}`}>
                                    <div className="aspect-[4/4.5] overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                </Link>

                                {/* Badge */}
                                <span className="absolute left-3 top-3 bg-black px-3 py-1.5 text-[10px] font-bold tracking-widest text-white">
                                    {product.badge}
                                </span>

                                {/* Discount */}
                                <span className="absolute bottom-3 left-3 bg-amber-700 px-3 py-1.5 text-[10px] font-bold text-white">
                                    {product.discount}
                                </span>

                                {/* Wishlist */}
                                <button
                                    type="button"
                                    onClick={() => handleWishlist(product)}
                                    aria-label="Add to wishlist"
                                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-sm transition hover:bg-black hover:text-white"
                                >
                                    <Heart size={18} />
                                </button>

                                {/* Add to Cart */}
                                <button
                                    type="button"
                                    onClick={() => handleAddToCart(product)}
                                    className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-center gap-2 bg-black py-4 text-xs font-bold uppercase tracking-widest text-white transition-transform duration-300 group-hover:translate-y-0"
                                >
                                    <ShoppingBag size={16} />
                                    Add to Cart
                                </button>
                            </div>

                            {/* Product Details */}
                            <div className="pt-4">
                                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400">
                                    {product.category}
                                </p>

                                <div className="mt-2 flex items-start justify-between gap-2">
                                    <Link
                                        href={`/products/${product.id}`}
                                        className="text-sm font-bold text-gray-900 transition hover:text-amber-700"
                                    >
                                        {product.name}
                                    </Link>

                                    <div className="flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-600">
                                        <Star size={13} fill="currentColor" />
                                        {product.rating}
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-base font-black text-gray-950">
                                        ₹{product.price.toLocaleString("en-IN")}
                                    </span>

                                    <span className="text-sm text-gray-400 line-through">
                                        ₹{product.oldPrice.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Bottom Button */}
                <div className="mt-14 text-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-3 border border-black px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-white"
                    >
                        Explore All Collection
                        <ArrowRight size={16} />
                    </Link>
                </div>

            </div>
        </section>
    );
}
