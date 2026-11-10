import React, { useEffect, useRef, useState } from "react";
import { useForm, Link } from "@inertiajs/react";

import {
    Box,
    Layers,
    ImagePlus,
    Megaphone,
    Globe,
    Eye,
    FileText,
} from "lucide-react";

import SearchableSelect from "./Searchableselect";
import FormSection from "./FormSection";
import VariantTable from "./VariantTable";
import ProductPromotional from "./ProductPromotional";
import ProductImage from "./ProductImage";
import ProductPublish from "./ProductPublish";
import ProductDisplay from "./ProductDisplay";
import ProductWebsiteVisibility from "./ProductWebsiteVisibility";

const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20";

const Label = ({ children }) => (
    <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {children}
    </label>
);

const FieldError = ({ message }) =>
    message ? (
        <p className="mt-1.5 text-sm text-red-600">{message}</p>
    ) : null;

export default function ProductForm({
    variants = [],
    product = null,
}) {
    const isEditing = Boolean(product?.id);

    const [imagePreviews, setImagePreviews] = useState({});
    const previewUrls = useRef([]);

    const {
        data,
        setData,
        post,
        transform,
        processing,
        errors,
    } = useForm({
        variant_id: product?.variant_id ?? "",

        article_no: product?.article_no ?? "",
        default_name: product?.default_name ?? "",

        category_name: product?.category_name ?? "",
        sub_category_name: product?.sub_category_name ?? "",
        material_name: product?.material_name ?? "",

        // Step 7: website display
        display_name: product?.display_name ?? "",
        mrp: product?.mrp ?? "",
        color_display: product?.color_display ?? "both",

        // Main product image
        product_image: null,
        remove_product_image: false,

        // Product promotional
        is_promotional: Boolean(product?.is_promotional ?? false),

        // Product publish
        is_published: Boolean(product?.is_published ?? false),
        is_variant_table_visible: Boolean(product?.is_variant_table_visible ?? true),
        description: product?.description ?? "",
        is_description_visible: Boolean(product?.is_description_visible ?? true),

        // Color and size variations
        variations:
            product?.variations?.map((item) => ({
                color_id: item.color_id ?? "",
                color_name: item.color_name ?? "",
                color_hex: item.color_hex ?? "",
                size_id: item.size_id ?? "",
                size_name: item.size_name ?? "",

                image: null,
                existing_image_url:
                    item.image_url ??
                    (typeof item.image === "string" ? item.image : ""),

                remove_image: false,
            })) ?? [],
    });

    // Cleanup preview URLs
    useEffect(() => {
        return () => {
            previewUrls.current.forEach((url) => {
                URL.revokeObjectURL(url);
            });
        };
    }, []);

    // Variant dropdown options
    const variantOptions = variants.map((variant) => ({
        value: variant.id,
        label: `${variant.article_no} - ${variant.default_name}`,
    }));

    // Select article / variant
    const handleVariantChange = (id) => {
        const selectedVariant = variants.find(
            (variant) => String(variant.id) === String(id)
        );

        if (!selectedVariant) return;

        setImagePreviews({});

        const variations = (
            selectedVariant.attribute_pairs ?? []
        ).map((item) => ({
            color_id: item.color_id ?? "",
            color_name: item.color_name ?? "",
            color_hex: item.color_hex ?? "",
            size_id: item.size_id ?? "",
            size_name: item.size_name ?? "",

            image: null,
            existing_image_url: "",
            remove_image: false,
        }));

        setData((prev) => ({
            ...prev,

            variant_id: selectedVariant.id,

            article_no: selectedVariant.article_no ?? "",
            default_name: selectedVariant.default_name ?? "",

            category_name: selectedVariant.category_name ?? "",
            sub_category_name:
                selectedVariant.sub_category_name ?? "",
            material_name: selectedVariant.material_name ?? "",

            // Pre-fill the website name unless the user already typed their own
            display_name:
                !prev.display_name ||
                prev.display_name === prev.default_name
                    ? selectedVariant.default_name ?? ""
                    : prev.display_name,

            variations,
        }));
    };

    // One image is shared by every size variation of a color.
    const handleColorImageUpload = (colorId, file) => {
        if (!file) return;

        if (!file.type.startsWith("image/")) return;

        const preview = URL.createObjectURL(file);
        previewUrls.current.push(preview);
        const firstIndex = data.variations.findIndex(
            (item) => String(item.color_id) === String(colorId)
        );

        setData(
            "variations",
            data.variations.map((item, i) =>
                i === firstIndex
                    ? {
                          ...item,
                          image: file,
                          remove_image: false,
                      }
                    : item
            )
        );

        setImagePreviews((prev) => ({
            ...prev,
            [colorId]: preview,
        }));
    };

    const removeColorImage = (colorId) => {
        const firstIndex = data.variations.findIndex(
            (item) => String(item.color_id) === String(colorId)
        );

        setData(
            "variations",
            data.variations.map((item, i) =>
                String(item.color_id) === String(colorId)
                    ? {
                          ...item,
                          image: null,
                          existing_image_url: "",
                          remove_image: i === firstIndex,
                      }
                    : item
            )
        );

        setImagePreviews((prev) => {
            const updated = { ...prev };
            delete updated[colorId];
            return updated;
        });
    };

    // Upload main product image
    const handleProductImageChange = (file) => {
        setData((prev) => ({
            ...prev,
            product_image: file,
            remove_product_image: false,
        }));
    };

    // Remove main product image
    const handleProductImageRemove = () => {
        setData((prev) => ({
            ...prev,
            product_image: null,
            remove_product_image: true,
        }));
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            forceFormData: true,
            preserveScroll: true,
        };

        if (isEditing) {
            // PHP can't read multipart on PUT, so POST + method spoofing
            transform((payload) => ({ ...payload, _method: "put" }));

            post(
                route("admin.stock.product.update", product.id),
                options
            );
        } else {
            transform((payload) => payload);

            post(
                route("admin.stock.product.store"),
                options
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            {/* STEP 1: ARTICLE SELECTION */}

            <FormSection
                step="Step 1: Article Selection"
                icon={Box}
                title="Select Article"
                description={
                    isEditing
                        ? "The article cannot be changed after the product is created."
                        : "Select an article from your variant master to fetch product information."
                }
            >
                <div>
                    <Label>Select Article</Label>

                    <SearchableSelect
                        value={data.variant_id}
                        onChange={handleVariantChange}
                        options={variantOptions}
                        placeholder="Select Article"
                        searchPlaceholder="Search article number..."
                        disabled={isEditing}
                    />

                    <FieldError message={errors.variant_id} />
                </div>
            </FormSection>

            {/* STEP 2: PRODUCT INFORMATION */}

            <FormSection
                step="Step 2: Product Details"
                icon={Layers}
                title="Product Information"
                description="Selected article information will automatically appear here."
            >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    <div>
                        <Label>Article Number</Label>

                        <input
                            type="text"
                            value={data.article_no}
                            readOnly
                            placeholder="Article Number"
                            className={`${inputClass} bg-gray-50`}
                        />
                    </div>

                    <div>
                        <Label>Product Name</Label>

                        <input
                            type="text"
                            value={data.default_name}
                            readOnly
                            placeholder="Product Name"
                            className={`${inputClass} bg-gray-50`}
                        />
                    </div>

                    <div>
                        <Label>Category</Label>

                        <input
                            type="text"
                            value={data.category_name}
                            readOnly
                            placeholder="Category"
                            className={`${inputClass} bg-gray-50`}
                        />
                    </div>

                    <div>
                        <Label>Sub Category</Label>

                        <input
                            type="text"
                            value={data.sub_category_name}
                            readOnly
                            placeholder="Sub Category"
                            className={`${inputClass} bg-gray-50`}
                        />
                    </div>

                    <div>
                        <Label>Material</Label>

                        <input
                            type="text"
                            value={data.material_name}
                            readOnly
                            placeholder="Material"
                            className={`${inputClass} bg-gray-50`}
                        />
                    </div>

                </div>
            </FormSection>

            {/* STEP 3: VARIANT TABLE */}

            <FormSection
                step="Step 3: Variant Management"
                icon={Layers}
                title="Variant Table"
                description="Manage color and size combinations and upload individual variation images."
            >
                <VariantTable
                    variations={data.variations}
                    imagePreviews={imagePreviews}
                    errors={errors}
                    onColorImageUpload={handleColorImageUpload}
                    onRemoveColorImage={removeColorImage}
                />
            </FormSection>

            {/* STEP 4: PRODUCT IMAGE */}

            <FormSection
                step="Step 4: Product Image"
                icon={ImagePlus}
                title="Main Product Image"
                description="Upload the main image that represents this product."
            >
                <ProductImage
                    value={data.product_image}
                    existingImage={
                        data.remove_product_image
                            ? ""
                            : product?.image_url ?? ""
                    }
                    onChange={handleProductImageChange}
                    onRemove={handleProductImageRemove}
                    error={errors.product_image}
                />
            </FormSection>

            {/* STEP 5: PROMOTIONAL */}

            <FormSection
                step="Step 5: Promotional"
                icon={Megaphone}
                title="Product Promotional"
                description="Choose whether this product should be marked as promotional."
            >
                <ProductPromotional
                    value={data.is_promotional}
                    onChange={(value) =>
                        setData("is_promotional", value)
                    }
                />

                <FieldError message={errors.is_promotional} />
            </FormSection>

            {/* STEP 6: PUBLISH */}

            <FormSection
                step="Step 6: Publish"
                icon={Globe}
                title="Product Publish"
                description="Control the product visibility on your website."
            >
                <ProductPublish
                    value={data.is_published}
                    onChange={(value) =>
                        setData("is_published", value)
                    }
                />

                <FieldError message={errors.is_published} />
            </FormSection>

            {/* STEP 7: WEBSITE DISPLAY */}

            <FormSection
                step="Step 7: Website Display"
                icon={Eye}
                title="Name & Colour Display"
                description="Choose the name and how the colours are shown to customers on the website."
            >
                <ProductDisplay
                    displayName={data.display_name}
                    colorDisplay={data.color_display}
                    variations={data.variations}
                    onNameChange={(value) =>
                        setData("display_name", value)
                    }
                    onColorDisplayChange={(value) =>
                        setData("color_display", value)
                    }
                    nameError={errors.display_name}
                    colorError={errors.color_display}
                />
                <div className="mt-5 max-w-sm">
                    <Label>MRP (₹)</Label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={data.mrp}
                        onChange={(event) => setData("mrp", event.target.value)}
                        placeholder="Enter maximum retail price"
                        className={inputClass}
                    />
                    <FieldError message={errors.mrp} />
                </div>
            </FormSection>

            {/* STEP 8: VARIANT TABLE WEBSITE VISIBILITY */}

            <FormSection
                step="Step 8: Variant Table Visibility"
                icon={Eye}
                title="Show Variant Table on Website"
                description="Choose whether customers can see the product's color and size variations."
            >
                <ProductWebsiteVisibility
                    label="Variant table visibility"
                    description="Yes shows the variant table on the product page; No hides it."
                    value={data.is_variant_table_visible}
                    onChange={(value) => setData("is_variant_table_visible", value)}
                />
                <FieldError message={errors.is_variant_table_visible} />
            </FormSection>

            {/* STEP 9: DESCRIPTION */}

            <FormSection
                step="Step 9: Product Description"
                icon={FileText}
                title="Product Description"
                description="Add the information customers should read about this product."
            >
                <div>
                    <Label>Website description</Label>
                    <textarea
                        value={data.description}
                        onChange={(event) => setData("description", event.target.value)}
                        rows={6}
                        maxLength={5000}
                        placeholder="Describe the product, materials, fit, care, or other useful details."
                        className={`${inputClass} min-h-36 resize-y`}
                    />
                    <div className="mt-1 flex items-center justify-between">
                        <FieldError message={errors.description} />
                        <span className="ml-auto text-xs text-gray-400">{data.description.length}/5000</span>
                    </div>
                </div>
            </FormSection>

            {/* STEP 10: DESCRIPTION WEBSITE VISIBILITY */}

            <FormSection
                step="Step 10: Description Visibility"
                icon={Eye}
                title="Show Description on Website"
                description="Choose whether the product description appears on the website."
            >
                <ProductWebsiteVisibility
                    label="Description visibility"
                    description="Yes shows the description on the product page; No hides it."
                    value={data.is_description_visible}
                    onChange={(value) => setData("is_description_visible", value)}
                />
                <FieldError message={errors.is_description_visible} />
            </FormSection>

            {/* ACTION BUTTONS */}

            <div className="flex items-center justify-end gap-3">

                <Link
                    href={route("admin.stock.product.index")}
                    className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 transition hover:bg-gray-50"
                >
                    Cancel
                </Link>

                <button
                    type="submit"
                    disabled={
                        processing ||
                        !data.variant_id ||
                        !data.display_name.trim()
                    }
                    className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing
                        ? "Saving..."
                        : isEditing
                          ? "Update Product"
                          : "Create Product"}
                </button>

            </div>
        </form>
    );
}
