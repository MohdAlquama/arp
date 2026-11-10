import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function CategoryFormSkeleton() {
  return (
    <div className="space-y-8 pointer-events-none select-none">
      
      {/* STEP 1: IDENTITY SKELETON */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Skeleton width={100} className="mb-2" />
          <Skeleton width={150} height={24} className="mb-2" />
          <Skeleton width={220} />
        </div>
        <div className="lg:col-span-8">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <Skeleton width={120} className="mb-2" />
            <Skeleton height={42} className="w-full max-w-md" borderRadius="0.5rem" />
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* CATEGORY PAGE DESIGN SKELETON */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-2 lg:col-span-4">
          <Skeleton width={100} />
          <Skeleton width={190} height={24} />
          <Skeleton width={250} />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-8">
          <Skeleton height={42} className="mb-5" borderRadius="0.5rem" />
          <Skeleton height={96} className="mb-5" borderRadius="0.5rem" />
          <Skeleton height={130} borderRadius="0.5rem" />
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* STEP 2: HEADER PLACEMENT SKELETON */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Skeleton width={140} className="mb-2" />
          <Skeleton width={180} height={24} className="mb-2" />
          <Skeleton width={240} />
        </div>
        <div className="lg:col-span-8">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Skeleton height={80} borderRadius="0.75rem" />
              <Skeleton height={80} borderRadius="0.75rem" />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* STEP 3: UI LAYOUT SKELETON */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Skeleton width={120} className="mb-2" />
          <Skeleton width={160} height={24} className="mb-2" />
          <Skeleton width={200} />
        </div>
        <div className="lg:col-span-8">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Skeleton height={96} borderRadius="0.5rem" />
              <Skeleton height={96} borderRadius="0.5rem" />
              <Skeleton height={96} borderRadius="0.5rem" />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* STEP 4: STATUS SKELETON */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Skeleton width={100} className="mb-2" />
          <Skeleton width={140} height={24} className="mb-2" />
          <Skeleton width={200} />
        </div>
        <div className="lg:col-span-8">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Skeleton height={80} borderRadius="0.75rem" />
              <Skeleton height={80} borderRadius="0.75rem" />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS SKELETON */}
      <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-5">
        <Skeleton width={90} height={40} borderRadius="0.5rem" />
        <Skeleton width={140} height={40} borderRadius="0.5rem" />
      </div>
      
    </div>
  )
}
