import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import { Deferred, Head, Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import ProductForm from './Partials/ProductForm'
import ProductFormSkeleton from './Partials/ProductFormSkeleton'

function Create({ variants = [] }) {
    return (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
            <Head title="Create Product" />

            {/* PAGE HEADER */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Create Product</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Add a new product to the inventory.
                    </p>
                </div>
                <Link
                    href={route('admin.stock.product.index')}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    <ArrowLeft size={16} />
                    Back to List
                </Link>
            </div>

            <Deferred data="variants" fallback={<ProductFormSkeleton />}>
                <ProductForm variants={variants} />
            </Deferred>
        </div>
    )
}

export default Create

Create.layout = (page) => <DashboardLayout title="Create Product">{page}</DashboardLayout>
