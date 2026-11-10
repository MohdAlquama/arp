import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function ProductWebsiteVisibility({ label, description, value, onChange }) {
    const isVisible = Boolean(value);

    return (
        <div className="flex flex-col justify-between gap-4 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
                <div className={`rounded-lg p-2 ${isVisible ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-800">{label}</h3>
                    <p className="mt-1 text-xs text-gray-500">{description}</p>
                </div>
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={isVisible}
                onClick={() => onChange(!isVisible)}
                className={`inline-flex min-w-20 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${isVisible ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
                {isVisible ? 'Yes' : 'No'}
            </button>
        </div>
    );
}
