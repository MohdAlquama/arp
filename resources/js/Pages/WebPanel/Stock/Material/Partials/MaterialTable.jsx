import React from 'react'
import { Link, useForm, Deferred } from '@inertiajs/react'
import { Edit, Trash2 } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function MaterialTable({ materials }) {
  const { delete: destroy } = useForm()

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      destroy(route('admin.stock.material.destroy', id))
    }
  }

  // Extract variables for pagination and data mapping safely
  const materialList = materials?.data || []
  const paginationLinks = materials?.links || []
  const from = materials?.from ?? 0
  const to = materials?.to ?? 0
  const total = materials?.total ?? 0

  // Skeleton fallback mimicking the 5 columns
  const skeletonRows = (
    <tbody className="divide-y divide-gray-100">
      {[...Array(5)].map((_, index) => (
        <tr key={index} className="transition hover:bg-gray-50/50">
          <td className="px-6 py-4"><Skeleton height={20} width="70%" /></td>
          <td className="px-6 py-4"><Skeleton height={20} width="40%" /></td>
          <td className="px-6 py-4"><Skeleton height={20} width="90%" /></td>
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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="border-b border-gray-200 bg-gray-50/50 text-gray-900">
            <tr>
              <th className="px-6 py-4 font-semibold">Material Name</th>
              <th className="px-6 py-4 font-semibold">Code</th>
              <th className="px-6 py-4 font-semibold">Description</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          
          <Deferred data="materials" fallback={skeletonRows}>
            <tbody className="divide-y divide-gray-100">
              {materialList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No materials found. Click "Create Material" to add one.
                  </td>
                </tr>
              ) : (
                materialList.map((material) => (
                  <tr key={material.id} className="transition hover:bg-gray-50/50">
                    
                    {/* Name */}
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {material.material_name}
                    </td>
                    
                    {/* Code */}
                    <td className="px-6 py-4">
                      {material.material_code ? (
                        <span className="rounded bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-600">
                          {material.material_code}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    
                    {/* Description (Truncated) */}
                    <td className="px-6 py-4 max-w-xs truncate text-gray-500">
                      {material.description || <span className="text-gray-400">—</span>}
                    </td>
                    
                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        material.status
                          ? 'border border-green-200 bg-green-50 text-green-700'
                          : 'border border-slate-200 bg-slate-50 text-slate-700'
                      }`}>
                        {material.status ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    
                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        {/* UNCOMMENTED: Edit Route works now */}
                        <Link
                          href={route('admin.stock.material.edit', material.id)}
                          className="text-gray-400 transition hover:text-violet-600"
                          title="Edit"
                          aria-label={`Edit ${material.material_name}`}
                        >
                          <Edit size={18} />
                        </Link>
                        
                        <button
                          type="button"
                          onClick={() => handleDelete(material.id)}
                          className="text-gray-400 transition hover:text-red-600"
                          title="Delete"
                          aria-label={`Delete ${material.material_name}`}
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

      {/* Pagination Box */}
      {paginationLinks.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
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
  )
}