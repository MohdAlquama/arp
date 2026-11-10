import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import { Head, Link, Deferred } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import VariantForm from './Partials/VariantForm'
import VariantFormSkeleton from './Partials/VariantFormSkeleton'

function Edit({ variant, categories = [], subCategories = [], colors = [], sizes = [], materials = [] }) {
    return (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
            <Head title="Edit Variant" />

            {/* PAGE HEADER */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Variant</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Update the details of this variant.
                    </p>
                </div>
                <Link
                    href={route('admin.stock.variant.index')}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    <ArrowLeft size={16} />
                    Back to List
                </Link>
            </div>

            <Deferred
                data={['variant', 'categories', 'subCategories', 'colors', 'sizes', 'materials']}
                fallback={<VariantFormSkeleton />}
            >
                <VariantForm
                    variant={variant}
                    categories={categories}
                    subCategories={subCategories}
                    colors={colors}
                    sizes={sizes}
                    materials={materials}
                />
            </Deferred>
        </div>
    )
}

export default Edit

Edit.layout = (page) => <DashboardLayout title="Variant Management">{page}</DashboardLayout>