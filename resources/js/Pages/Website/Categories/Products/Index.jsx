import WebsiteLayout from '@/Layouts/webiste/WebsiteLayout'
import { Deferred, Head, Link, router } from '@inertiajs/react'
import { ArrowDownUp, ChevronDown, ChevronLeft, ChevronRight, Filter, PackageSearch, Tag } from 'lucide-react'
import { useState } from 'react'
import ProductListingSkeleton from './ProductListingSkeleton'

function ProductCard({ product, uiComponent }) {
    const variant = product.variant
    const image = product.image_url
    const isList = Number(uiComponent) === 2
    const isCarousel = Number(uiComponent) === 3

    return (
        <Link href={`/products/${product.id}`} className={`group flex overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/60 ${isList ? 'flex-row' : 'flex-col'} ${isCarousel ? 'w-[78%] shrink-0 snap-start sm:w-[45%] xl:w-[32%]' : ''}`}>
                <div className={`relative overflow-hidden bg-stone-100 ${isList ? 'aspect-square w-28 shrink-0 sm:w-48' : 'aspect-[4/4.5] w-full'}`}>
                    {image ? (
                        <img src={image} alt={product.display_name || variant?.default_name || 'ARP footwear'} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    ) : (
                        <div className="flex h-full items-center justify-center text-stone-300"><PackageSearch size={52} strokeWidth={1.2} /></div>
                    )}
                    {product.is_promotional && <span className="absolute left-3 top-3 rounded-full bg-[#ed1c24] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Featured</span>}
                    <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-stone-700 shadow-sm">{variant?.article_no}</span>
                </div>
                <div className={`min-w-0 flex-1 p-4 sm:p-5 ${isList ? 'self-center' : ''}`}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">{variant?.category?.name}{variant?.sub_category?.name ? ` / ${variant.sub_category.name}` : ''}</p>
                    <h2 className="mt-2 truncate text-lg font-bold text-stone-900">{product.display_name || variant?.default_name || 'Footwear'}</h2>
                    <p className="mt-1 text-xs text-stone-500">{variant?.default_name}</p>
                    {product.mrp && <p className="mt-2 text-sm font-bold text-stone-900">MRP ₹{Number(product.mrp).toLocaleString('en-IN')}</p>}
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#ed1c24]">View product <ChevronRight size={15} /></span>
                </div>
        </Link>
    )
}

function Pagination({ links }) {
    if (!links || links.length <= 3) return null

    return (
        <nav aria-label="Product pages" className="mt-12 flex items-center justify-center gap-2">
            {links.map((link, index) => (
                <Link
                    key={`${link.label}-${index}`}
                    href={link.url || '#'}
                    preserveScroll
                    aria-current={link.active ? 'page' : undefined}
                    className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition ${link.active ? 'bg-stone-900 text-white' : link.url ? 'bg-white text-stone-600 hover:bg-stone-100' : 'cursor-not-allowed text-stone-300'}`}
                >
                    {link.label.includes('Previous') ? <ChevronLeft size={17} /> : link.label.includes('Next') ? <ChevronRight size={17} /> : <span dangerouslySetInnerHTML={{ __html: link.label }} />}
                </Link>
            ))}
        </nav>
    )
}

export default function ProductListing({ products, categories, filters, selectedCategory, selectedSubCategory, pageDesignCategory }) {
    const [collectionsOpen, setCollectionsOpen] = useState(false)
    const productRows = products?.data ?? []
    const productTotal = products?.total ?? 0
    const paginationLinks = products?.links ?? []
    const categoryRows = categories ?? []
    const currentFilters = filters ?? {}
    const designCategory = pageDesignCategory || selectedCategory
    const title = designCategory?.page_title || selectedSubCategory?.name || designCategory?.name || 'All Footwear'
    const description = designCategory?.page_description
        ? designCategory.page_description
        : 'Find your everyday pair, made for comfort and ready for every step.'
    const uiComponent = Number(designCategory?.ui_id || 1)
    const productLayoutClass = uiComponent === 2
        ? 'grid grid-cols-1 gap-3'
        : uiComponent === 3
            ? 'flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 sm:gap-5'
            : 'grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3'

    const handleSortChange = (event) => {
        router.get(window.location.pathname, {
            ...currentFilters,
            sort: event.target.value,
        }, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        })
    }

    return (
        <>
            <Head title={`${title} | ARP Footwear`} />
            <Deferred data="products" fallback={<ProductListingSkeleton />}>
            <main className="min-h-screen bg-[#faf9f7]">
                <section className="relative h-[250px] overflow-hidden bg-[#171717] text-white sm:h-[320px] lg:h-[380px]">
                    {designCategory?.banner_image_url && (
                        <>
                            <img src={designCategory.banner_image_url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 sm:inset-y-0 sm:left-auto sm:right-0 sm:h-full sm:w-auto sm:max-w-[58%] sm:object-contain sm:object-right" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/75 via-[#171717]/35 to-[#171717]/15 sm:from-[#171717] sm:via-[#171717]/75 sm:to-transparent" />
                        </>
                    )}
                    <div className="relative mx-auto flex h-full max-w-[1500px] flex-col justify-center px-5 sm:px-8 lg:px-12">
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#ff777b]">
                            {selectedSubCategory
                                ? `${designCategory?.name || 'Shop'} · ${selectedSubCategory.name}`
                                : 'ARP Footwear · Shop'}
                        </p>
                        <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                            <div>
                                <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{title}<span className="text-[#ed1c24]">.</span></h1>
                                <p className="mt-3 line-clamp-3 max-w-xl text-sm leading-6 text-white/70">{description}</p>
                            </div>
                            <div className="text-xs font-medium text-white/60">{productTotal} {productTotal === 1 ? 'style' : 'styles'}</div>
                        </div>
                    </div>
                </section>

                <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
                    <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-5">
                        <div className="relative">
                            <button
                                type="button"
                                aria-expanded={collectionsOpen}
                                onClick={() => setCollectionsOpen((isOpen) => !isOpen)}
                                className="flex items-center gap-2 text-xs text-stone-600 hover:text-stone-900"
                            >
                                <Filter size={15} />
                                <span>Browse collections</span>
                                <ChevronDown size={14} className={`transition-transform ${collectionsOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {collectionsOpen && (
                                <div className="absolute left-0 top-full z-20 mt-2 max-h-80 w-64 overflow-y-auto rounded-xl border border-stone-200 bg-white p-2 shadow-xl">
                                    <Link href="/products" className="block rounded-lg px-3 py-2 text-sm text-stone-700 hover:bg-stone-100">All footwear</Link>
                                    {categoryRows.map((category) => (
                                        <div key={category.id}>
                                            <Link href={`/products/category/${category.id}`} className="block rounded-lg px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100">{category.name}</Link>
                                            {category.sub_categories?.map((subCategory) => (
                                                <Link
                                                    key={subCategory.id}
                                                    href={`/products?category=${category.id}&subcategory=${subCategory.id}`}
                                                    className="block rounded-lg py-1.5 pl-6 pr-3 text-xs text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                                                >
                                                    {subCategory.name}
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <label className="flex items-center gap-2 text-xs font-medium text-stone-500">
                            <ArrowDownUp size={14} />
                            <span className="sr-only">Sort products</span>
                            <select
                                value={currentFilters.sort || 'latest'}
                                onChange={handleSortChange}
                                className="border-0 bg-transparent py-1 pr-6 text-xs font-medium text-stone-600 focus:outline-none focus:ring-0"
                            >
                                <option value="latest">Latest arrivals</option>
                                <option value="oldest">Oldest first</option>
                            </select>
                        </label>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
                        <aside className="space-y-7">
                            <div>
                                <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Categories</h2>
                                <nav className="space-y-1">
                                    <Link href="/products" className={`block rounded-lg px-3 py-2 text-sm ${!currentFilters.category ? 'bg-white font-bold text-stone-900 shadow-sm' : 'text-stone-600 hover:bg-white'}`}>All footwear</Link>
                                    {categoryRows.map((category) => (
                                        <div key={category.id}>
                                            <Link href={`/products/category/${category.id}`} className={`block rounded-lg px-3 py-2 text-sm ${Number(currentFilters.category) === category.id && !currentFilters.subcategory ? 'bg-white font-bold text-stone-900 shadow-sm' : 'text-stone-600 hover:bg-white'}`}>{category.name}</Link>
                                            {Number(currentFilters.category) === category.id && category.sub_categories?.length > 0 && (
                                                <div className="ml-3 border-l border-stone-200 py-1 pl-3">
                                                    {category.sub_categories.map((subCategory) => <Link key={subCategory.id} href={`/products?category=${category.id}&subcategory=${subCategory.id}`} className={`block rounded-md px-2 py-1.5 text-xs ${Number(currentFilters.subcategory) === subCategory.id ? 'font-bold text-[#ed1c24]' : 'text-stone-500 hover:text-stone-900'}`}>{subCategory.name}</Link>)}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </nav>
                            </div>
                            <div className="rounded-2xl bg-white p-4 text-xs leading-5 text-stone-500">
                                <div className="mb-2 flex items-center gap-2 font-bold text-stone-800"><Tag size={14} className="text-[#ed1c24]" /> ARP promise</div>
                                Comfortable footwear for every day.
                            </div>
                        </aside>

                        <section>
                            {productRows.length ? (
                                <div className={productLayoutClass}>
                                    {productRows.map((product) => <ProductCard key={product.id} product={product} uiComponent={uiComponent} />)}
                                </div>
                            ) : (
                                <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white px-6 text-center">
                                    <PackageSearch size={38} className="text-stone-300" strokeWidth={1.3} />
                                    <h2 className="mt-4 text-xl font-bold text-stone-900">No products here yet</h2>
                                    <p className="mt-2 max-w-sm text-sm leading-6 text-stone-500">Published products in this collection will show up here when they are ready.</p>
                                    <Link href="/products" className="mt-5 rounded-full bg-stone-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-[#ed1c24]">Browse all footwear</Link>
                                </div>
                            )}
                            {productTotal > 0 && (
                                <p className="mt-8 text-center text-xs text-stone-500">
                                    Showing {products.from}–{products.to} of {productTotal} products
                                </p>
                            )}
                            <Pagination links={paginationLinks} />
                        </section>
                    </div>
                </div>
            </main>
            </Deferred>
        </>
    )
}

ProductListing.layout = (page) => <WebsiteLayout>{page}</WebsiteLayout>
