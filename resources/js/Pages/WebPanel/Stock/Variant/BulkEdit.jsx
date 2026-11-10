import React, { useMemo, useState } from 'react';
import { Deferred, Head, Link, useForm } from '@inertiajs/react';
import { Box, Layers, Search, Tag, X } from 'lucide-react';
import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout';
import SearchableSelect from './Partials/Searchableselect';
import { FormSection, SizeCheckboxes } from './Partials/VariantForm';
import BulkEditSkeleton from './BulkEditSkeleton';

const FieldError = ({ message }) => message ? <p className="mt-1 text-sm text-red-600">{message}</p> : null;

function BulkEditForm({ variants, categories, subCategories, colors, sizes, materials }) {
    const { data, setData, put, transform, processing, errors } = useForm({
        variant_ids: [],
        update_category: false,
        category_id: '',
        sub_category_id: '',
        update_material: false,
        material_id: '',
        update_variations: false,
        attributes: [{ color_id: '', size_ids: [] }],
    });
    const [search, setSearch] = useState('');

    const filteredVariants = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();
        if (!normalizedSearch) return variants;

        return variants.filter((variant) =>
            `${variant.article_no} ${variant.default_name}`.toLowerCase().includes(normalizedSearch)
        );
    }, [variants, search]);

    const selectedVariants = variants.filter((variant) =>
        data.variant_ids.some((id) => String(id) === String(variant.id))
    );
    const subCategoryOptions = subCategories
        .filter((item) => String(item.category_id) === String(data.category_id))
        .map((item) => ({ value: item.id, label: item.name }));

    const toggleVariant = (id, checked) => {
        if (checked && data.variant_ids.length >= 100) return;

        setData('variant_ids', checked
            ? [...data.variant_ids, id]
            : data.variant_ids.filter((selectedId) => String(selectedId) !== String(id))
        );
    };

    const selectVisibleVariants = (checked) => {
        const visibleIds = filteredVariants.map((variant) => variant.id);
        setData('variant_ids', checked
            ? Array.from(new Set([...data.variant_ids, ...visibleIds])).slice(0, 100)
            : data.variant_ids.filter((id) => !visibleIds.some((visibleId) => String(visibleId) === String(id)))
        );
    };

    const addColorGroup = () => setData('attributes', [...data.attributes, { color_id: '', size_ids: [] }]);
    const removeColorGroup = (index) => setData('attributes', data.attributes.length === 1
        ? [{ color_id: '', size_ids: [] }]
        : data.attributes.filter((_, groupIndex) => groupIndex !== index)
    );
    const changeColor = (index, colorId) => setData('attributes', data.attributes.map((group, groupIndex) =>
        groupIndex === index ? { color_id: colorId ?? '', size_ids: [] } : group
    ));
    const changeSizes = (index, sizeIds) => setData('attributes', data.attributes.map((group, groupIndex) =>
        groupIndex === index ? { ...group, size_ids: sizeIds } : group
    ));

    const handleSubmit = (event) => {
        event.preventDefault();
        transform((payload) => {
            if (!payload.update_variations) {
                const { attributes, ...remaining } = payload;
                return remaining;
            }

            return payload;
        });
        put(route('admin.stock.variant.bulk-update'), { preserveScroll: true });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <p className="text-sm font-medium text-violet-600">Variant Management</p>
                <h1 className="mt-1 text-2xl font-bold text-gray-900">Bulk Update Articles</h1>
                <p className="mt-1 text-sm text-gray-500">Select multiple articles, then choose which fields to update on them.</p>
            </div>

            <FormSection step="Step 1: Articles" icon={Box} title="Select Articles" description="Search by article number or name, then select one or more articles. A maximum of 100 can be updated at once.">
                <div className="relative">
                    <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search articles..." className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20" />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>{filteredVariants.length} matching articles</span>
                    <label className="flex cursor-pointer items-center gap-2 font-medium text-violet-700">
                        <input type="checkbox" checked={filteredVariants.length > 0 && filteredVariants.every((variant) => data.variant_ids.some((id) => String(id) === String(variant.id)))} onChange={(event) => selectVisibleVariants(event.target.checked)} className="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                        Select visible
                    </label>
                </div>

                <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-gray-200 divide-y divide-gray-100">
                    {filteredVariants.map((variant) => {
                        const checked = data.variant_ids.some((id) => String(id) === String(variant.id));

                        return (
                            <label key={variant.id} className={`flex cursor-pointer items-center gap-3 px-3 py-2.5 hover:bg-violet-50 ${checked ? 'bg-violet-50/60' : 'bg-white'}`}>
                                <input type="checkbox" checked={checked} disabled={!checked && data.variant_ids.length >= 100} onChange={(event) => toggleVariant(variant.id, event.target.checked)} className="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-sm font-medium text-gray-800">{variant.article_no}</span>
                                    <span className="block truncate text-xs text-gray-500">{variant.default_name}</span>
                                </span>
                            </label>
                        );
                    })}
                    {filteredVariants.length === 0 && <p className="px-3 py-8 text-center text-sm text-gray-500">No matching articles.</p>}
                </div>

                <FieldError message={errors.variant_ids} />
                {selectedVariants.length > 0 && (
                    <div className="mt-4">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Selected: {selectedVariants.length}</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedVariants.map((variant) => (
                                <span key={variant.id} className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                                    {variant.article_no}
                                    <button type="button" onClick={() => toggleVariant(variant.id, false)} aria-label={`Remove ${variant.article_no}`} className="text-violet-500 hover:text-violet-900"><X size={14} /></button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </FormSection>

            <FormSection step="Step 2: Classification" icon={Layers} title="Category & Subcategory" description="Enable this group to replace the category and subcategory on all selected articles.">
                <label className="mb-4 flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-800">
                    <input type="checkbox" checked={data.update_category} onChange={(event) => setData('update_category', event.target.checked)} className="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                    Update category and subcategory
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
                        <SearchableSelect value={data.category_id} onChange={(value) => setData((current) => ({ ...current, category_id: value ?? '', sub_category_id: '' }))} options={categories.map((item) => ({ value: item.id, label: item.name }))} placeholder="Select category" disabled={!data.update_category} required={data.update_category} />
                        <FieldError message={errors.category_id} />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Subcategory</label>
                        <SearchableSelect value={data.sub_category_id} onChange={(value) => setData('sub_category_id', value ?? '')} options={subCategoryOptions} placeholder="Select subcategory" disabled={!data.update_category || !data.category_id} required={data.update_category} />
                        <FieldError message={errors.sub_category_id} />
                    </div>
                </div>
            </FormSection>

            <FormSection step="Step 3: Material" icon={Layers} title="Material" description="Enable this group to assign one material to all selected articles.">
                <label className="mb-4 flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-800">
                    <input type="checkbox" checked={data.update_material} onChange={(event) => setData('update_material', event.target.checked)} className="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                    Update material
                </label>
                <SearchableSelect value={data.material_id} onChange={(value) => setData('material_id', value ?? '')} options={materials.map((item) => ({ value: item.id, label: item.material_name }))} placeholder="Select material" disabled={!data.update_material} required={data.update_material} />
                <FieldError message={errors.material_id} />
            </FormSection>

            <FormSection step="Step 4: Variations" icon={Tag} title="Colors & Sizes" description="Enable this group to replace variations on all selected articles with these color and size combinations.">
                <label className="mb-4 flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-800">
                    <input type="checkbox" checked={data.update_variations} onChange={(event) => setData('update_variations', event.target.checked)} className="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                    Update variations
                </label>
                <div className={`space-y-4 ${!data.update_variations ? 'pointer-events-none opacity-50' : ''}`}>
                    {data.attributes.map((group, index) => (
                        <div key={group.color_id || index} className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                            <div className="flex items-end gap-3">
                                <div className="flex-1">
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Color</label>
                                    <SearchableSelect
                                        value={group.color_id}
                                        onChange={(value) => changeColor(index, value)}
                                        options={colors.filter((color) => !data.attributes.some((selected, selectedIndex) => selectedIndex !== index && String(selected.color_id) === String(color.id))).map((color) => ({ value: color.id, label: color.name }))}
                                        placeholder="Select color"
                                        disabled={!data.update_variations}
                                        required={data.update_variations}
                                    />
                                    <FieldError message={errors[`attributes.${index}.color_id`]} />
                                </div>
                                <button type="button" onClick={() => removeColorGroup(index)} disabled={!data.update_variations} className="rounded-lg border border-red-200 bg-white p-2.5 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed" title="Remove color group"><X size={18} /></button>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Sizes</label>
                                <SizeCheckboxes sizes={sizes} selectedIds={group.size_ids} onChange={(sizeIds) => changeSizes(index, sizeIds)} />
                                <FieldError message={errors[`attributes.${index}.size_ids`]} />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addColorGroup} disabled={!data.update_variations} className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700 hover:bg-violet-100 disabled:cursor-not-allowed">Add color group</button>
                </div>
                <FieldError message={errors.updates} />
            </FormSection>

            <FieldError message={errors.error} />
            <div className="flex items-center justify-end gap-3">
                <Link href={route('admin.stock.variant.index')} className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancel</Link>
                <button type="submit" disabled={processing} className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 disabled:opacity-60">
                    {processing ? 'Updating...' : `Update ${selectedVariants.length || ''} Articles`}
                </button>
            </div>
        </form>
    );
}

function BulkEdit({ variants = [], categories = [], subCategories = [], colors = [], sizes = [], materials = [] }) {
    return (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
            <Head title="Bulk Update Variants" />
            <div className="mb-5">
                <Link href={route('admin.stock.variant.index')} className="text-sm font-medium text-violet-700 hover:text-violet-900">← Back to variants</Link>
            </div>
            <Deferred data={['variants', 'categories', 'subCategories', 'colors', 'sizes', 'materials']} fallback={<BulkEditSkeleton />}>
                <BulkEditForm variants={variants} categories={categories} subCategories={subCategories} colors={colors} sizes={sizes} materials={materials} />
            </Deferred>
        </div>
    );
}

BulkEdit.layout = (page) => <DashboardLayout title="Bulk Update Variants">{page}</DashboardLayout>;

export default BulkEdit;
