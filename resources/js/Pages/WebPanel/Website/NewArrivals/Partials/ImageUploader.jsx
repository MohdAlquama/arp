import React, { useRef } from 'react'
import { Upload } from 'lucide-react'

/**
 * Click-to-upload box with preview.
 * Props:
 *  - preview:   url to show (existing image or blob url)
 *  - fileName:  name of newly picked file (optional)
 *  - onChange:  (file) => void
 *  - onRemove:  optional, shows a "Remove" button when given
 */
export default function ImageUploader({
  preview,
  fileName,
  onChange,
  onRemove,
  hint = 'PNG, JPG, or WEBP (Max 4MB)',
  aspect = 'aspect-square',
}) {
  const inputRef = useRef(null)

  const handlePick = (event) => {
    const file = event.target.files?.[0]
    if (file) onChange(file)
    event.target.value = '' // allow re-picking the same file
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={handlePick}
        className="hidden"
      />

      {!preview ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="flex max-w-md cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 px-6 py-8 text-center transition hover:border-violet-500 hover:bg-violet-50/30"
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600">
            <Upload size={20} />
          </div>
          <p className="text-sm font-medium text-gray-700">Click to upload an image</p>
          <p className="mt-1 text-xs text-gray-500">{hint}</p>
        </div>
      ) : (
        <div className="max-w-xs overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-3">
          <div className={`relative w-full overflow-hidden rounded-lg bg-gray-200 ${aspect}`}>
            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="truncate text-xs text-gray-500">{fileName || 'Current uploaded image'}</span>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-md bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Change
              </button>
              {onRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  className="rounded-md bg-white px-2.5 py-1.5 text-xs font-medium text-red-600 shadow-sm ring-1 ring-inset ring-red-200 hover:bg-red-50"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
