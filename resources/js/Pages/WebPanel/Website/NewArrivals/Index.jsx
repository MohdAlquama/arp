import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import TableSkeleton from './Partials/TableSkeleton'
import { Deferred, Head, Link, usePage } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import React from 'react'
import NewArrivalsTable from './Partials/NewArrivalsTable'

// Reads the deferred prop once it has loaded
function TableWrapper() {
  const { arrivals } = usePage().props
  return <NewArrivalsTable arrivals={arrivals} />
}

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <Head title="New Arrivals" />

      {/* PAGE HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Arrivals</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage the products shown in the "New Arrivals" section of your home page.
          </p>
        </div>

        <Link
          href={route('admin.website.new-arrivals.create')}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* TABLE (skeleton until deferred data arrives) */}
      <Deferred data="arrivals" fallback={<TableSkeleton rows={6} columns={7} />}>
        <TableWrapper />
      </Deferred>
    </div>
  )
}

Index.layout = (page) => <DashboardLayout title="New Arrivals">{page}</DashboardLayout>
