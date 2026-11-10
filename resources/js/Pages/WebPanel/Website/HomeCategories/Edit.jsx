import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import { Head, Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import HomeCategoryForm from './Partials/HomeCategoryForm'

export default function Edit({ category }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <Head title="Edit Category Tile" />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Category Tile</h1>
          <p className="mt-1 text-sm text-gray-500">
            Update details for:{' '}
            <span className="font-semibold text-gray-700">{category.name}</span>
          </p>
        </div>
        <Link
          href={route('admin.website.categories.index')}
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
          Back to List
        </Link>
      </div>

      <HomeCategoryForm category={category} />
    </div>
  )
}

Edit.layout = (page) => <DashboardLayout title="Shop By Category">{page}</DashboardLayout>
