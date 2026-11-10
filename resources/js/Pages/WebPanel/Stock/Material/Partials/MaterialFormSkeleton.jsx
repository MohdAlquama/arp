import { Layers, Activity } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FormSection } from './MaterialForm' // Adjust path based on your structure

export function MaterialFormSkeleton() {
    return (
        <div className="space-y-8">
            {/* Step 1 Skeleton */}
            <FormSection
                step="Step 1: Identity"
                icon={Layers}
                title="Material Details"
                description="Enter the material name and optional code or description."
            >
                <div className="space-y-5">
                    <div>
                        <div className="mb-1.5"><Skeleton width={120} height={16} /></div>
                        <Skeleton height={42} className="w-full max-w-md" borderRadius={8} />
                    </div>
                    <div>
                        <div className="mb-1.5"><Skeleton width={140} height={16} /></div>
                        <Skeleton height={42} className="w-full max-w-md" borderRadius={8} />
                    </div>
                    <div>
                        <div className="mb-1.5"><Skeleton width={100} height={16} /></div>
                        <Skeleton height={84} className="w-full max-w-md" borderRadius={8} />
                    </div>
                </div>
            </FormSection>

            {/* Step 2 Skeleton */}
            <FormSection
                step="Step 2: Availability"
                icon={Activity}
                title="Material Status"
                description="Control whether this material is active and selectable for products."
            >
                <div className="space-y-6">
                    <div className="flex max-w-md items-start gap-3">
                        <div className="mt-1"><Skeleton height={20} width={20} borderRadius={4} /></div>
                        <div className="flex flex-col w-full">
                            <Skeleton width={150} height={16} className="mb-1" />
                            <Skeleton width="100%" height={14} count={2} />
                        </div>
                    </div>
                </div>
            </FormSection>

            {/* Submit Button Skeleton */}
            <div className="flex justify-end pt-4">
                <Skeleton height={42} width={160} borderRadius={8} />
            </div>
        </div>
    )
}