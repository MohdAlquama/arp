import React from 'react'
import { Head, Link, Deferred } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'

import MaterialForm from './Partials/MaterialForm'
import { MaterialFormSkeleton } from './Partials/MaterialFormSkeleton'

export default function Edit({ material }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      {/* We use an empty fallback for the title since material isn't loaded yet */}
      <Head title={material ? `Edit Material: ${material.material_name}` : 'Loading...'} />
      
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Edit Material {material?.material_name ? `: ${material.material_name}` : ''}
          </h1>
          <p className="text-sm text-gray-500">
            Update the material details and availability status.
          </p>
        </div>
        
        <Link
          href={route('admin.stock.material.index')}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        >
          <ArrowLeft size={14} />
          <span>Back to Materials</span>
        </Link>
      </div>

      {/* 
        Defer loading the "material" prop. 
        While it fetches from the backend, show the Skeleton.
      */}
      <Deferred data="material" fallback={<MaterialFormSkeleton />}>
        <MaterialForm material={material} />
      </Deferred>
      
    </div>
  )
}

Edit.layout = (page) => <DashboardLayout title="Edit Material">{page}</DashboardLayout>