import React from 'react'
import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import CategoryForm from './Partials/CategoryForm'
// import { router } from '@inertiajs/react' // Uncomment when ready to use Inertia

function Create() {
  
  

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Create New Category</h1>
          <p className="text-sm text-gray-500">Configure your new category settings below.</p>
        </div>
        <a href="/admin/categories" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50">
          Back to Categories
        </a>
      </div>

      {/* Render Shared Form */}
      <CategoryForm  />
    </div>
  )
}

Create.layout = (page) => <DashboardLayout title="Create Category">{page}</DashboardLayout>
export default Create