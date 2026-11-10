import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const formatPrice = (value) =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value);

/**
 * Reusable product card (also usable for Best Sellers, Featured, etc.)
 *
 * product = { id, name, category, image, hoverImage, price, oldPrice, discount, badge, href }
 */
export default function ProductCard({ product }) {
    const { name, category, image, hoverImage, price, oldPrice, discount, badge, href } = product;

    return (
        <a href={href} className="group block">

            {/* IMAGE */}

            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">

                {image && (
                    <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                            hoverImage
                                ? 'group-hover:opacity-0'
                                : 'group-hover:scale-105'
                        }`}
                    />
                )}

                {hoverImage && (
                    <img
                        src={hoverImage}
                        alt={`${name} alternate view`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
                    />
                )}

                {/* BADGE + DISCOUNT */}

                <div className="absolute left-3 top-3 flex flex-col items-start gap-2">
                    {badge && (
                        <span className="bg-black px-2.5 py-1 text-[9px] font-bold tracking-[2px] text-white">
                            {badge}
                        </span>
                    )}
                    {discount && (
                        <span className="bg-[#bd934c] px-2.5 py-1 text-[9px] font-bold tracking-[1.5px] text-black">
                            {discount}% OFF
                        </span>
                    )}
                </div>

                {/* HOVER ARROW */}

                <span className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={18} />
                </span>

            </div>

            {/* DETAILS */}

            <div className="pt-4">

                {category && (
                    <p className="mb-1.5 text-[9px] font-semibold tracking-[3px] text-[#bd934c]">
                        {category}
                    </p>
                )}

                <h3 className="line-clamp-1 text-base font-semibold text-gray-900 transition-colors group-hover:text-[#bd934c]">
                    {name}
                </h3>

                <div className="mt-2 flex items-center gap-3">
                    <span className="text-base font-semibold text-gray-900">
                        {formatPrice(price)}
                    </span>

                    {oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            {formatPrice(oldPrice)}
                        </span>
                    )}
                </div>

            </div>

        </a>
    );
}
