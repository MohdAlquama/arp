import React from "react";

export default function ReportSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm" aria-label="Loading report">
            <div className="animate-pulse space-y-4 p-5">
                <div className="h-5 w-40 rounded bg-slate-200" />
                <div className="space-y-3">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <div key={index} className="grid grid-cols-6 gap-4">
                            {Array.from({ length: 6 }).map((__, cell) => (
                                <div key={cell} className="h-8 rounded bg-slate-100" />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
