import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import { Head, Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import HomeCategoryForm from './Partials/HomeCategoryForm'

export default function Create() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <Head title="Create Category Tile" />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Category Tile</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add a new tile to the "Shop By Category" section.
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

      <HomeCategoryForm />
    </div>
  )
}

Create.layout = (page) => <DashboardLayout title="Shop By Category">{page}</DashboardLayout>
