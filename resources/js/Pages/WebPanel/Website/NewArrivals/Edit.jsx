import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import NewArrivalForm from './Partials/NewArrivalForm'
import PageHeader from './Partials/PageHeader'

export default function Edit({ arrival }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <Head title="Edit New Arrival" />

      <PageHeader title="Edit New Arrival">
        Update details for: <span className="font-semibold text-gray-700">{arrival.name}</span>
      </PageHeader>

      <NewArrivalForm arrival={arrival} />
    </div>
  )
}

Edit.layout = (page) => <DashboardLayout title="New Arrivals">{page}</DashboardLayout>
