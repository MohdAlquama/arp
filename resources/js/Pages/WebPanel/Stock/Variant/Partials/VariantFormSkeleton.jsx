import React from 'react'

export default function VariantFormSkeleton() {
  return (
    <div>
     <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading Variant Form...</h1>
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  )
}

