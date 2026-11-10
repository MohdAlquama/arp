import React, { useEffect, useRef, useState } from 'react'
import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import { Plus, Search, Pencil, Trash2, Package } from 'lucide-react'
import { Deferred, Head, Link, router, usePage } from '@inertiajs/react'
import ProductIndexSkeleton from './Partials/ProductIndexSkeleton'

function Switch({ checked, onChange, label }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={onChange}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                checked ? 'bg-violet-600' : 'bg-gray-300'
            }`}
        >
            <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    checked ? 'left-6' : 'left-1'
                }`}
            />
        </button>
    )
}

export default function Index({ products, filters = {} }) {
    const { flash } = usePage().props

    const [search, setSearch] = useState(filters.search ?? '')
    const [promotional, setPromotional] = useState(filters.promotional ?? '')
    const [published, setPublished] = useState(filters.published ?? '')

    // Debounced filtering (skip the very first render)
    const firstRender = useRef(true)

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }

        const timer = setTimeout(() => {
            router.get(
                route('admin.stock.product.index'),
                { search, promotional, published },
                { preserveState: true, preserveScroll: true, replace: true }
            )
        }, 300)

        return () => clearTimeout(timer)
    }, [search, promotional, published])

    const toggle = (product, field) => {
        router.patch(
            route('admin.stock.product.toggle', product.id),
            { field },
            { preserveScroll: true, preserveState: true }
        )
    }

    const destroy = (product) => {
        if (!confirm(`Delete "${product.display_name || product.default_name}"? This cannot be undone.`)) return

        router.delete(route('admin.stock.product.destroy', product.id), {
            preserveScroll: true,
        })
    }

    const rows = products?.data ?? []

    return (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
            <Head title="Product Management" />

            {/* Page Header */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">Product Management</h1>
                    <p className="text-sm text-gray-500">
                        Manage your products and their variants.
                    </p>
                </div>
                <Link
                    href={route('admin.stock.product.create')}
                    className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.98]"
                >
                    <Plus size={18} />
                    <span>Create Product</span>
                </Link>
            </div>

            {flash?.success && (
                <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {flash.success}
                </div>
            )}

            {/* Filters */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
                <div className="relative w-full sm:w-72">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search article or name..."
                        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
                    />
                </div>

                <select
                    value={promotional}
                    onChange={(e) => setPromotional(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-violet-600 focus:outline-none"
                >
                    <option value="">All products</option>
                    <option value="1">Promotional</option>
                    <option value="0">Normal</option>
                </select>

                <select
                    value={published}
                    onChange={(e) => setPublished(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-violet-600 focus:outline-none"
                >
                    <option value="">Any visibility</option>
                    <option value="1">Published</option>
                    <option value="0">Unpublished</option>
                </select>
            </div>

            <Deferred data="products" fallback={<ProductIndexSkeleton />}>
            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full min-w-[800px] text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-600">
                        <tr>
                            <th className="px-4 py-3">Product</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">MRP</th>
                            <th className="px-4 py-3">Variations</th>
                            <th className="px-4 py-3">Promotional</th>
                            <th className="px-4 py-3">Published</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {rows.length > 0 ? (
                            rows.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            {product.image_url ? (
                                                <img
                                                    src={product.image_url}
                                                    alt=""
                                                    className="h-12 w-12 rounded-lg border object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-300">
                                                    <Package size={18} />
                                                </div>
                                            )}

                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    {product.display_name || product.default_name}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {product.article_no}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 text-gray-600">
                                        {product.category_name}
                                        <span className="block text-xs text-gray-400">
                                            {product.sub_category_name}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 text-gray-600">
                                        {product.mrp ? `₹${Number(product.mrp).toLocaleString('en-IN')}` : '—'}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                                            {product.variations_count}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        <Switch
                                            checked={product.is_promotional}
                                            label="Toggle promotional"
                                            onChange={() => toggle(product, 'is_promotional')}
                                        />
                                    </td>

                                    <td className="px-4 py-3">
                                        <Switch
                                            checked={product.is_published}
                                            label="Toggle published"
                                            onChange={() => toggle(product, 'is_published')}
                                        />
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={route('admin.stock.product.edit', product.id)}
                                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-violet-600"
                                                title="Edit"
                                            >
                                                <Pencil size={17} />
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() => destroy(product)}
                                                className="rounded-lg p-2 text-red-500 hover:bg-red-50 hover:text-red-700"
                                                title="Delete"
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-4 py-14 text-center">
                                    <Package size={35} className="mx-auto mb-3 text-gray-300" />
                                    <p className="text-sm font-medium text-gray-600">No products found</p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        Create your first product or adjust the filters.
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {products?.links?.length > 3 && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-1">
                    {products.links.map((link, i) =>
                        link.url ? (
                            <Link
                                key={i}
                                href={link.url}
                                preserveScroll
                                className={`rounded-lg px-3 py-1.5 text-sm ${
                                    link.active
                                        ? 'bg-violet-600 font-semibold text-white'
                                        : 'bg-white text-gray-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span
                                key={i}
                                className="rounded-lg px-3 py-1.5 text-sm text-gray-300"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        )
                    )}
                </div>
            )}
            </Deferred>
        </div>
    )
}

Index.layout = (page) => <DashboardLayout title="Product Management">{page}</DashboardLayout>
