import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import useNewArrivals from './useNewArrivals';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

const GRID = 'grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-14';

export default function NewArrivals({ limit = 8 }) {
    const { products, loading } = useNewArrivals(limit);

    return (
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-12 lg:py-24">

            <div className="mx-auto max-w-[1600px]">

                {/* SECTION HEADER */}

                <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end lg:mb-14">

                    <div>
                        <span className="text-[10px] font-semibold tracking-[4px] text-[#bd934c]">
                            JUST LANDED
                        </span>

                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                            New Arrivals
                        </h2>

                        <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
                            Fresh styles, straight from the workshop.
                            Be the first to step into our latest collection.
                        </p>
                    </div>

                    <a
                        href="/new-arrivals"
                        className="group flex w-fit items-center gap-3 border-b border-[#bd934c] pb-2 text-[11px] font-bold tracking-[1.5px] text-gray-900 transition hover:text-[#bd934c]"
                    >
                        VIEW ALL NEW ARRIVALS

                        <ArrowUpRight
                            size={17}
                            className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                    </a>

                </div>

                {/* PRODUCT GRID */}

                {loading ? (
                    <div className={GRID} aria-busy="true" aria-label="Loading new arrivals">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <div className={GRID}>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

            </div>

        </section>
    );
}
