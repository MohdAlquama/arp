export default function ProductListingSkeleton() {
    return (
        <main className="min-h-screen animate-pulse bg-[#faf9f7]">
            <section className="h-[250px] bg-stone-800 sm:h-[320px] lg:h-[380px]">
                <div className="mx-auto flex h-full max-w-[1500px] flex-col justify-center px-5 sm:px-8 lg:px-12">
                    <div className="h-3 w-32 rounded bg-white/20" />
                    <div className="mt-5 h-12 w-64 max-w-full rounded bg-white/20" />
                    <div className="mt-4 h-4 w-96 max-w-full rounded bg-white/10" />
                </div>
            </section>
            <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-12">
                <aside className="hidden space-y-3 lg:block">
                    <div className="h-4 w-24 rounded bg-stone-200" />
                    {[0, 1, 2, 3, 4].map((row) => <div key={row} className="h-9 rounded-lg bg-white" />)}
                </aside>
                <section className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                    {[0, 1, 2, 3, 4, 5].map((card) => (
                        <div key={card} className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                            <div className="aspect-[4/4.5] bg-stone-200" />
                            <div className="space-y-3 p-4 sm:p-5">
                                <div className="h-3 w-2/3 rounded bg-stone-200" />
                                <div className="h-5 w-full rounded bg-stone-200" />
                                <div className="h-3 w-1/2 rounded bg-stone-100" />
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    )
}
