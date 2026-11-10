import React from 'react'

export const inputClass =
  'w-full max-w-md rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20'

export const FieldError = ({ message }) =>
  message ? <p className="mt-1.5 text-sm text-red-600">{message}</p> : null

/** Label + input slot + hint + error, in one wrapper. */
export default function FormField({ label, required, optional, hint, error, children }) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
          {optional && <span className="font-normal text-gray-400"> (Optional)</span>}
        </label>
      )}
      {children}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      <FieldError message={error} />
    </div>
  )
}
