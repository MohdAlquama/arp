import React from 'react'
import { Link, Deferred } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import CategoryForm from './Partials/CategoryForm'
import { CategoryFormSkeleton } from './Partials/CategoryFormSkeleton'

export default function Edit({ category }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      
      {/* Page Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Edit Category {category?.name ? `: ${category.name}` : ''}
          </h1>
          <p className="text-sm text-gray-500">
            Configure category settings below.
          </p>
        </div>
        <Link
          href={route('admin.website.category.index')}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <ArrowLeft size={14} />
          <span>Back to Categories</span>
        </Link>
      </div>

      {/* 
        Inertia v2 Deferred Component 
        जब तक `category` लोड हो रहा है, `react-loading-skeleton` वाला डिज़ाइन दिखेगा
      */}
      <Deferred data="category" fallback={<CategoryFormSkeleton />}>
        <CategoryForm isEdit={true} category={category} />
      </Deferred>

    </div>
  )
}

Edit.layout = (page) => <DashboardLayout title="Edit Category">{page}</DashboardLayout>