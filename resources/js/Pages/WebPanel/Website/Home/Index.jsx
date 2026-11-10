import DashboardLayout from '@/Layouts/AdministrationPanelLayout/DashboardLayout'
import { Head, Link, router } from '@inertiajs/react'
import { Plus, Edit, Trash2, Layout } from 'lucide-react'
import React from 'react'

export default function Index({ sections }) {
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this hero slide?')) {
      router.delete(route('admin.website.home.destroy', id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <Head title="Hero Slider Management" />

      {/* PAGE HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero Slider</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage the slides shown in the hero banner of your website home page. Lower order number appears first.
          </p>
        </div>

        <Link
          href={route('admin.website.home.create')}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500"
        >
          <Plus size={18} />
          Add Slide
        </Link>
      </div>

      {/* TABLE CARD */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {sections.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-600">
              <Layout size={24} />
            </div>
            <h3 className="text-base font-semibold text-gray-900">No slides found</h3>
            <p className="mt-1 max-w-sm text-sm text-gray-500">
              Get started by creating your first hero slide for the home page.
            </p>
            <Link
              href={route('admin.website.home.create')}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500"
            >
              <Plus size={16} />
              Create Slide
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/75 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="py-3.5 pl-6 pr-3">Image</th>
                  <th className="px-3 py-3.5">Slide Text</th>
                  <th className="px-3 py-3.5">Button</th>
                  <th className="px-3 py-3.5">Order</th>
                  <th className="px-3 py-3.5">Status</th>
                  <th className="py-3.5 pl-3 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {sections.map((section) => (
                  <tr key={section.id} className="transition-colors hover:bg-gray-50/50">
                    {/* IMAGE */}
                    <td className="py-4 pl-6 pr-3">
                      <div className="h-14 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                        {section.image_url ? (
                          <img
                            src={section.image_url}
                            alt={section.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                    </td>

                    {/* TEXT */}
                    <td className="max-w-xs px-3 py-4">
                      {section.subtitle && (
                        <div className="truncate text-[11px] font-semibold uppercase tracking-wider text-violet-600">
                          {section.subtitle}
                        </div>
                      )}
                      <div className="truncate font-semibold text-gray-900">
                        {section.title}{' '}
                        {section.highlight && (
                          <span className="text-amber-600">{section.highlight}</span>
                        )}
                      </div>
                      <div className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                        {section.description || 'No description provided.'}
                      </div>
                    </td>

                    {/* BUTTON */}
                    <td className="px-3 py-4">
                      {section.has_button ? (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center rounded-md bg-violet-50 px-2 py-1 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-700/10">
                            {section.button_text}
                          </span>
                          <div className="max-w-[180px] truncate text-xs text-gray-400">
                            {section.button_link}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs italic text-gray-400">No Button</span>
                      )}
                    </td>

                    {/* ORDER */}
                    <td className="px-3 py-4 text-sm font-medium text-gray-700">
                      {section.sort_order}
                    </td>

                    {/* STATUS */}
                    <td className="px-3 py-4">
                      {section.status ? (
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

                    {/* ACTIONS */}
                    <td className="py-4 pl-3 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={route('admin.website.home.edit', section.id)}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-violet-600"
                          title="Edit Slide"
                        >
                          <Edit size={16} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(section.id)}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete Slide"
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
    </div>
  )
}

Index.layout = (page) => <DashboardLayout title="Hero Slider Management">{page}</DashboardLayout>
