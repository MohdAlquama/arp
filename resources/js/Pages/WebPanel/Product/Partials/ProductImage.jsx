import React, { useEffect, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";

export default function ProductImage({
    value,
    existingImage,
    onChange,
    onRemove,
    error,
}) {
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (value instanceof File) {
            const url = URL.createObjectURL(value);
            setPreview(url);

            return () => URL.revokeObjectURL(url);
        }

        setPreview(existingImage || "");
    }, [value, existingImage]);

    const handleChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            e.target.value = "";
            return;
        }

        onChange(file);
        e.target.value = "";
    };

    return (
        <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Product Preview"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <ImagePlus size={32} className="text-gray-400" />
                    )}
                </div>

                <div className="space-y-2">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700">
                        <ImagePlus size={16} />
                        {preview ? "Change Image" : "Upload Product Image"}

                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={handleChange}
                        />
                    </label>

                    {preview && (
                        <button
                            type="button"
                            onClick={onRemove}
                            className="ml-2 inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                            <Trash2 size={15} />
                            Remove
                        </button>
                    )}

                    <p className="text-xs text-gray-500">
                        Supported formats: JPG, PNG, WEBP.
                    </p>
                </div>
            </div>

            {error && (
                <p className="mt-2 text-xs text-red-600">{error}</p>
            )}
        </div>
    );
}