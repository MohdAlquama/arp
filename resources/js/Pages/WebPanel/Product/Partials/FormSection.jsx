import React from "react";

export default function FormSection({
    step,
    icon: Icon,
    title,
    description,
    children,
}) {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
                <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-violet-600">
                    {Icon && <Icon size={18} />}
                    <span>{step}</span>
                </div>

                <h2 className="text-base font-semibold text-gray-900">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    {description}
                </p>
            </div>

            <div className="lg:col-span-8">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    {children}
                </div>
            </div>
        </div>
    );
}