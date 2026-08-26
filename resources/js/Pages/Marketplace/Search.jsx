import MarketplacePublicLayout from "@/Layouts/MarketplacePublicLayout";
import { Head } from "@inertiajs/react";

export default function Search({
    query,
    products,
    categories,
    userLocation,
}) {
    return (
        <MarketplacePublicLayout
            categories={categories}
            userLocation={userLocation}
        >
            <Head title={`Search: ${query}`} />

            <div className="min-h-screen bg-slate-50 py-6">
                <div className="mx-auto max-w-7xl px-4">

                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-900">
                            Matokeo ya utafutaji
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Matokeo ya:{" "}
                            <span className="font-semibold text-slate-800">
                                "{query}"
                            </span>
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            {products.total} bidhaa zimepatikana
                        </p>
                    </div>

                    {products.data.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {products.data.map((product) => (
                                <div
                                    key={product.id}
                                    className="overflow-hidden rounded-xl bg-white shadow-sm"
                                >
                                    {product.image && (
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="h-48 w-full object-cover"
                                        />
                                    )}

                                    <div className="p-4">

                                        <h2 className="line-clamp-2 font-semibold text-slate-900">
                                            {product.title}
                                        </h2>

                                        <p className="mt-2 font-bold text-green-600">
                                            {product.formatted_price}
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {product.location}
                                        </p>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-800">
                                Hakuna bidhaa iliyopatikana
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Jaribu kutumia jina tofauti la bidhaa au
                                category.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </MarketplacePublicLayout>
    );
}