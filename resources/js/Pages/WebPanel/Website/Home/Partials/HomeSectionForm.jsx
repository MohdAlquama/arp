import React, { useState, useRef } from 'react'
import { useForm } from '@inertiajs/react'
import {
    Layout,
    Image as ImageIcon,
    MousePointerClick,
    Activity,
    Save,
    Link as LinkIcon,
    Type,
    Upload,
    Trash2,
} from 'lucide-react'

export const FormSection = ({ step, icon: Icon, title, description, children }) => (
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

function HomeSectionForm({ section = {} }) {
    const isEditing = Boolean(section?.id)
    const fileInputRef = useRef(null)

    const { data, setData, post, processing, errors } = useForm({
        subtitle: section?.subtitle || '',
        title: section?.title || '',
        highlight: section?.highlight || '',
        description: section?.description || '',
        image: null,
        remove_image: false,
        has_button: section?.has_button ?? false,
        button_text: section?.button_text || '',
        button_link: section?.button_link || '',
        sort_order: section?.sort_order ?? 0,
        status: section?.status ?? true,
        // Laravel needs POST + _method=put to read multipart file uploads on update
        ...(section?.id ? { _method: 'put' } : {}),
    })

    const [imagePreview, setImagePreview] = useState(section?.image_url || null)

    const handleImageChange = (event) => {
        const file = event.target.files?.[0]
        if (!file) return

        setData((prev) => ({ ...prev, image: file, remove_image: false }))
        setImagePreview(URL.createObjectURL(file))
    }

    const handleRemoveImage = () => {
        setData((prev) => ({ ...prev, image: null, remove_image: true }))
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleButtonToggle = (checked) => {
        setData((prev) => ({
            ...prev,
            has_button: checked,
            button_text: checked ? prev.button_text : '',
            button_link: checked ? prev.button_link : '',
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (isEditing) {
            post(route('admin.website.home.update', section.id), { forceFormData: true })
        } else {
            post(route('admin.website.home.store'), { forceFormData: true })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            {/* STEP 1: TEXT CONTENT */}
            <FormSection
                step="Step 1: Content"
                icon={Layout}
                title="Slide Text"
                description="Small label, main heading, gold highlighted line and description shown on the hero banner."
            >
                <div className="space-y-5">

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Subtitle <span className="font-normal text-gray-400">(Optional)</span>
                        </label>
                        <input
                            type="text"
                            value={data.subtitle}
                            onChange={(e) => setData('subtitle', e.target.value)}
                            placeholder="e.g. THE NEW COLLECTION"
                            className={inputClass}
                        />
                        <FieldError message={errors.subtitle} />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="e.g. STEP INTO YOUR"
                            className={inputClass}
                            required
                        />
                        <FieldError message={errors.title} />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Highlight Text <span className="font-normal text-gray-400">(Optional, shown in gold)</span>
                        </label>
                        <input
                            type="text"
                            value={data.highlight}
                            onChange={(e) => setData('highlight', e.target.value)}
                            placeholder="e.g. STYLE."
                            className={inputClass}
                        />
                        <FieldError message={errors.highlight} />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Description <span className="font-normal text-gray-400">(Optional)</span>
                        </label>
                        <textarea
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Write a short promotional description..."
                            className={inputClass}
                        />
                        <FieldError message={errors.description} />
                    </div>

                </div>
            </FormSection>

            {/* STEP 2: IMAGE */}
            <FormSection
                step="Step 2: Media"
                icon={ImageIcon}
                title="Background Image"
                description="Upload the full-width background image for this slide (landscape, ideally 1920×900 or larger)."
            >
                <div className="space-y-4">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Upload Image <span className="font-normal text-gray-400">(Optional)</span>
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
                                        alt="Slide Preview"
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="mt-3 flex items-center justify-between">
                                    <span className="truncate text-xs text-gray-500">
                                        {data.image?.name || 'Current uploaded image'}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="rounded-md bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            Change
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
                                        >
                                            <Trash2 size={14} />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <FieldError message={errors.image} />
                    </div>
                </div>
            </FormSection>

            {/* STEP 3: BUTTON */}
            <FormSection
                step="Step 3: Action Button"
                icon={MousePointerClick}
                title="Button Settings"
                description="Enable a call-to-action button and set where it should send visitors."
            >
                <div className="space-y-5">

                    <label className="flex max-w-md cursor-pointer items-start gap-3">
                        <input
                            type="checkbox"
                            checked={Boolean(data.has_button)}
                            onChange={(e) => handleButtonToggle(e.target.checked)}
                            className="mt-1 h-5 w-5 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700">Include Action Button</span>
                            <span className="text-sm text-gray-500">
                                Tick this to show a clickable button on this slide.
                            </span>
                        </div>
                    </label>

                    {data.has_button && (
                        <div className="mt-4 max-w-md space-y-4 rounded-lg border border-violet-100 bg-violet-50/40 p-4">

                            <div>
                                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                                    <Type size={15} className="text-violet-600" />
                                    Button Text <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.button_text}
                                    onChange={(e) => setData('button_text', e.target.value)}
                                    placeholder="e.g. EXPLORE COLLECTION"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
                                    required
                                />
                                <FieldError message={errors.button_text} />
                            </div>

                            <div>
                                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                                    <LinkIcon size={15} className="text-violet-600" />
                                    Button Link (URL) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.button_link}
                                    onChange={(e) => setData('button_link', e.target.value)}
                                    placeholder="e.g. /category or https://example.com"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
                                    required
                                />
                                <FieldError message={errors.button_link} />
                            </div>

                        </div>
                    )}

                </div>
            </FormSection>

            {/* STEP 4: ORDER + VISIBILITY */}
            <FormSection
                step="Step 4: Visibility"
                icon={Activity}
                title="Order & Status"
                description="Control the slide order and whether it is visible on the live website."
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
                                Enable to publish this slide on the storefront immediately.
                            </span>
                        </div>
                    </label>
                    <FieldError message={errors.status} />

                </div>
            </FormSection>

            {/* SUBMIT */}
            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 disabled:opacity-50"
                >
                    <Save size={18} />
                    {processing ? 'Saving...' : isEditing ? 'Update Slide' : 'Create Slide'}
                </button>
            </div>

        </form>
    )
}

export default HomeSectionForm
