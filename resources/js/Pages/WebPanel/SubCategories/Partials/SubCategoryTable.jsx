import React from 'react'
import { Link, useForm, Deferred } from '@inertiajs/react'
import { CheckCircle2, EyeOff, Edit, Trash2 } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SubCategoryTable({ subCategories }) {
  const { delete: destroy } = useForm()

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this sub-category?')) {
      destroy(route('admin.website.subcategory.destroy', id))
    }
  }

  // BUG FIX 1: Properly extract variables from subCategories (with fallbacks if undefined)
  const subCategoryList = subCategories?.data || []
  const paginationLinks = subCategories?.links || []
  const from = subCategories?.from ?? 0
  const to = subCategories?.to ?? 0
  const total = subCategories?.total ?? 0

  // Skeleton fallback mimicking the 5 columns for a smooth UI transition
  const skeletonRows = (
    <tbody className="divide-y divide-gray-100">
      {[...Array(5)].map((_, index) => (
        <tr key={index} className="transition hover:bg-gray-50/50">
          <td className="px-6 py-4"><Skeleton height={20} width="70%" /></td>
          <td className="px-6 py-4"><Skeleton height={20} width="50%" /></td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-1.5">
              <Skeleton circle height={16} width={16} />
              <Skeleton height={16} width={50} />
            </div>
          </td>
          <td className="px-6 py-4">
            <Skeleton height={24} width={60} borderRadius={9999} />
          </td>
          <td className="px-6 py-4">
            <div className="flex justify-end gap-3">
              <Skeleton height={20} width={20} />
              <Skeleton height={20} width={20} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  )

  return (
    <div className="bg-gray-50 p-4 lg:p-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        
        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50/50 text-gray-900">
              <tr>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Parent Category</th>
                <th className="px-6 py-4 font-semibold">Menu Visibility</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            
            <Deferred data="subCategories" fallback={skeletonRows}>
              <tbody className="divide-y divide-gray-100">
                {subCategoryList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No sub-categories found.
                    </td>
                  </tr>
                ) : (
                  subCategoryList.map((subCategory) => (
                    <tr key={subCategory.id} className="transition hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {subCategory.name}
                      </td>
                      <td className="px-6 py-4">
                        {subCategory.category ? (
                          <span className="font-medium text-violet-600">
                            {subCategory.category.name}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {subCategory.show_in_menu ? (
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
                      <td className="px-6 py-4">
                        <span className={`inline-flex capitalize rounded-full px-2.5 py-1 text-xs font-medium ${
                          subCategory.status === 'active' 
                            ? 'border border-green-200 bg-green-50 text-green-700' 
                            : subCategory.status === 'draft'
                            ? 'border border-amber-200 bg-amber-50 text-amber-700'
                            : 'border border-red-200 bg-red-50 text-red-700'
                        }`}>
                          {subCategory.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          
                          {/* BUG FIX 4: Uncommented and fixed edit route */}
                          <Link
                            href={route('admin.website.subcategory.edit', subCategory.id)}
                            className="text-gray-400 transition hover:text-violet-600"
                            title="Edit"
                            aria-label={`Edit ${subCategory.name}`}
                          >
                            <Edit size={18} />
                          </Link>
                          
                          <button
                            type="button"
                            onClick={() => handleDelete(subCategory.id)}
                            className="text-gray-400 transition hover:text-red-600"
                            title="Delete"
                            aria-label={`Delete ${subCategory.name}`}
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

        {/* BUG FIX 3: Moved pagination completely outside of the <table> tag */}
        {paginationLinks.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
            
            {/* BUG FIX 2: Fixed variable names for from, to, and total */}
            <div className="text-xs text-gray-500">
              Showing {from} to {to} of {total} results
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

      </div>
    </div>
  )
}

export default SubCategoryTable