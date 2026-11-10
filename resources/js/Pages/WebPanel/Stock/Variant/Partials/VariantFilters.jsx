import React, { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const emptyFilters = {
    search: '',
    category_id: '',
    sub_category_id: '',
    material_id: '',
    color_id: '',
    size_id: '',
    status: '',
};

export default function VariantFilters({ filters = {}, categories = [], subCategories = [], materials = [], colors = [], sizes = [] }) {
    const [values, setValues] = useState({ ...emptyFilters, ...filters });
    const [advancedOpen, setAdvancedOpen] = useState(
        Object.entries(filters).some(([key, value]) => key !== 'search' && Boolean(value))
    );
    const isFirstRender = useRef(true);

    useEffect(() => {
        const nextValues = { ...emptyFilters, ...filters };
        ['category_id', 'sub_category_id', 'material_id', 'color_id', 'size_id'].forEach((key) => {
            nextValues[key] = nextValues[key] ? String(nextValues[key]) : '';
        });
        setValues((current) => Object.keys(emptyFilters).every((key) => current[key] === nextValues[key])
            ? current
            : nextValues
        );
    }, [filters.search, filters.category_id, filters.sub_category_id, filters.material_id, filters.color_id, filters.size_id, filters.status]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timer = setTimeout(() => {
            const query = Object.fromEntries(
                Object.entries(values).filter(([, value]) => value !== '' && value !== null && value !== undefined)
            );

            router.get(route('admin.stock.variant.index'), query, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ['variants', 'filters'],
            });
        }, 350);

        return () => clearTimeout(timer);
    }, [values]);

    const update = (key, value) => setValues((current) => ({
        ...current,
        [key]: value,
        ...(key === 'category_id' ? { sub_category_id: '' } : {}),
    }));

    const clearFilters = () => setValues(emptyFilters);
    const subCategoryOptions = subCategories.filter((item) => String(item.category_id) === String(values.category_id));
    const hasFilters = Object.values(values).some(Boolean);
    const selectClass = 'w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20';

    return (
        <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
                <div className="relative min-w-[240px] flex-1">
                    <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="search"
                        value={values.search}
                        onChange={(event) => update('search', event.target.value)}
                        placeholder="Search article number or name..."
                        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
                    />
                    {values.search && (
                        <button type="button" onClick={() => update('search', '')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label="Clear search">
                            <X size={16} />
                        </button>
                    )}
                </div>
                <button type="button" onClick={() => setAdvancedOpen((open) => !open)} className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-sm font-medium ${advancedOpen ? 'border-violet-200 bg-violet-50 text-violet-700' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}>
                    <SlidersHorizontal size={16} />
                    Advanced filters
                </button>
                {hasFilters && (
                    <button type="button" onClick={clearFilters} className="px-2 py-2 text-sm font-medium text-gray-500 hover:text-red-600">Clear all</button>
                )}
            </div>

            {advancedOpen && (
                <div className="mt-4 grid grid-cols-1 gap-3 border-t border-gray-100 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <select value={values.category_id} onChange={(event) => update('category_id', event.target.value)} className={selectClass} aria-label="Filter by category">
                        <option value="">All categories</option>
                        {categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                    <select value={values.sub_category_id} onChange={(event) => update('sub_category_id', event.target.value)} className={selectClass} disabled={!values.category_id} aria-label="Filter by subcategory">
                        <option value="">All subcategories</option>
                        {subCategoryOptions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                    <select value={values.material_id} onChange={(event) => update('material_id', event.target.value)} className={selectClass} aria-label="Filter by material">
                        <option value="">All materials</option>
                        {materials.map((item) => <option key={item.id} value={item.id}>{item.material_name}</option>)}
                    </select>
                    <select value={values.color_id} onChange={(event) => update('color_id', event.target.value)} className={selectClass} aria-label="Filter by color">
                        <option value="">All colors</option>
                        {colors.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                    <select value={values.size_id} onChange={(event) => update('size_id', event.target.value)} className={selectClass} aria-label="Filter by size">
                        <option value="">All sizes</option>
                        {sizes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                    <select value={values.status} onChange={(event) => update('status', event.target.value)} className={selectClass} aria-label="Filter by status">
                        <option value="">All statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            )}
        </div>
    );
}
