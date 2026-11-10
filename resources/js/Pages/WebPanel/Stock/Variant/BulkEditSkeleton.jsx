import React from 'react';

function SkeletonBlock({ className = '' }) {
    return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />;
}

export default function BulkEditSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <SkeletonBlock className="h-7 w-56" />
                <SkeletonBlock className="h-4 w-80" />
            </div>
            {[0, 1, 2, 3].map((section) => (
                <div key={section} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="space-y-2 lg:col-span-4">
                        <SkeletonBlock className="h-4 w-28" />
                        <SkeletonBlock className="h-6 w-44" />
                        <SkeletonBlock className="h-4 w-56" />
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-8">
                        {section === 0 ? (
                            <div className="space-y-3">
                                <SkeletonBlock className="h-10 w-full" />
                                {[0, 1, 2, 3].map((row) => <SkeletonBlock key={row} className="h-8 w-full" />)}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <SkeletonBlock className="h-11" />
                                <SkeletonBlock className="h-11" />
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <div className="flex justify-end gap-3">
                <SkeletonBlock className="h-10 w-24" />
                <SkeletonBlock className="h-10 w-36" />
            </div>
        </div>
    );
}
