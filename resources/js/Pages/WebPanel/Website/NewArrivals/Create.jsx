import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import NewArrivalForm from './Partials/NewArrivalForm'
import PageHeader from './Partials/PageHeader'

export default function Create() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <Head title="Add New Arrival" />

      <PageHeader title="Add New Arrival">
        Add a product to the "New Arrivals" section of your home page.
      </PageHeader>

      <NewArrivalForm />
    </div>
  )
}

Create.layout = (page) => <DashboardLayout title="New Arrivals">{page}</DashboardLayout>
