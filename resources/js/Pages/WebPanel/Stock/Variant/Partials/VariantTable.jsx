import React, { useEffect, useMemo, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronDown, Download, FileDown, Pencil, Trash2 } from 'lucide-react';
import Pagination from './Pagination';

const COLUMNS = [
    { key: 'id', label: 'ID', render: (variant) => variant.id },
    { key: 'article_no', label: 'Article No', render: (variant) => <span className="font-medium text-gray-900">{variant.article_no}</span> },
    { key: 'default_name', label: 'Name', render: (variant) => variant.default_name },
    { key: 'category_name', label: 'Category', render: (variant) => variant.category_name ?? '—' },
    { key: 'sub_category_name', label: 'Sub Category', render: (variant) => variant.sub_category_name ?? '—' },
    { key: 'material_name', label: 'Material', render: (variant) => variant.material_name ?? '—' },
    {
        key: 'variations',
        label: 'Variations (Color / Size)',
        render: (variant) => (
            variant.attribute_pairs?.length ? (
                <div className="flex flex-wrap gap-1.5">
                    {variant.attribute_pairs.map((pair) => (
                        <span key={pair.index} className="inline-flex items-center rounded-md bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-200">
                            {pair.color_name ?? '—'} / {pair.size_name ?? '—'}
                        </span>
                    ))}
                </div>
            ) : <span className="text-gray-400">—</span>
        ),
    },
    {
        key: 'status',
        label: 'Status',
        render: (variant) => (
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variant.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {variant.status === 'active' ? 'Active' : 'Inactive'}
            </span>
        ),
    },
    { key: 'created_at', label: 'Created At', render: (variant) => variant.created_at ? new Date(variant.created_at).toLocaleDateString() : '—' },
];

const DEFAULT_COLUMNS = COLUMNS.map(({ key }) => key).filter((key) => key !== 'id' && key !== 'created_at');

export default function VariantTable({ variants, filters = {} }) {
    const rows = variants?.data ?? [];
    const { flash } = usePage().props;
    const [visibleColumns, setVisibleColumns] = useState(DEFAULT_COLUMNS);
    const [columnsOpen, setColumnsOpen] = useState(false);

    useEffect(() => {
        try {
            const savedColumns = JSON.parse(localStorage.getItem('variant-index-columns') || 'null');
            if (Array.isArray(savedColumns)) {
                setVisibleColumns(savedColumns.filter((key) => COLUMNS.some((column) => column.key === key)));
            }
        } catch {
            setVisibleColumns(DEFAULT_COLUMNS);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('variant-index-columns', JSON.stringify(visibleColumns));
    }, [visibleColumns]);

    const activeColumns = useMemo(() => COLUMNS.filter((column) => visibleColumns.includes(column.key)), [visibleColumns]);
    const query = Object.fromEntries(
        Object.entries({ ...filters, columns: visibleColumns })
            .filter(([, value]) => value !== '' && value !== null && value !== undefined)
    );
    const excelUrl = route('admin.stock.variant.export', query);
    const pdfUrl = route('admin.stock.variant.print', query);
    const hasSelectedColumns = visibleColumns.length > 0;

    const toggleColumn = (key) => setVisibleColumns((current) => current.includes(key)
        ? current.filter((column) => column !== key)
        : [...current, key]
    );

    const destroy = (variant) => {
        const confirmed = confirm(
            `Delete article "${variant.article_no}"? If it has a linked product, that product and its variation images will also be deleted.`
        );

        if (!confirmed) return;

        router.delete(route('admin.stock.variant.destroy', variant.id), { preserveScroll: true });
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <style>{`@media print {.variant-no-print{display:none!important}.variant-print-table{overflow:visible!important;border:0!important;box-shadow:none!important}.variant-print-table table{font-size:10px}}`}</style>
            {flash?.success && <div className="border-b border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{flash.success}</div>}

            <div className="variant-no-print flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-4">
                <p className="text-sm text-gray-500">{variants?.total ?? rows.length} articles</p>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                        <button type="button" onClick={() => setColumnsOpen((open) => !open)} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Columns <ChevronDown size={15} />
                        </button>
                        {columnsOpen && (
                            <div className="absolute right-0 z-20 mt-2 max-h-80 w-60 overflow-y-auto rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                                {COLUMNS.map((column) => (
                                    <label key={column.key} className="flex cursor-pointer items-center gap-2 rounded px-2 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        <input type="checkbox" checked={visibleColumns.includes(column.key)} onChange={() => toggleColumn(column.key)} className="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                                        {column.label}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                    <a href={hasSelectedColumns ? excelUrl : undefined} aria-disabled={!hasSelectedColumns} className={`inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 ${!hasSelectedColumns ? 'pointer-events-none opacity-50' : ''}`}>
                        <Download size={16} /> Excel
                    </a>
                    <a href={hasSelectedColumns ? pdfUrl : undefined} aria-disabled={!hasSelectedColumns} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700 hover:bg-violet-100 ${!hasSelectedColumns ? 'pointer-events-none opacity-50' : ''}`}>
                        <FileDown size={16} /> PDF
                    </a>
                    {visibleColumns.length === 0 && <span className="text-xs text-red-600">Select at least one column.</span>}
                </div>
            </div>

            <div className="variant-print-table overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            {activeColumns.map((column) => <th key={column.key} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">{column.label}</th>)}
                            <th className="variant-no-print whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {rows.length === 0 ? (
                            <tr><td colSpan={activeColumns.length + 1} className="px-4 py-12 text-center text-gray-500">No variants found.</td></tr>
                        ) : rows.map((variant) => (
                            <tr key={variant.id} className="hover:bg-gray-50">
                                {activeColumns.map((column) => <td key={column.key} className="px-4 py-3 text-gray-700">{column.render(variant)}</td>)}
                                <td className="variant-no-print px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Link href={route('admin.stock.variant.edit', variant.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 transition hover:bg-violet-100">
                                            <Pencil size={14} /> Edit
                                        </Link>
                                        <button type="button" onClick={() => destroy(variant)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100" aria-label={`Delete ${variant.article_no}`}>
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="variant-no-print"><Pagination meta={variants} /></div>
        </div>
    );
}
