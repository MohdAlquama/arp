import React from 'react';
import { FolderEdit, Activity } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FormSection } from './SubCategoryForm';

export function SubCategoryFormSkeleton() {
    return (
        <div className="space-y-8">
            {/* Step 1 Skeleton */}
            <FormSection
                step="Step 1: Identity"
                icon={FolderEdit}
                title="Sub Category Details"
                description="Select the parent category and enter the sub category name."
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
                </div>
            </FormSection>

            {/* Step 2 Skeleton */}
            <FormSection
                step="Step 2: Visibility"
                icon={Activity}
                title="Visibility Settings"
                description="Manage sub category status and website visibility."
            >
                <div className="space-y-6">
                    <div>
                        <div className="mb-1.5"><Skeleton width={60} height={16} /></div>
                        <Skeleton height={42} className="w-full max-w-md" borderRadius={8} />
                    </div>
                    
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
                <Skeleton height={42} width={180} borderRadius={8} />
            </div>
        </div>
    )
}