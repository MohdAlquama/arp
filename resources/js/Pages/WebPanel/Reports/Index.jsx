import React from "react";
import { Deferred, Head, router } from "@inertiajs/react";
import { Download, FileSpreadsheet, Printer } from "lucide-react";
import DashboardLayout from "@/Layouts/AdministrationPanelLayout/DashboardLayout";
import ReportSkeleton from "./ReportSkeleton";

function ReportTable({ report }) {
    const columns = report?.columns ?? [];
    const rows = report?.rows ?? [];

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div>
                    <h2 className="font-semibold text-slate-900">Report results</h2>
                    <p className="mt-1 text-sm text-slate-500">{rows.length.toLocaleString()} records</p>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                    <FileSpreadsheet size={17} className="text-emerald-600" />
                    <span className="text-xs text-slate-500">Spreadsheet ready</span>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50">
                        <tr>
                            {columns.map((column) => (
                                <th key={column} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rows.length === 0 ? (
                            <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-slate-500">No records found for this report type.</td></tr>
                        ) : rows.map((row) => (
                            <tr key={`${row.type}-${row.id}`} className="hover:bg-slate-50">
                                {Object.values(row).map((value, index) => (
                                    <td key={index} className="max-w-sm px-4 py-3 align-top text-slate-700">
                                        {String(value ?? "—")}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Index({ types = {}, selectedType = "all", report }) {
    const selectType = (type) => {
        router.get(route("admin.reports.index"), { type }, {
            only: ["selectedType", "report"],
            preserveScroll: true,
            preserveState: false,
        });
    };

    const exportUrl = route("admin.reports.export", { type: selectedType });

    return (
        <div className="min-h-screen space-y-6 bg-slate-50 p-4 lg:p-6">
            <Head title="Reports" />
            <style>{`
                @media print {
                    body * { visibility: hidden !important; }
                    .report-print-area, .report-print-area * { visibility: visible !important; }
                    .report-print-area { position: absolute; inset: 0; width: 100%; padding: 0 !important; }
                    .report-no-print { display: none !important; }
                    .report-table-wrap { overflow: visible !important; border: 0 !important; box-shadow: none !important; }
                    .report-table-wrap table { font-size: 9px; }
                    .report-table-wrap th, .report-table-wrap td { padding: 5px !important; }
                }
            `}</style>

            <div className="report-no-print flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="text-sm font-medium text-violet-700">Business overview</p>
                    <h1 className="mt-1 text-2xl font-bold text-slate-900">Reports</h1>
                    <p className="mt-1 text-sm text-slate-500">View every record or narrow the report to one data type.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <a href={exportUrl} className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">
                        <Download size={16} /> Export spreadsheet
                    </a>
                    <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-800">
                        <Printer size={16} /> Download PDF
                    </button>
                </div>
            </div>

            <section className="report-no-print rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <label htmlFor="report-type" className="mb-2 block text-sm font-semibold text-slate-700">Report type</label>
                <select id="report-type" value={selectedType} onChange={(event) => selectType(event.target.value)} className="w-full max-w-sm rounded-lg border-slate-300 text-sm focus:border-violet-600 focus:ring-violet-600">
                    {Object.entries(types).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
                <p className="mt-2 text-xs text-slate-500">Spreadsheet downloads as a CSV file, which opens in Excel. PDF opens your browser’s print dialog; choose “Save as PDF.”</p>
            </section>

            <div className="report-print-area report-table-wrap">
                <Deferred data="report" fallback={<ReportSkeleton />}>
                    <ReportTable report={report} />
                </Deferred>
            </div>
        </div>
    );
}

Index.layout = (page) => <DashboardLayout title="Reports">{page}</DashboardLayout>;

export default Index;
