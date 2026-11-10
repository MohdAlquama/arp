import React from 'react';

export default function CategoryTable({ categories = [] }) {

    return (
        <section className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-8">

            <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium text-gray-900">
                    Category List
                </h2>
            </div>

            <div className="overflow-x-auto">

                <table className="w-full text-left">

                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Theme ID</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">

                        {categories.length === 0 ? (

                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                    No categories available.
                                </td>
                            </tr>

                        ) : (

                            categories.map((category, index) => (

                                <tr key={category.id} className="hover:bg-gray-50">

                                    <td className="px-6 py-4 text-sm">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-4 text-sm font-medium">
                                        {category.name}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            category.status
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {category.status ? 'Active' : 'Inactive'}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4 text-sm">
                                        {category.theme_id ?? 'N/A'}
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>
        </section>
    );
}