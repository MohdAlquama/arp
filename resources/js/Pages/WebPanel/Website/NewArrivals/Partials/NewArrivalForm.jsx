import React, { useState } from 'react'
import { useForm } from '@inertiajs/react'
import { Tag, Image as ImageIcon, IndianRupee, Activity, Save } from 'lucide-react'
import FormSection from './FormSection'
import FormField, { inputClass } from './FormField'
import ImageUploader from './ImageUploader'

export default function NewArrivalForm({ arrival = {} }) {
  const isEditing = Boolean(arrival?.id)

  const { data, setData, post, processing, errors } = useForm({
    name: arrival?.name || '',
    category_label: arrival?.category_label || '',
    href: arrival?.href || '',
    image: null,
    hover_image: null,
    remove_hover_image: false,
    price: arrival?.price ?? '',
    old_price: arrival?.old_price ?? '',
    badge: arrival?.badge || '',
    sort_order: arrival?.sort_order ?? 0,
    status: arrival?.status ?? true,
    ...(isEditing ? { _method: 'put' } : {}),
  })

  const [imagePreview, setImagePreview] = useState(arrival?.image_url || null)
  const [hoverPreview, setHoverPreview] = useState(arrival?.hover_image_url || null)

  const pickMain = (file) => {
    setData('image', file)
    setImagePreview(URL.createObjectURL(file))
  }

  const pickHover = (file) => {
    setData((prev) => ({ ...prev, hover_image: file, remove_hover_image: false }))
    setHoverPreview(URL.createObjectURL(file))
  }

  const removeHover = () => {
    setData((prev) => ({ ...prev, hover_image: null, remove_hover_image: true }))
    setHoverPreview(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const url = isEditing
      ? route('admin.website.new-arrivals.update', arrival.id)
      : route('admin.website.new-arrivals.store')

    post(url, { forceFormData: true })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* STEP 1: PRODUCT */}
      <FormSection
        step="Step 1: Product"
        icon={Tag}
        title="Product Details"
        description="Name, category label and the page this product links to."
      >
        <div className="space-y-5">
          <FormField label="Product Name" required error={errors.name}>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              placeholder="e.g. Air Runner Pro"
              className={inputClass}
              required
            />
          </FormField>

          <FormField label="Category Label" optional error={errors.category_label}>
            <input
              type="text"
              value={data.category_label}
              onChange={(e) => setData('category_label', e.target.value)}
              placeholder="e.g. SPORTS SHOES"
              className={inputClass}
            />
          </FormField>

          <FormField label="Product Link (URL)" required error={errors.href}>
            <input
              type="text"
              value={data.href}
              onChange={(e) => setData('href', e.target.value)}
              placeholder="e.g. /product/air-runner-pro"
              className={inputClass}
              required
            />
          </FormField>
        </div>
      </FormSection>

      {/* STEP 2: IMAGES */}
      <FormSection
        step="Step 2: Media"
        icon={ImageIcon}
        title="Product Images"
        description="Square images look best. The hover image (optional) swaps in when a visitor hovers the card."
      >
        <div className="space-y-8">
          <FormField label="Main Image" required={!isEditing} error={errors.image}>
            <ImageUploader
              preview={imagePreview}
              fileName={data.image?.name}
              onChange={pickMain}
            />
          </FormField>

          <FormField label="Hover Image" optional error={errors.hover_image}>
            <ImageUploader
              preview={hoverPreview}
              fileName={data.hover_image?.name}
              onChange={pickHover}
              onRemove={hoverPreview ? removeHover : undefined}
            />
          </FormField>
        </div>
      </FormSection>

      {/* STEP 3: PRICING */}
      <FormSection
        step="Step 3: Pricing"
        icon={IndianRupee}
        title="Price & Badge"
        description="Add an old price to show a strike-through and an automatic discount %."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Selling Price (₹)" required error={errors.price}>
            <input
              type="number"
              min="0"
              step="0.01"
              value={data.price}
              onChange={(e) => setData('price', e.target.value)}
              placeholder="1999"
              className={inputClass}
              required
            />
          </FormField>

          <FormField
            label="Old Price (₹)"
            optional
            hint="Must be higher than the selling price."
            error={errors.old_price}
          >
            <input
              type="number"
              min="0"
              step="0.01"
              value={data.old_price}
              onChange={(e) => setData('old_price', e.target.value)}
              placeholder="2999"
              className={inputClass}
            />
          </FormField>

          <FormField label="Badge" optional hint="Small label on the image, e.g. NEW, HOT, LIMITED." error={errors.badge}>
            <input
              type="text"
              value={data.badge}
              onChange={(e) => setData('badge', e.target.value)}
              placeholder="NEW"
              maxLength={30}
              className={inputClass}
            />
          </FormField>
        </div>
      </FormSection>

      {/* STEP 4: VISIBILITY */}
      <FormSection
        step="Step 4: Visibility"
        icon={Activity}
        title="Order & Status"
        description="Lowest order number appears first on the home page."
      >
        <div className="space-y-6">
          <FormField label="Display Order" hint="Smaller number shows first." error={errors.sort_order}>
            <input
              type="number"
              min="0"
              value={data.sort_order}
              onChange={(e) => setData('sort_order', e.target.value)}
              className="w-32 rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
            />
          </FormField>

          <FormField error={errors.status}>
            <label className="flex max-w-md cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={Boolean(data.status)}
                onChange={(e) => setData('status', e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">Show on Home Page</span>
                <span className="text-sm text-gray-500">Enable to publish this product on the storefront.</span>
              </div>
            </label>
          </FormField>
        </div>
      </FormSection>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={processing}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 disabled:opacity-50"
        >
          <Save size={18} />
          {processing ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  )
}
