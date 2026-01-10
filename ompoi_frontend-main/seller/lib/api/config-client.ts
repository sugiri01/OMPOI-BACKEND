/**
 * API client for fetching configuration data from backend (Seller App)
 */

import { API_ENDPOINTS } from '../constants';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types
export interface Country {
    id: string;
    name: string;
    code: string;
    region?: string;
    is_supported: boolean;
    supports_registration: boolean;
    supports_shipping: boolean;
    currency_code?: string;
    phone_code?: string;
    display_order: number;
    extra_data?: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export interface SystemConfigValue {
    key: string;
    value: string | number | boolean | object;
    category: string;
    description?: string;
}

// API Client Functions
export async function fetchCountries(options?: {
    supportsRegistration?: boolean;
    supportsShipping?: boolean;
}): Promise<Country[]> {
    try {
        const url = new URL(`${API_BASE_URL}${API_ENDPOINTS.COUNTRIES}`);

        if (options?.supportsRegistration !== undefined) {
            url.searchParams.append('supports_registration', options.supportsRegistration.toString());
        }

        if (options?.supportsShipping !== undefined) {
            url.searchParams.append('supports_shipping', options.supportsShipping.toString());
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`Failed to fetch countries: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
}

export async function fetchSystemConfig(key: string): Promise<SystemConfigValue | null> {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SYSTEM_CONFIG}/${key}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch system config: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching system config '${key}':`, error);
        return null;
    }
}

export async function fetchSystemConfigByCategory(category: string): Promise<Record<string, any>> {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SYSTEM_CONFIG}/category/${category}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch system config category: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching system config category '${category}':`, error);
        return {};
    }
}
