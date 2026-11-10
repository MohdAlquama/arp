import { useEffect, useState } from 'react';
import { fallbackProducts } from './fallbackProducts';

// Vite: set VITE_API_URL only if API is on another domain. Same Laravel app => '/api'.
const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Loads products from GET /api/new-arrivals.
 * Falls back to demo products if the API is empty or unreachable.
 */
export default function useNewArrivals(limit = 8) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        fetch(`${API_BASE}/new-arrivals?limit=${limit}`, {
            headers: { Accept: 'application/json' },
        })
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((data) => {
                if (cancelled) return;
                setProducts(Array.isArray(data) && data.length > 0 ? data : fallbackProducts);
            })
            .catch(() => {
                if (!cancelled) setProducts(fallbackProducts);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [limit]);

    return { products, loading };
}
