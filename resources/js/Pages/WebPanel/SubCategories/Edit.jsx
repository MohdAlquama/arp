import React from 'react'
import { Link, Deferred, Head } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import SubCategoryForm from './Partials/SubCategoryForm'
import { SubCategoryFormSkeleton } from './Partials/SubCategoryFormSkeleton'

export default function Edit({ subCategory, categories }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <Head title="Create Edit Category" />
      {/* Page Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            {/* FIXED: Changed category?.name to subCategory?.name */}
            Edit Sub Category {subCategory?.name ? `: ${subCategory.name}` : ''}
          </h1>
          <p className="text-sm text-gray-500">
            Configure sub-category settings below.
          </p>
        </div>
        <Link
          // FIXED: Pointing to subcategory index instead of category index
          href={route('admin.website.subcategory.index')}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <ArrowLeft size={14} />
          <span>Back to Sub Categories</span>
        </Link>
      </div>

  <Deferred data="categories" fallback={<SubCategoryFormSkeleton />}>
      <SubCategoryForm categories={categories} subCategory={subCategory} />
                </Deferred>
      
    </div>
  )
}

Edit.layout = (page) => <DashboardLayout title="Edit Sub Category">{page}</DashboardLayout>