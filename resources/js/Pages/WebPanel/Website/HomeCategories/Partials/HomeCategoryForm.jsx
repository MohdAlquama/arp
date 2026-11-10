import React, { useState, useRef } from 'react'
import { useForm } from '@inertiajs/react'
import { Layout, Image as ImageIcon, Activity, Save, Upload } from 'lucide-react'

const FormSection = ({ step, icon: Icon, title, description, children }) => (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
            <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-violet-600">
                <Icon size={18} />
                <span>{step}</span>
            </div>
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>

        <div className="lg:col-span-8">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                {children}
            </div>
        </div>
    </div>
)

const inputClass =
    'w-full max-w-md rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20'

const FieldError = ({ message }) =>
    message ? <p className="mt-1.5 text-sm text-red-600">{message}</p> : null

export default function HomeCategoryForm({ category = {} }) {
    const isEditing = Boolean(category?.id)
    const fileInputRef = useRef(null)

    const { data, setData, post, processing, errors } = useForm({
        name: category?.name || '',
        subtitle: category?.subtitle || '',
        image: null,
        href: category?.href || '',
        sort_order: category?.sort_order ?? 0,
        status: category?.status ?? true,
        ...(category?.id ? { _method: 'put' } : {}),
    })

    const [imagePreview, setImagePreview] = useState(category?.image_url || null)

    const handleImageChange = (event) => {
        const file = event.target.files?.[0]
        if (!file) return
        setData('image', file)
        setImagePreview(URL.createObjectURL(file))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (isEditing) {
            post(route('admin.website.categories.update', category.id), { forceFormData: true })
        } else {
            post(route('admin.website.categories.store'), { forceFormData: true })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            {/* STEP 1: CONTENT */}
            <FormSection
                step="Step 1: Content"
                icon={Layout}
                title="Tile Details"
                description="Name, small label and the page this tile links to."
            >
                <div className="space-y-5">

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. MEN, SANDALS"
                            className={inputClass}
                            required
                        />
                        <FieldError message={errors.name} />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Subtitle <span className="font-normal text-gray-400">(Optional)</span>
                        </label>
                        <input
                            type="text"
                            value={data.subtitle}
                            onChange={(e) => setData('subtitle', e.target.value)}
                            placeholder="e.g. CONFIDENCE IN EVERY STEP"
                            className={inputClass}
                        />
                        <FieldError message={errors.subtitle} />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Link (URL) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.href}
                            onChange={(e) => setData('href', e.target.value)}
                            placeholder="e.g. /men or /category/casual"
                            className={inputClass}
                            required
                        />
                        <FieldError message={errors.href} />
                    </div>

                </div>
            </FormSection>

            {/* STEP 2: IMAGE */}
            <FormSection
                step="Step 2: Media"
                icon={ImageIcon}
                title="Tile Image"
                description="Portrait or square images work best. Required for new tiles."
            >
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Upload Image {!isEditing && <span className="text-red-500">*</span>}
                    </label>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    {!imagePreview ? (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="flex max-w-md cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 px-6 py-8 text-center transition hover:border-violet-500 hover:bg-violet-50/30"
                        >
                            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                <Upload size={20} />
                            </div>
                            <p className="text-sm font-medium text-gray-700">Click to upload an image</p>
                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, or WEBP (Max 4MB)</p>
                        </div>
                    ) : (
                        <div className="max-w-md overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-3">
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
                                <img
                                    src={imagePreview}
                                    alt="Tile Preview"
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                                <span className="truncate text-xs text-gray-500">
                                    {data.image?.name || 'Current uploaded image'}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="rounded-md bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    )}

                    <FieldError message={errors.image} />
                </div>
            </FormSection>

            {/* STEP 3: ORDER + STATUS */}
            <FormSection
                step="Step 3: Visibility"
                icon={Activity}
                title="Order & Status"
                description="First two tiles (lowest order numbers) appear as large tiles."
            >
                <div className="space-y-6">

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Display Order
                        </label>
                        <input
                            type="number"
                            min="0"
                            value={data.sort_order}
                            onChange={(e) => setData('sort_order', e.target.value)}
                            className="w-32 rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
                        />
                        <p className="mt-1 text-xs text-gray-500">Smaller number shows first.</p>
                        <FieldError message={errors.sort_order} />
                    </div>

                    <label className="flex max-w-md cursor-pointer items-start gap-3">
                        <input
                            type="checkbox"
                            checked={Boolean(data.status)}
                            onChange={(e) => setData('status', e.target.checked)}
                            className="mt-1 h-5 w-5 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700">Show on Home Page</span>
                            <span className="text-sm text-gray-500">
                                Enable to publish this tile on the storefront.
                            </span>
                        </div>
                    </label>
                    <FieldError message={errors.status} />

                </div>
            </FormSection>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 disabled:opacity-50"
                >
                    <Save size={18} />
                    {processing ? 'Saving...' : isEditing ? 'Update Tile' : 'Create Tile'}
                </button>
            </div>

        </form>
    )
}
