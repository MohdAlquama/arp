import React from 'react'
import { Head, Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import SubCategoryForm from './Partials/SubCategoryForm'
import { Deferred } from '@inertiajs/react'
import { SubCategoryFormSkeleton } from './Partials/SubCategoryFormSkeleton'
export default function Create({ categories }) {
    console.log(categories);
    
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <Head title="Create Sub Category" />

      {/* PAGE HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Sub Category</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add a new sub-category and link it to an existing parent category.
          </p>
        </div>
        <Link
            href={route('admin.website.subcategory.index')}
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
          Back to List
        </Link>
      </div>

      {/* FORM COMPONENT */}
      {/* We pass the categories from the controller into the form */}
      <Deferred data="categories" fallback={<SubCategoryFormSkeleton />}>
                   <SubCategoryForm categories={categories} />
                </Deferred>
      
      
    </div>
  )
}

Create.layout = (page) => <DashboardLayout title="Create Sub Category">{page}</DashboardLayout>
