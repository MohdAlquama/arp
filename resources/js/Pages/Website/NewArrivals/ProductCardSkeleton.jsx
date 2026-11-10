import React from 'react';

/** Placeholder with the same shape as <ProductCard /> while data loads. */
export default function ProductCardSkeleton() {
    return (
        <div className="animate-pulse" aria-hidden="true">
            <div className="aspect-[4/5] bg-gray-200" />
            <div className="pt-4">
                <div className="mb-2 h-2.5 w-24 rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="mt-3 h-4 w-28 rounded bg-gray-100" />
            </div>
        </div>
    );
}
