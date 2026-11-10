import React from "react";
import { ImagePlus, Trash2, Package, CheckCircle2 } from "lucide-react";

const FieldError = ({ message }) =>
    message ? <p className="mt-1 text-xs text-red-600">{message}</p> : null;

export default function VariantTable({
    variations = [],
    imagePreviews = {},
    errors = {},
    onColorImageUpload,
    onRemoveColorImage,
}) {
    const colorGroups = Array.from(
        variations.reduce((groups, variation, index) => {
            const key = String(variation.color_id ?? "unknown");
            if (!groups.has(key)) {
                groups.set(key, {
                    key,
                    colorId: variation.color_id,
                    colorName: variation.color_name,
                    colorHex: variation.color_hex,
                    sizes: [],
                });
            }

            groups.get(key).sizes.push({ ...variation, index });
            return groups;
        }, new Map()).values()
    );

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="text-sm font-semibold text-gray-800">Variant Management</h3>
                    <p className="mt-1 text-xs text-gray-500">Upload one image for each color. It will be used for every size in that color.</p>
                </div>
                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                    {colorGroups.length} colors · {variations.length} sizes
                </span>
            </div>

            {colorGroups.length > 0 ? (
                <div className="space-y-4">
                    {colorGroups.map((group) => {
                        const firstVariation = group.sizes[0];
                        const preview = imagePreviews[group.key] || firstVariation.existing_image_url;
                        const isUploadedFile = firstVariation.image instanceof File;

                        return (
                            <section key={group.key} className="rounded-xl border border-gray-200 bg-white p-4">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="h-8 w-8 shrink-0 rounded-full border border-gray-300 shadow-inner"
                                                style={{ backgroundColor: group.colorHex || "#e5e7eb" }}
                                                title={group.colorHex || "No hex code"}
                                            />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{group.colorName || "Color"}</h4>
                                                <p className="font-mono text-xs uppercase text-gray-400">{group.colorHex || "No hex code"}</p>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Sizes in this color</p>
                                            <div className="flex flex-wrap gap-2">
                                                {group.sizes.map((size) => (
                                                    <span key={`${group.key}-${size.size_id}`} className="rounded-md bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                                                        {size.size_name || "Size"}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 sm:w-64">
                                        {preview ? (
                                            <img src={preview} alt={`${group.colorName || "Color"} product`} className="h-16 w-16 shrink-0 rounded-lg border object-cover" />
                                        ) : (
                                            <label className="flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-600">
                                                <ImagePlus size={22} />
                                                <input
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/webp"
                                                    className="hidden"
                                                    onChange={(event) => {
                                                        onColorImageUpload(group.colorId, event.target.files?.[0]);
                                                        event.target.value = "";
                                                    }}
                                                />
                                            </label>
                                        )}

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-xs font-medium text-gray-700">
                                                {isUploadedFile ? firstVariation.image.name : preview ? "Color image uploaded" : "No image uploaded"}
                                            </p>
                                            <p className="text-xs text-gray-400">JPG, PNG, WEBP</p>
                                            <div className="mt-1 flex items-center gap-3">
                                                <label className="cursor-pointer text-xs font-medium text-violet-600 hover:text-violet-800">
                                                    {preview ? "Change image" : "Upload image"}
                                                    <input
                                                        type="file"
                                                        accept="image/jpeg,image/png,image/webp"
                                                        className="hidden"
                                                        onChange={(event) => {
                                                            onColorImageUpload(group.colorId, event.target.files?.[0]);
                                                            event.target.value = "";
                                                        }}
                                                    />
                                                </label>
                                                {preview && (
                                                    <button type="button" onClick={() => onRemoveColorImage(group.colorId)} className="text-xs font-medium text-red-600 hover:text-red-700">
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            <FieldError message={errors[`variations.${firstVariation.index}.image`]} />
                                        </div>
                                        {preview && <CheckCircle2 size={18} className="shrink-0 text-green-600" />}
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-12 text-center">
                    <Package size={35} className="mx-auto mb-3 text-gray-300" />
                    <p className="text-sm font-medium text-gray-600">No Variations Found</p>
                    <p className="mt-1 text-xs text-gray-400">Select an article to load its colors and sizes.</p>
                </div>
            )}

            <FieldError message={errors.variations} />
        </div>
    );
}
