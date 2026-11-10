import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';

export default function Print({ columns = [], rows = [] }) {
    useEffect(() => {
        const timer = setTimeout(() => window.print(), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="p-6 text-gray-900 print:p-0">
            <Head title="Variant Report" />
            <div className="mb-5 flex items-start justify-between gap-4 print:hidden">
                <div>
                    <h1 className="text-2xl font-bold">Variant Report</h1>
                    <p className="mt-1 text-sm text-gray-500">{rows.length.toLocaleString()} articles · {new Date().toLocaleDateString()}</p>
                </div>
                <button type="button" onClick={() => window.print()} className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white">Print / Save PDF</button>
            </div>
            <div className="hidden print:block print:mb-4">
                <h1 className="text-xl font-bold">Variant Report</h1>
                <p>{rows.length.toLocaleString()} articles · {new Date().toLocaleDateString()}</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-xs">
                    <thead>
                        <tr>{columns.map((column) => <th key={column} className="border border-gray-400 bg-gray-100 px-2 py-2 font-semibold">{column}</th>)}</tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => <td key={cellIndex} className="border border-gray-300 px-2 py-1.5 align-top">{String(cell ?? '')}</td>)}
                            </tr>
                        ))}
                        {rows.length === 0 && <tr><td colSpan={columns.length} className="border border-gray-300 px-3 py-8 text-center">No variants found for these filters.</td></tr>}
                    </tbody>
                </table>
            </div>
            <style>{`@page{size:landscape;margin:12mm}@media print{body{background:white}.overflow-x-auto{overflow:visible!important}table{width:100%;font-size:9px}thead{display:table-header-group}tr{break-inside:avoid}th{background:#eee!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}}`}</style>
        </main>
    );
}

Print.layout = (page) => page;
