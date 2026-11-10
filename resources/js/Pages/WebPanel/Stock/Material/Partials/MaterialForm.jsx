import React from 'react'
import { useForm } from '@inertiajs/react'
import {
    Layers,
    Activity,
    Save
} from 'lucide-react'

export const FormSection = ({ step, icon: Icon, title, description, children }) => (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
            <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-violet-600">
                <Icon size={18} />
                <span>{step}</span>
            </div>

            <h2 className="text-base font-semibold text-gray-900">
                {title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
                {description}
            </p>
        </div>

        <div className="lg:col-span-8">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                {children}
            </div>
        </div>
    </div>
)

function MaterialForm({ material = {} }) {
    const isEditing = Boolean(material?.id)

    const {
        data: formData,
        setData: setFormData,
        post,
        put,
        processing,
        errors
    } = useForm({
        material_name: material?.material_name || '',
        material_code: material?.material_code || '',
        description: material?.description || '',
        status: material?.status ?? true, // Boolean cast from model
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        if (isEditing) {
            put(route('admin.stock.material.update', material.id))
        } else {
            post(route('admin.stock.material.store'))
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            {/* STEP 1: MATERIAL DETAILS */}
            <FormSection
                step="Step 1: Identity"
                icon={Layers}
                title="Material Details"
                description="Enter the material name and optional code or description."
            >
                <div className="space-y-5">

                    {/* MATERIAL NAME (REQUIRED) */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Material Name <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            value={formData.material_name}
                            onChange={(event) =>
                                setFormData('material_name', event.target.value)
                            }
                            placeholder="e.g. 100% Organic Cotton, Genuine Leather"
                            className="w-full max-w-md rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
                            required
                        />

                        {errors.material_name && (
                            <p className="mt-1.5 text-sm text-red-600">
                                {errors.material_name}
                            </p>
                        )}
                    </div>

                    {/* MATERIAL CODE (OPTIONAL) */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Material Code <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>

                        <input
                            type="text"
                            value={formData.material_code}
                            onChange={(event) =>
                                setFormData('material_code', event.target.value.toUpperCase())
                            }
                            placeholder="e.g. MAT-COT-01"
                            className="w-full max-w-md rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm uppercase focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
                        />

                        {errors.material_code && (
                            <p className="mt-1.5 text-sm text-red-600">
                                {errors.material_code}
                            </p>
                        )}
                    </div>

                    {/* DESCRIPTION (OPTIONAL) */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Description <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>

                        <textarea
                            rows={3}
                            value={formData.description}
                            onChange={(event) =>
                                setFormData('description', event.target.value)
                            }
                            placeholder="Brief details about material quality, care instructions, or origin..."
                            className="w-full max-w-md rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
                        />

                        {errors.description && (
                            <p className="mt-1.5 text-sm text-red-600">
                                {errors.description}
                            </p>
                        )}
                    </div>

                </div>
            </FormSection>

            {/* STEP 2: STATUS SETTINGS */}
            <FormSection
                step="Step 2: Availability"
                icon={Activity}
                title="Material Status"
                description="Control whether this material is active and selectable for products."
            >
                <div className="space-y-6">

                    {/* BOOLEAN STATUS CHECKBOX (REQUIRED/ACTIVE) */}
                    <div>
                        <label className="flex max-w-md cursor-pointer items-start gap-3">
                            <input
                                type="checkbox"
                                checked={Boolean(formData.status)}
                                onChange={(event) =>
                                    setFormData('status', event.target.checked)
                                }
                                className="mt-1 h-5 w-5 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                            />

                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-700">
                                    Active Material <span className="text-red-500">*</span>
                                </span>

                                <span className="text-sm text-gray-500">
                                    Enable this material so it can be assigned to product variants and inventory.
                                </span>
                            </div>
                        </label>

                        {errors.status && (
                            <p className="mt-1.5 text-sm text-red-600">
                                {errors.status}
                            </p>
                        )}
                    </div>

                </div>
            </FormSection>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 disabled:opacity-50"
                >
                    <Save size={18} />

                    {processing
                        ? 'Saving...'
                        : isEditing
                            ? 'Update Material'
                            : 'Create Material'
                    }
                </button>
            </div>

        </form>
    )
}

export default MaterialForm