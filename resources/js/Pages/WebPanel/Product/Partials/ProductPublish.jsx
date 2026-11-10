import React from "react";
import { Globe, Eye, EyeOff } from "lucide-react";

export default function ProductPublish({ value, onChange }) {
    const published = Boolean(value);

    return (
        <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                        <Globe size={20} />
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">
                            Product Publish
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                            Control whether this product is visible on your website.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => onChange(!published)}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        published
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                    {published ? <Eye size={16} /> : <EyeOff size={16} />}

                    {published ? "Published" : "Unpublished"}
                </button>
            </div>
        </div>
    );
}