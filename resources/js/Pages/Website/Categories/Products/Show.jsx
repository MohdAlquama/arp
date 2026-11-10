import WebsiteLayout from '@/Layouts/webiste/WebsiteLayout'
import { Deferred, Head, Link } from '@inertiajs/react'
import { useState } from 'react'
import { ArrowLeft, Check, Footprints, PackageSearch, Tag } from 'lucide-react'

export default function ProductShow({ productPage }) {
    return (
        <Deferred data="productPage" fallback={<ProductDetailSkeleton />}>
            <ProductDetails {...productPage} />
        </Deferred>
    )
}

function ProductDetails({ product, mainImageUrl, colorDisplay, variantRows }) {
    const [selectedImage, setSelectedImage] = useState(mainImageUrl)
    const variant = product.variant
    const showSwatches = colorDisplay === 'swatch' || colorDisplay === 'both'
    const showColorNames = colorDisplay === 'name' || colorDisplay === 'both'
    const colorGroups = [...variantRows.reduce((groups, row) => {
        const key = `${row.color}-${row.colorHex || ''}`

        if (!groups.has(key)) {
            groups.set(key, {
                color: row.color,
                colorHex: row.colorHex,
                imageUrl: row.imageUrl,
                sizes: [],
            })
        }

        const group = groups.get(key)
        if (row.imageUrl && !group.imageUrl) {
            group.imageUrl = row.imageUrl
        }
        if (!group.sizes.some((size) => size.id === row.sizeId)) {
            group.sizes.push({ id: row.sizeId, name: row.size })
        }

        return groups
    }, new Map()).values()]

    return (
        <>
            <Head title={`${product.display_name} | ARP Footwear`} />
            <main className="min-h-screen bg-[#faf9f7]">
                {(variant.category?.banner_image_url || variant.category?.page_title || variant.category?.page_description) && (
                    <section className="relative h-[220px] overflow-hidden bg-[#171717] text-white sm:h-[280px] lg:h-[340px]">
                        {variant.category?.banner_image_url && (
                            <>
                                <img src={variant.category.banner_image_url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 sm:inset-y-0 sm:left-auto sm:right-0 sm:h-full sm:w-auto sm:max-w-[58%] sm:object-contain sm:object-right" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/75 via-[#171717]/35 to-[#171717]/15 sm:from-[#171717] sm:via-[#171717]/75 sm:to-transparent" />
                            </>
                        )}
                        <div className="relative mx-auto flex h-full max-w-[1300px] flex-col justify-center px-5 sm:px-8 lg:px-12">
                            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#ff777b]">{variant.category?.name}</p>
                            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{variant.category?.page_title || variant.category?.name}</h2>
                            {variant.category?.page_description && <p className="mt-3 line-clamp-3 max-w-2xl text-sm leading-6 text-white/70">{variant.category.page_description}</p>}
                        </div>
                    </section>
                )}
                <div className="mx-auto max-w-[1300px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
                    <Link href="/products" className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-stone-500 transition hover:text-[#ed1c24]">
                        <ArrowLeft size={16} /> Back to footwear
                    </Link>

                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] lg:gap-14">
                        <div className="overflow-hidden rounded-3xl bg-white">
                            <div className="relative aspect-square bg-stone-100 sm:aspect-[1.08]">
                                {selectedImage ? (
                                    <img src={selectedImage} alt={product.display_name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-stone-300"><PackageSearch size={72} strokeWidth={1.1} /></div>
                                )}
                                {product.is_promotional && <span className="absolute left-5 top-5 rounded-full bg-[#ed1c24] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white">Featured</span>}
                            </div>
                            {colorGroups.some((group) => group.imageUrl) && (
                                <div className="flex gap-3 overflow-x-auto p-4">
                                    {colorGroups.filter((group) => group.imageUrl).map((group) => (
                                        <button key={`${group.color}-${group.colorHex}`} type="button" onClick={() => setSelectedImage(group.imageUrl)} aria-label={`View ${group.color} image`} className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 ${selectedImage === group.imageUrl ? 'border-[#ed1c24]' : 'border-transparent'}`}>
                                            <img src={group.imageUrl} alt={group.color} className="h-full w-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="py-2 sm:py-5">
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ed1c24]">{variant.category?.name} / {variant.sub_category?.name}</p>
                            <h1 className="mt-3 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">{product.display_name}</h1>
                            <p className="mt-2 text-sm text-stone-500">{variant.default_name}</p>
                            {product.mrp && <p className="mt-4 text-2xl font-bold text-stone-900">MRP ₹{Number(product.mrp).toLocaleString('en-IN')}</p>}

                            <div className="mt-6 flex flex-wrap gap-2">
                                <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-600"><Tag size={13} className="mr-1 inline text-[#ed1c24]" />Article {variant.article_no}</span>
                                {variant.material?.material_name && <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-600"><Footprints size={13} className="mr-1 inline text-[#ed1c24]" />{variant.material.material_name}</span>}
                                <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-600"><Check size={13} className="mr-1 inline text-green-600" />Available</span>
                            </div>

                            {product.is_description_visible && product.description && (
                                <div className="mt-8 border-t border-stone-200 pt-6">
                                    <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-stone-400">Product details</h2>
                                    <p className="mt-3 whitespace-pre-line text-sm leading-7 text-stone-600">{product.description}</p>
                                </div>
                            )}

                            {product.is_variant_table_visible && (
                                <section className="mt-8 border-t border-stone-200 pt-6">
                                    <div className="mb-4 flex items-end justify-between gap-3">
                                        <div>
                                            <h2 className="text-lg font-bold text-stone-900">Colors & sizes</h2>
                                            <p className="mt-1 text-xs text-stone-500">Choose a color to preview its image.</p>
                                        </div>
                                        <span className="text-[10px] font-semibold text-stone-400">{variantRows.length} options</span>
                                    </div>

                                    {variantRows.length ? (
                                        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                                            <div className="grid grid-cols-[1fr_1fr] bg-stone-50 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                                                <span>Color</span><span>Size</span>
                                            </div>
                                            <div className="divide-y divide-stone-100">
                                                {colorGroups.map((group) => (
                                                    <button key={`${group.color}-${group.colorHex}`} type="button" onClick={() => group.imageUrl && setSelectedImage(group.imageUrl)} className="grid w-full grid-cols-[minmax(100px,0.7fr)_minmax(0,1.3fr)] items-center gap-3 px-4 py-3 text-left transition hover:bg-stone-50">
                                                        <span className="flex items-center gap-2 text-sm font-medium text-stone-700">
                                                            {showSwatches && <span className="h-5 w-5 shrink-0 rounded-full border border-stone-200" style={{ backgroundColor: group.colorHex || '#e7e5e4' }} />}
                                                            {showColorNames && <span>{group.color}</span>}
                                                        </span>
                                                        <span className="flex flex-wrap gap-1.5">
                                                            {group.sizes.map((size) => <span key={size.id} className="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700">{size.name}</span>)}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="rounded-xl bg-white p-4 text-sm text-stone-500">Color and size options are not available yet.</p>
                                    )}
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

function ProductDetailSkeleton() {
    return (
        <main className="min-h-screen animate-pulse bg-[#faf9f7]">
            <div className="mx-auto max-w-[1300px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
                <div className="mb-8 h-4 w-32 rounded bg-stone-200" />
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] lg:gap-14">
                    <div className="aspect-square rounded-3xl bg-stone-200 sm:aspect-[1.08]" />
                    <div className="space-y-5 py-4">
                        <div className="h-3 w-40 rounded bg-stone-200" />
                        <div className="h-10 w-4/5 rounded bg-stone-200" />
                        <div className="h-4 w-1/2 rounded bg-stone-100" />
                        <div className="h-8 w-32 rounded bg-stone-200" />
                        <div className="h-28 rounded-2xl bg-white" />
                    </div>
                </div>
            </div>
        </main>
    )
}

ProductShow.layout = (page) => <WebsiteLayout>{page}</WebsiteLayout>
