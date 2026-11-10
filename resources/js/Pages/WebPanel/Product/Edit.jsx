import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import { Deferred, Head, Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import ProductForm from './Partials/ProductForm'
import ProductFormSkeleton from './Partials/ProductFormSkeleton'

function Edit({ form }) {
    const product = form?.product
    const variants = form?.variants ?? []

    return (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
            <Head title="Edit Product" />

            {/* PAGE HEADER */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Update the selected product's details.
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

            {/* key forces a fresh form state if you navigate between products */}
            <Deferred data="form" fallback={<ProductFormSkeleton />}>
                <ProductForm key={product?.id} variants={variants} product={product} />
            </Deferred>
        </div>
    )
}

export default Edit

Edit.layout = (page) => <DashboardLayout title="Edit Product">{page}</DashboardLayout>
