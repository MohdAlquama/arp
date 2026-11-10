import React from "react";
import { Megaphone } from "lucide-react";

export default function ProductPromotional({ value, onChange }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-orange-50 p-2 text-orange-600">
                        <Megaphone size={20} />
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">
                            Product Promotional
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                            Enable this option to mark the product as promotional.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    role="switch"
                    aria-checked={Boolean(value)}
                    onClick={() => onChange(!value)}
                    className={`relative h-6 w-11 rounded-full transition ${
                        value ? "bg-violet-600" : "bg-gray-300"
                    }`}
                >
                    <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                            value ? "left-6" : "left-1"
                        }`}
                    />
                </button>
            </div>

            <p className="text-xs text-gray-500">
                Status:{" "}
                <span
                    className={
                        value
                            ? "font-semibold text-green-600"
                            : "font-semibold text-gray-500"
                    }
                >
                    {value ? "Promotional" : "Normal Product"}
                </span>
            </p>
        </div>
    );
}