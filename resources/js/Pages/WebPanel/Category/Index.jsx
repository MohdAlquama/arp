import React from 'react'
import { Link, router, Deferred } from '@inertiajs/react'
import { Plus, Edit, Trash2, CheckCircle2, EyeOff } from 'lucide-react'
import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import CategoryFilter from './Partials/CategoryFilter'

function Index({ categories, filters }) {
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      router.delete(route('admin.website.category.destroy', id), {
        preserveScroll: true,
      })
    }
  }

  // Handle both paginated object (categories.data) or flat array safely
  const categoryList = categories?.data || categories || []
  const paginationLinks = categories?.links || []

  // Skeleton rows matching the .skeleton-mode CSS utility
  const skeletonRows = (
    <tbody className="divide-y divide-gray-100 skeleton-mode">
      {[...Array(5)].map((_, index) => (
        <tr key={index}>
          <td className="px-6 py-4">
            <div className="h-4 w-32" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-20" />
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-24" />
          </td>
          <td className="px-6 py-4">
            <div className="h-5 w-16 !rounded-full" />
          </td>
          <td className="px-6 py-4 text-right">
            <div className="ml-auto flex justify-end gap-3">
              <div className="h-5 w-5" />
              <div className="h-5 w-5" />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      
      {/* Page Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Categories</h1>
          <p className="text-sm text-gray-500">Manage your website's category navigation and layouts.</p>
        </div>
        
        <Link 
          href={route('admin.website.category.create')}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.98]"
        >
          <Plus size={18} />
          <span>Create Category</span>
        </Link>
      </div>

      {/* Filters */}
      <CategoryFilter filters={filters} />

      {/* Table Container */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50/50 text-gray-900">
              <tr>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Header Placement</th>
                <th className="px-6 py-4 font-semibold">UI Layout</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            
            <Deferred data="categories" fallback={skeletonRows}>
              <tbody className="divide-y divide-gray-100">
                {categoryList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No categories found. Click "Create Category" to add one.
                    </td>
                  </tr>
                ) : (
                  categoryList.map((category) => (
                    <tr key={category.id} className="transition hover:bg-gray-50/50">
                      
                      {/* Name */}
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {category.name}
                      </td>
                      
                      {/* Header Placement */}
                      <td className="px-6 py-4">
                        {category.show_in_header ? (
                          <span className="flex items-center gap-1.5 text-green-600">
                            <CheckCircle2 size={16} />
                            <span>Visible</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-gray-500">
                            <EyeOff size={16} />
                            <span>Hidden</span>
                          </span>
                        )}
                      </td>
                      
                      {/* UI Layout */}
                      <td className="px-6 py-4">
                        {category.ui_id ? `Layout ID: ${category.ui_id}` : <span className="text-gray-400">—</span>}
                      </td>
                      
                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          category.status === 'active' 
                            ? 'border border-green-200 bg-green-50 text-green-700' 
                            : 'border border-amber-200 bg-amber-50 text-amber-700'
                        }`}>
                          {category.status === 'active' ? 'Active' : 'Draft'}
                        </span>
                      </td>
                      
                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          {/* Active Edit Link */}
                          <Link
                            href={route('admin.website.category.edit', category.id)}
                            className="text-gray-400 transition hover:text-violet-600"
                            title="Edit"
                            aria-label={`Edit ${category.name}`}
                          >
                            <Edit size={18} />
                          </Link>
                          
                          {/* Delete Action */}
                          <button
                            type="button"
                            onClick={() => handleDelete(category.id)}
                            className="text-gray-400 transition hover:text-red-600"
                            title="Delete"
                            aria-label={`Delete ${category.name}`}
                          >
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

        {/* Pagination Controls */}
        <Deferred data="categories" fallback={null}>
          {paginationLinks.length > 0 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
              <div className="text-xs text-gray-500">
                Showing {categories.from ?? 0} to {categories.to ?? 0} of {categories.total ?? 0} results
              </div>
              <div className="flex gap-1">
                {paginationLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url || '#'}
                    preserveScroll
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                      link.active
                        ? 'bg-violet-600 text-white'
                        : link.url
                        ? 'text-gray-600 hover:bg-gray-100'
                        : 'pointer-events-none text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </Deferred>
      </div>

    </div>
  )
}

Index.layout = (page) => <DashboardLayout title="Categories">{page}</DashboardLayout>

export default Index