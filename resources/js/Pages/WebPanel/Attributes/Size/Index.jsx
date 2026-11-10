import React, { useState } from 'react'
import { useForm, router, Deferred, Link } from '@inertiajs/react'
import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import { Plus, Edit, Trash2, Ruler, AlertCircle } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SizeFilter from './Partials/SizeFilter'

export default function Index({ sizes, filters }) {
  const [editingId, setEditingId] = useState(null)

  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
    name: '',
    status: 'active'
  })

  // Start Editing
  const handleEdit = (size) => {
    setEditingId(size.id)
    setData({
      name: size.name,
      status: size.status,
    })
    clearErrors()
  }

  // Cancel Editing
  const handleCancel = () => {
    setEditingId(null)
    reset()
    clearErrors()
  }

  // Submit Form (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault()
    clearErrors() // Submit करने से पहले पुराने एरर हटा दें
    
    if (editingId) {
      put(route('admin.website.attributes.size.update', editingId), {
        onSuccess: () => handleCancel()
      })
    } else {
      post(route('admin.website.attributes.size.store'), {
        onSuccess: () => reset()
      })
    }
  }

  // Delete Record
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this size?')) {
      router.delete(route('admin.website.attributes.size.destroy', id), { preserveScroll: true })
    }
  }

  // Extract Data and Pagination Links Safely
  const sizeList = sizes?.data || []
  const paginationLinks = sizes?.links || []

  // Skeleton Table for Data Loading
  const TableSkeleton = () => (
    <tbody className="divide-y divide-gray-100">
      {[...Array(5)].map((_, i) => (
        <tr key={i}>
          <td className="px-6 py-4"><Skeleton height={20} width={100} /></td>
          <td className="px-6 py-4"><Skeleton height={24} width={60} borderRadius="1rem" /></td>
          <td className="px-6 py-4 text-right"><Skeleton height={24} width={50} /></td>
        </tr>
      ))}
    </tbody>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* LEFT COLUMN: FILTERS + TABLE */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        <div className="mb-2">
          <h1 className="text-xl font-semibold text-gray-800">Sizes Management</h1>
          <p className="text-sm text-gray-500">Manage standard footwear sizes for your inventory.</p>
        </div>

        {/* Filters */}
        <SizeFilter filters={filters} />

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-900">
                <tr>
                  <th className="px-6 py-4 font-semibold">Size Name</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              
              {/* Deferred Loader with Skeleton */}
              <Deferred data="sizes" fallback={<TableSkeleton />}>
                <tbody className="divide-y divide-gray-100">
                  {sizeList.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                        No sizes found. Create your first size from the panel.
                      </td>
                    </tr>
                  ) : (
                    sizeList.map((size) => (
                      <tr key={size.id} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-4 font-medium text-gray-900">{size.name}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                            size.status === 'active' 
                              ? 'bg-green-50 text-green-700 border border-green-200' 
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}>
                            {size.status === 'active' ? 'Active' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-3">
                            <button onClick={() => handleEdit(size)} className="text-gray-400 hover:text-violet-600 transition" title="Edit">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => handleDelete(size.id)} className="text-gray-400 hover:text-red-600 transition" title="Delete">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Deferred>
            </table>
          </div>

          {/* Pagination */}
          <Deferred data="sizes" fallback={null}>
            {paginationLinks.length > 3 && (
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 bg-gray-50 px-6 py-3">
                <div className="text-xs text-gray-500">
                  Showing {sizes?.from ?? 0} to {sizes?.to ?? 0} of {sizes?.total ?? 0}
                </div>
                <div className="flex flex-wrap gap-1">
                  {paginationLinks.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.url || '#'}
                      preserveScroll
                      dangerouslySetInnerHTML={{ __html: link.label }}
                      className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                        link.active
                          ? 'bg-violet-600 text-white'
                          : link.url
                          ? 'text-gray-600 hover:bg-gray-200'
                          : 'pointer-events-none text-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </Deferred>
        </div>
      </div>

      {/* RIGHT COLUMN: ADD/EDIT FORM */}
      <div className="lg:col-span-4">
        <div className="sticky top-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-violet-600">
            <Ruler size={20} />
            <h2 className="text-lg font-semibold text-gray-900">
              {editingId ? 'Edit Size' : 'Add New Size'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Server Error Alert (Try-Catch fallback) */}
            {errors.error && (
              <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <p>{errors.error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size Name *</label>
              <input 
                type="text" 
                value={data.name} 
                onChange={e => setData('name', e.target.value)} 
                placeholder="e.g. UK 8" 
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-300 focus:border-violet-600 focus:ring-violet-600/20'
                }`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                value={data.status} 
                onChange={e => setData('status', e.target.value)} 
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
              >
                <option value="active">Active</option>
                <option value="draft">Draft (Hidden)</option>
              </select>
              {errors.status && <p className="mt-1 text-xs text-red-600">{errors.status}</p>}
            </div>

            <div className="pt-4 flex gap-3 border-t border-gray-100">
              {editingId && (
                <button 
                  type="button" 
                  onClick={handleCancel} 
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              )}
              <button 
                type="submit" 
                disabled={processing} 
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-violet-600 py-2 text-sm font-medium text-white hover:bg-violet-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {processing ? 'Saving...' : (editingId ? 'Update Size' : <><Plus size={16}/> Add Size</>)}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

Index.layout = (page) => <DashboardLayout title="Sizes">{page}</DashboardLayout>