import React from 'react'
import { useForm } from '@inertiajs/react'
import {
    FolderEdit,
    Activity,
    Save
} from 'lucide-react'

export const FormSection = ({step, icon: Icon, title, description, children}) => (
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

function SubCategoryForm({subCategory = {},categories = []}) {
    const isEditing = Boolean(subCategory?.id)

    const {
        data: formData,
        setData: setFormData,
        post,
        put,
        processing,
        errors
    } = useForm({
        category_id: subCategory?.category_id || '',
        name: subCategory?.name || '',
        show_in_menu: subCategory?.show_in_menu ?? true,
        status: subCategory?.status || 'active',
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        if (isEditing) {
            // Using route() helper for named routes
            put(route('admin.website.subcategory.update', subCategory.id))  
        } else {
            // Using route() helper for named routes
            post(route('admin.website.subcategory.store'))
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            {/* STEP 1: SUB CATEGORY DETAILS */}

            <FormSection
                step="Step 1: Identity"
                icon={FolderEdit}
                title="Sub Category Details"
                description="Select the parent category and enter the sub category name."
            >
                <div className="space-y-5">

                    {/* CATEGORY SELECTION */}

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Select Category <span className="text-red-500">*</span>
                        </label>

                        <select
                            value={formData.category_id}
                            onChange={(event) =>
                                setFormData('category_id', event.target.value)
                            }
                            className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
                            required
                        >
                            <option value="" disabled>
                                Select Category
                            </option>

                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        {errors.category_id && (
                            <p className="mt-1.5 text-sm text-red-600">
                                {errors.category_id}
                            </p>
                        )}
                    </div>

                    {/* SUB CATEGORY NAME */}

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Sub Category Name <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            value={formData.name}
                            onChange={(event) =>
                                setFormData('name', event.target.value)
                            }
                            placeholder="e.g. Running Shoes"
                            className="w-full max-w-md rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
                            required
                        />

                        {errors.name && (
                            <p className="mt-1.5 text-sm text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                </div>
            </FormSection>

            {/* STEP 2: VISIBILITY SETTINGS */}

            <FormSection
                step="Step 2: Visibility"
                icon={Activity}
                title="Visibility Settings"
                description="Manage sub category status and website visibility."
            >
                <div className="space-y-6">

                    {/* STATUS */}

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Status <span className="text-red-500">*</span>
                        </label>

                        <select
                            value={formData.status}
                            onChange={(event) =>
                                setFormData('status', event.target.value)
                            }
                            className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
                        >
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        {errors.status && (
                            <p className="mt-1.5 text-sm text-red-600">
                                {errors.status}
                            </p>
                        )}
                    </div>

                    {/* WEBSITE MENU VISIBILITY */}

                    <div>
                        <label className="flex max-w-md cursor-pointer items-start gap-3">

                            <input
                                type="checkbox"
                                checked={formData.show_in_menu}
                                onChange={(event) =>
                                    setFormData('show_in_menu', event.target.checked)
                                }
                                className="mt-1 h-5 w-5 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                            />

                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-700">
                                    Show in Website Menu
                                </span>

                                <span className="text-sm text-gray-500">
                                    Allow customers to see this sub category in the website navigation menu.
                                </span>
                            </div>

                        </label>

                        {errors.show_in_menu && (
                            <p className="mt-1.5 text-sm text-red-600">
                                {errors.show_in_menu}
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
                            ? 'Update Sub Category'
                            : 'Create Sub Category'
                    }
                </button>
            </div>

        </form>
    )
}

export default SubCategoryForm