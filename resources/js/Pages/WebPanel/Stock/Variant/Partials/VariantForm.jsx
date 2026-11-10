import React, { useEffect } from "react";
import { useForm, Link } from "@inertiajs/react";
import { Layers, Box, Tag, Plus, Trash2 } from "lucide-react";
import SearchableSelect from "./Searchableselect";

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
);

const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20";

const Label = ({ children, required = true }) => (
    <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {children} {required && <span className="text-red-500">*</span>}
    </label>
);

const FieldError = ({ message }) =>
    message ? <p className="mt-1.5 text-sm text-red-600">{message}</p> : null;

const STATUS_OPTIONS = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
];

const OptionField = ({ value, onChange, options = [], placeholder }) => {
    const safeOptions = Array.isArray(options) ? options : [];
    const formattedOptions = safeOptions.map((o) => ({
        value: o.id,
        label: o.name,
    }));

    return (
        <SearchableSelect
            value={value}
            onChange={onChange}
            options={formattedOptions}
            placeholder={placeholder}
            searchPlaceholder={`Search ${placeholder.toLowerCase()}...`}
        />
    );
};

export const SizeCheckboxes = ({ sizes, selectedIds, onChange }) => {
    const allSelected = sizes.length > 0 && selectedIds.length === sizes.length;

    return (
        <div className="rounded-lg border border-gray-200 bg-white">
            <label className="flex cursor-pointer items-center gap-2 border-b border-gray-100 px-3 py-2.5 text-sm font-medium text-violet-700">
                <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => onChange(allSelected ? [] : sizes.map((size) => size.id))}
                    className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                Select all sizes
            </label>
            <div className="grid max-h-56 grid-cols-2 gap-1 overflow-y-auto p-2 sm:grid-cols-3">
                {sizes.map((size) => {
                    const checked = selectedIds.some((id) => String(id) === String(size.id));

                    return (
                        <label key={size.id} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-violet-50">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={(event) => onChange(
                                    event.target.checked
                                        ? [...selectedIds, size.id]
                                        : selectedIds.filter((id) => String(id) !== String(size.id))
                                )}
                                className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                            />
                            {size.name}
                        </label>
                    );
                })}
                {sizes.length === 0 && (
                    <p className="col-span-full px-2 py-3 text-sm text-gray-500">No active sizes available.</p>
                )}
            </div>
        </div>
    );
};

export default function VariantForm({
    variant = null,
    categories = [],
    subCategories = [],
    colors = [],
    sizes = [],
    materials = [],
}) {
    const isEditing = Boolean(variant?.id);

    const buildFormState = (v) => ({
        article_no: v?.article_no ?? "",
        default_name: v?.default_name ?? "",
        category_id: v?.category_id ?? "",
        sub_category_id: v?.sub_category_id ?? "",
        material_id: v?.material_id ?? "",
        status: v?.status ?? "active",
        attributes: v?.attributes?.length
            ? v.attributes.map((a) => ({
                  color_id: a.color_id ?? "",
                  size_ids: a.size_ids ?? (a.size_id ? [a.size_id] : []),
              }))
            : [{ color_id: "", size_ids: [] }],
    });

    const { data, setData, post, put, processing, errors } = useForm(
        buildFormState(variant)
    );

    // Sync state when `variant` loads via <Deferred>
    useEffect(() => {
        if (variant?.id) {
            setData(buildFormState(variant));
        }
    }, [variant?.id]);

    const safeCategories = Array.isArray(categories) ? categories : [];
    const safeSubCategories = Array.isArray(subCategories) ? subCategories : [];
    const safeMaterials = Array.isArray(materials) ? materials : [];
    const safeColors = Array.isArray(colors) ? colors : [];
    const safeSizes = Array.isArray(sizes) ? sizes : [];

    const categoryOptions = safeCategories.map((c) => ({
        value: c.id,
        label: c.name,
    }));

    const subCategoryOptions = safeSubCategories
        .filter((sub) => String(sub.category_id) === String(data.category_id))
        .map((sub) => ({ value: sub.id, label: sub.name }));

    const materialOptions = safeMaterials.map((m) => ({
        value: m.id,
        label: m.material_name,
    }));

    // --- Dynamic attribute handlers (works on both Create and Edit) ---
    const addAttribute = () =>
        setData("attributes", [...data.attributes, { color_id: "", size_ids: [] }]);

    const removeAttribute = (indexToRemove) => {
        if (data.attributes.length === 1) {
            setData("attributes", [{ color_id: "", size_ids: [] }]);
            return;
        }
        setData(
            "attributes",
            data.attributes.filter((_, index) => index !== indexToRemove)
        );
    };

    const handleColorChange = (index, value) =>
        setData(
            "attributes",
            data.attributes.map((attr, i) =>
                i === index ? { ...attr, color_id: value ?? "", size_ids: [] } : attr
            )
        );

    const handleSizesChange = (index, sizeIds) =>
        setData(
            "attributes",
            data.attributes.map((attr, i) =>
                i === index ? { ...attr, size_ids: sizeIds } : attr
            )
        );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route("admin.stock.variant.update", variant.id), {
                preserveScroll: true,
            });
        } else {
            post(route("admin.stock.variant.store"), {
                preserveScroll: true,
            });
        }
    };

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            {/* STEP 1: BASIC DETAILS */}
            <FormSection
                step="Step 1: Basic Info"
                icon={Box}
                title="Product Information"
                description="Enter the primary details identifying this footwear model."
            >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <Label>Article No</Label>
                        <input
                            type="text"
                            value={data.article_no}
                            onChange={(e) => setData("article_no", e.target.value)}
                            placeholder="e.g. ART-1029"
                            className={inputClass}
                            required
                        />
                        <FieldError message={errors.article_no} />
                    </div>

                    <div>
                        <Label>Default Name</Label>
                        <input
                            type="text"
                            value={data.default_name}
                            onChange={(e) => setData("default_name", e.target.value)}
                            placeholder="e.g. Classic Running Sneaker"
                            className={inputClass}
                            required
                        />
                        <FieldError message={errors.default_name} />
                    </div>

                    <div>
                        <Label>Material Type</Label>
                        <SearchableSelect
                            value={data.material_id}
                            onChange={(val) => setData("material_id", val ?? "")}
                            options={materialOptions}
                            placeholder="Select Material Type"
                            searchPlaceholder="Search material types..."
                            required
                        />
                        <FieldError message={errors.material_id} />
                    </div>

                    <div>
                        <Label>Status</Label>
                        <select
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            className={inputClass}
                            required
                        >
                            {STATUS_OPTIONS.map((s) => (
                                <option key={s.value} value={s.value}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                        <FieldError message={errors.status} />
                    </div>
                </div>
            </FormSection>

            {/* STEP 2: CLASSIFICATION */}
            <FormSection
                step="Step 2: Classification"
                icon={Layers}
                title="Category & Sub Category"
                description="Select where this product belongs in your catalog hierarchy."
            >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <Label>Select Category</Label>
                        <SearchableSelect
                            value={data.category_id}
                            onChange={(val) =>
                                setData((prev) => ({
                                    ...prev,
                                    category_id: val ?? "",
                                    sub_category_id: "",
                                }))
                            }
                            options={categoryOptions}
                            placeholder="Select Category"
                            searchPlaceholder="Search categories..."
                            required
                        />
                        <FieldError message={errors.category_id} />
                    </div>

                    <div>
                        <Label>Select Sub Category</Label>
                        <SearchableSelect
                            value={data.sub_category_id}
                            onChange={(val) => setData("sub_category_id", val ?? "")}
                            options={subCategoryOptions}
                            placeholder="Select Sub Category"
                            searchPlaceholder="Search sub categories..."
                            disabled={!data.category_id}
                            required
                        />
                        <FieldError message={errors.sub_category_id} />
                    </div>
                </div>
            </FormSection>

            {/* STEP 3: ATTRIBUTES */}
            <FormSection
                step="Step 3: Variations"
                icon={Tag}
                title="Color & Size Attributes"
                description="Add or remove multiple color and size combinations for this footwear."
            >
                <div className="space-y-4">
                    {data.attributes.map((attribute, index) => (
                        <div
                            key={attribute.color_id || index}
                            className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4"
                        >
                            <div className="flex items-end gap-3">
                                <div className="flex-1">
                                    <Label required={false}>Color</Label>
                                    <OptionField
                                        value={attribute.color_id}
                                        onChange={(value) => handleColorChange(index, value)}
                                        options={safeColors.filter((color) =>
                                            !data.attributes.some((selected, selectedIndex) =>
                                                selectedIndex !== index && String(selected.color_id) === String(color.id)
                                            )
                                        )}
                                        placeholder="Select Color"
                                    />
                                    <FieldError message={errors[`attributes.${index}.color_id`]} />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeAttribute(index)}
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 hover:text-red-700"
                                    title="Remove color group"
                                    aria-label="Remove color group"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div>
                                <Label required={false}>Sizes for this color</Label>
                                <SizeCheckboxes
                                    sizes={safeSizes}
                                    selectedIds={attribute.size_ids}
                                    onChange={(sizeIds) => handleSizesChange(index, sizeIds)}
                                />
                                <FieldError message={errors[`attributes.${index}.size_ids`]} />
                                {attribute.size_ids.length > 0 && (
                                    <p className="mt-2 text-xs text-gray-500">
                                        {attribute.size_ids.length} size{attribute.size_ids.length === 1 ? "" : "s"} selected
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="pt-2">
                        <button
                            type="button"
                            onClick={addAttribute}
                            className="flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-100"
                        >
                            <Plus size={16} />
                            Add Another Variation
                        </button>
                    </div>

                    <FieldError message={errors.attributes} />
                    <FieldError message={errors.error} />
                </div>
            </FormSection>

            {/* ACTIONS */}
            <div className="flex items-center justify-end gap-3">
                <Link
                    href={route("admin.stock.variant.index")}
                    className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60"
                >
                    {processing
                        ? "Saving..."
                        : isEditing
                        ? "Update Variant"
                        : "Create Variant"}
                </button>
            </div>
        </form>
    );
}
