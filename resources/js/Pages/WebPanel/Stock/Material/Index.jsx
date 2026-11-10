import React from 'react'
import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import { Plus } from 'lucide-react'
import { Head, Link } from '@inertiajs/react'
import MaterialTable from './Partials/MaterialTable'

export default function Index({ materials }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <Head title="Material Management" />

      {/* Page Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Material Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage product materials based on type, description and code.
          </p>
        </div>
        
        <Link
          href={route('admin.stock.material.create')}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.98]"
        >
          <Plus size={18} />
          <span>Create Material</span>
        </Link>
      </div>
      
      {/* Reusable Table Component */}
      <MaterialTable materials={materials} />
      
    </div>
  )
}

Index.layout = (page) => <DashboardLayout title="Material Management">{page}</DashboardLayout>