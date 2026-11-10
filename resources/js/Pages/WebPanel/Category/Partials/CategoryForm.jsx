import React, { useEffect } from 'react'
import { useForm, Link } from '@inertiajs/react'
import { 
  FolderEdit, 
  LayoutGrid, 
  List, 
  Columns, 
  PanelTop, 
  CheckCircle2, 
  EyeOff,
  Activity,
  Archive
} from 'lucide-react'

// Reusable Layout Wrapper
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

export default function CategoryForm({ category = null, isEdit = false }) {
  // Initialize Inertia form state
  const { data, setData, post, transform, processing, errors } = useForm({
    name: category?.name || '',
    page_title: category?.page_title || '',
    page_description: category?.page_description || '',
    banner_image: null,
    ui_id: category?.ui_id || '',
    show_in_header: category?.show_in_header ?? true,
    status: category?.status || 'active', 
  })

  // Sync data whenever category prop changes (vital for deferred or async props)
  useEffect(() => {
    if (category && isEdit) {
      setData({
        name: category.name || '',
        page_title: category.page_title || '',
        page_description: category.page_description || '',
        banner_image: null,
        ui_id: category.ui_id || '',
        show_in_header: Boolean(category.show_in_header),
        status: category.status || 'active',
      })
    }
  }, [category, isEdit])

  const updateField = (field, value) => setData(field, value)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isEdit && category?.id) {
      transform((payload) => ({ ...payload, _method: 'put' }))
      post(route('admin.website.category.update', category.id), { forceFormData: true })
    } else {
      transform((payload) => payload)
      post(route('admin.website.category.store'), { forceFormData: true })
    }
  }

  // UI layout options mapped to database IDs
  const uiOptions = [
    { id: 1, label: 'Standard Grid', Icon: LayoutGrid },
    { id: 2, label: 'Detailed List', Icon: List },
    { id: 3, label: 'Image Carousel', Icon: Columns }
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* STEP 1: IDENTITY */}
      <FormSection 
        step="Step 1: Identity" 
        icon={FolderEdit} 
        title="Category Name" 
        description="Enter the primary display name (e.g., Kids, Men, Women)."
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="e.g. Men's Footwear"
            className={`w-full max-w-md rounded-lg border px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 ${
              errors.name 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-300 focus:border-violet-600 focus:ring-violet-600/20'
            }`}
            required
          />
          {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
        </div>
      </FormSection>

      <hr className="border-gray-200" />

      <FormSection
        step="Page Design"
        icon={PanelTop}
        title="Category Page Content"
        description="Customize this main category's banner and introduction. Subcategory pages use the shared website layout."
      >
        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Page heading</label>
            <input
              type="text"
              value={data.page_title}
              onChange={(event) => updateField('page_title', event.target.value)}
              placeholder={data.name || 'Use category name'}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
            />
            {errors.page_title && <p className="mt-1.5 text-sm text-red-600">{errors.page_title}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Page introduction</label>
            <textarea
              rows={4}
              maxLength={5000}
              value={data.page_description}
              onChange={(event) => updateField('page_description', event.target.value)}
              placeholder="Add a short description shown at the top of this category page."
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
            />
            {errors.page_description && <p className="mt-1.5 text-sm text-red-600">{errors.page_description}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Banner image</label>
            {category?.banner_image_url && !data.banner_image && (
              <img src={category.banner_image_url} alt="Current category banner" className="mb-3 h-36 w-full max-w-xl rounded-lg object-cover" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(event) => updateField('banner_image', event.target.files?.[0] || null)}
              className="block w-full max-w-xl text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:font-medium file:text-violet-700 hover:file:bg-violet-100"
            />
            {errors.banner_image && <p className="mt-1.5 text-sm text-red-600">{errors.banner_image}</p>}
          </div>
        </div>
      </FormSection>

      <hr className="border-gray-200" />

      {/* STEP 2: HEADER VISIBILITY */}
      <FormSection 
        step="Step 2: Header Placement" 
        icon={PanelTop} 
        title="Display in Header?" 
        description="Choose if this category appears in the main top navigation bar."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[ 
            { label: 'Yes, show in Header', desc: 'Visible in top menu.', val: true, Icon: CheckCircle2 },
            { label: 'No, keep it hidden', desc: 'Hidden from top menu.', val: false, Icon: EyeOff }
          ].map((opt) => (
            <div
              key={String(opt.val)}
              onClick={() => {
                updateField('show_in_header', opt.val)
              }}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                data.show_in_header === opt.val
                  ? 'border-violet-600 bg-violet-50/60 ring-2 ring-violet-600/20'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className={`rounded-lg p-2 ${data.show_in_header === opt.val ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                <opt.Icon size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{opt.label}</h3>
                <p className="mt-1 text-xs text-gray-500">{opt.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {errors.show_in_header && <p className="mt-2 text-sm text-red-600">{errors.show_in_header}</p>}
      </FormSection>

      {/* STEP 3: UI LAYOUT */}
      <>
          <hr className="border-gray-200" />
          <FormSection
            step="Step 3: UI Layout"
            icon={LayoutGrid}
            title="Select UI Component"
            description="Choose how products in this category are displayed on the website."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {uiOptions.map((ui) => (
                <button
                  key={ui.id}
                  type="button"
                  onClick={() => updateField('ui_id', ui.id)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-4 transition ${
                    Number(data.ui_id) === ui.id
                      ? 'border-violet-600 bg-violet-50 text-violet-700 ring-1 ring-violet-600'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ui.Icon size={24} />
                  <span className="text-sm font-medium">{ui.label}</span>
                  <span className="text-xs opacity-70">ID: {ui.id}</span>
                </button>
              ))}
            </div>
            {errors.ui_id && <p className="mt-2 text-sm text-red-600">{errors.ui_id}</p>}
          </FormSection>
      </>

      <hr className="border-gray-200" />

      {/* STEP 4: STATUS */}
      <FormSection 
        step="Step 4: Status" 
        icon={Activity} 
        title="Category Status" 
        description="Determine if this category should be live on your website."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[ 
            { id: 'active', label: 'Active (Published)', desc: 'Customers can see this.', Icon: CheckCircle2, activeClass: 'border-green-600 bg-green-50/60 ring-green-600/20', iconClass: 'bg-green-600 text-white' },
            { id: 'draft', label: 'Draft (Hidden)', desc: 'Saved but not visible.', Icon: Archive, activeClass: 'border-amber-600 bg-amber-50/60 ring-amber-600/20', iconClass: 'bg-amber-600 text-white' }
          ].map((opt) => (
            <div
              key={opt.id}
              onClick={() => updateField('status', opt.id)}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                data.status === opt.id
                  ? `${opt.activeClass} ring-2`
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className={`rounded-lg p-2 ${data.status === opt.id ? opt.iconClass : 'bg-gray-100 text-gray-600'}`}>
                <opt.Icon size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{opt.label}</h3>
                <p className="mt-1 text-xs text-gray-500">{opt.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {errors.status && <p className="mt-2 text-sm text-red-600">{errors.status}</p>}
      </FormSection>
          
      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-5">
        <Link
          href={route('admin.website.category.index')}
          className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={processing}
          className="rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {processing ? 'Saving...' : (isEdit ? 'Update Category' : 'Save Category')}
        </button>
      </div>
    </form>
  )
}
