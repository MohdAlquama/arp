import React from 'react';

export default function ProductFormSkeleton() {
    return (
        <div className="pointer-events-none animate-pulse space-y-8">
            {[0, 1, 2, 3].map((section) => (
                <div key={section} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="space-y-2 lg:col-span-4">
                        <div className="h-4 w-28 rounded bg-gray-200" />
                        <div className="h-6 w-48 rounded bg-gray-200" />
                        <div className="h-4 w-56 rounded bg-gray-100" />
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-8">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {Array.from({ length: section === 2 ? 4 : 2 }).map((_, field) => (
                                <div key={field} className="space-y-2">
                                    <div className="h-4 w-24 rounded bg-gray-200" />
                                    <div className="h-11 rounded-lg bg-gray-100" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
                <div className="h-10 w-24 rounded-lg bg-gray-200" />
                <div className="h-10 w-36 rounded-lg bg-gray-200" />
            </div>
        </div>
    );
}
