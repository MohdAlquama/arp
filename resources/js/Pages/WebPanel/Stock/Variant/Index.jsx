import React from 'react'
import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import { ListChecks, Plus } from 'lucide-react'
import { Head, Link, Deferred } from '@inertiajs/react'
import VariantFilters from './Partials/VariantFilters'
import VariantTable from './Partials/VariantTable'
import VariantTableSkeleton from './Partials/VariantTableSkeleton'

export default function Index({ filters = {}, filterOptions = {}, variants }) {
    return (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
            <Head title="Variant Management" />

            {/* Page Header */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">Variant Management</h1>
                    <p className="text-sm text-gray-500">
                        Manage product variants based on size, colour and material.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Link
                        href={route('admin.stock.variant.bulk-edit')}
                        className="flex items-center gap-2 rounded-lg border border-violet-200 bg-white px-4 py-2.5 text-sm font-medium text-violet-700 shadow-sm transition hover:bg-violet-50"
                    >
                        <ListChecks size={18} />
                        <span>Bulk Update</span>
                    </Link>
                    <Link
                        href={route('admin.stock.variant.create')}
                        className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.98]"
                    >
                        <Plus size={18} />
                        <span>Create Variant</span>
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <VariantFilters filters={filters} {...filterOptions} />

            {/* Table (deferred) */}
            <Deferred data="variants" fallback={<VariantTableSkeleton />}>
                <VariantTable variants={variants} filters={filters} />
            </Deferred>
        </div>
    )
}

Index.layout = (page) => <DashboardLayout title="Variant Management">{page}</DashboardLayout>
