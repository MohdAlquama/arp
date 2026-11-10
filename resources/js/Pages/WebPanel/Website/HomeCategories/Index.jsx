import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import { Deferred, Head, Link, router, usePage } from '@inertiajs/react'
import { Plus, Edit, Trash2, LayoutGrid } from 'lucide-react'
import React from 'react'
import TableSkeleton from './Partials/TableSkeleton'

function CategoriesCard({ categories }) {
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this category tile?')) {
      router.delete(route('admin.website.categories.destroy', id))
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-600">
            <LayoutGrid size={24} />
          </div>
          <h3 className="text-base font-semibold text-gray-900">No category tiles found</h3>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            Add tiles for the "Shop By Category" section of your home page.
          </p>
          <Link
            href={route('admin.website.categories.create')}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500"
          >
            <Plus size={16} />
            Create Tile
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/75 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="py-3.5 pl-6 pr-3">Image</th>
                <th className="px-3 py-3.5">Name & Subtitle</th>
                <th className="px-3 py-3.5">Link</th>
                <th className="px-3 py-3.5">Order</th>
                <th className="px-3 py-3.5">Status</th>
                <th className="py-3.5 pl-3 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {categories.map((category) => (
                <tr key={category.id} className="transition-colors hover:bg-gray-50/50">
                  <td className="py-4 pl-6 pr-3">
                    <div className="h-14 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                      {category.image_url ? (
                        <img
                          src={category.image_url}
                          alt={category.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="max-w-xs px-3 py-4">
                    <div className="truncate font-semibold text-gray-900">{category.name}</div>
                    <div className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                      {category.subtitle || 'No subtitle.'}
                    </div>
                  </td>

                  <td className="px-3 py-4">
                    <span className="inline-block max-w-[200px] truncate text-xs text-gray-500">
                      {category.href}
                    </span>
                  </td>

                  <td className="px-3 py-4 text-sm font-medium text-gray-700">
                    {category.sort_order}
                  </td>

                  <td className="px-3 py-4">
                    {category.status ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                        Hidden
                      </span>
                    )}
                  </td>

                  <td className="py-4 pl-3 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={route('admin.website.categories.edit', category.id)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-violet-600"
                        title="Edit Tile"
                      >
                        <Edit size={16} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(category.id)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete Tile"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <Head title="Shop By Category" />

      {/* PAGE HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shop By Category</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage the category tiles on your home page. The first two tiles (by order) are shown large.
          </p>
        </div>

        <Link
          href={route('admin.website.categories.create')}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500"
        >
          <Plus size={18} />
          Add Tile
        </Link>
      </div>

      {/* TABLE (skeleton until deferred data arrives) */}
      <Deferred data="categories" fallback={<TableSkeleton rows={6} columns={6} />}>
        <CategoriesCardWrapper />
      </Deferred>
    </div>
  )
}

// Reads the deferred prop once it has loaded
function CategoriesCardWrapper() {
  const { categories } = usePage().props
  return <CategoriesCard categories={categories} />
}

Index.layout = (page) => <DashboardLayout title="Shop By Category">{page}</DashboardLayout>
