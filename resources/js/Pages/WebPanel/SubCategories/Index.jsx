import React from 'react'
import { Head, Link } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import SubCategoryTable from './Partials/SubCategoryTable'
import SubCategoryFilter from './Partials/SubCategoryFilter'

export default function Index({ subCategories, filters, categoryOptions }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <Head title="Sub Categories" />

      {/* Page Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Sub Categories</h1>
          <p className="text-sm text-gray-500">Manage your website's sub-category navigation and layouts.</p>
        </div>
        <Link
          href={route('admin.website.subcategory.create')}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.98]"
        >
          <Plus size={18} />
          <span>Create Sub Category</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="px-4 lg:px-6">
        <SubCategoryFilter filters={filters} categories={categoryOptions} />
      </div>

      {/* Main Content (Table) */}
      <SubCategoryTable subCategories={subCategories} />
    </div>
  )
}

Index.layout = (page) => <DashboardLayout title="sub-categories">{page}</DashboardLayout>