/**
 * Constants and static configuration for the seller application
 */

// Inventory Status Configuration
export const INVENTORY_STATUSES = {
    IN_STOCK: 'In-stock',
    LOW_STOCK: 'Low-stock',
    OUT_OF_STOCK: 'Out-of-stock',
} as const;

export type InventoryStatus = typeof INVENTORY_STATUSES[keyof typeof INVENTORY_STATUSES];

// Status Badge Styles
export const STATUS_BADGE_STYLES = {
    [INVENTORY_STATUSES.IN_STOCK]: 'bg-green-100 text-green-700 hover:bg-green-100',
    [INVENTORY_STATUSES.LOW_STOCK]: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
    [INVENTORY_STATUSES.OUT_OF_STOCK]: 'bg-red-100 text-red-700 hover:bg-red-100',
} as const;

// Status Labels
export const STATUS_LABELS = {
    [INVENTORY_STATUSES.IN_STOCK]: 'In Stock',
    [INVENTORY_STATUSES.LOW_STOCK]: 'Low Stock',
    [INVENTORY_STATUSES.OUT_OF_STOCK]: 'Out of Stock',
} as const;

// Stock Thresholds
export const STOCK_THRESHOLDS = {
    LOW_STOCK: 100,
    OUT_OF_STOCK: 0,
} as const;

// Dashboard Labels
export const DASHBOARD_LABELS = {
    WELCOME_MESSAGE: 'Welcome back, OMPOI Exports! 👋',
    TOTAL_REVENUE: 'TOTAL REVENUE (OCT)',
    TOTAL_ORDERS: 'TOTAL ORDERS',
    SELLER_RATING: 'SELLER RATING',
    ACTIVE_BUYERS: 'ACTIVE BUYERS',
} as const;

// Business Types for Registration
export const BUSINESS_TYPES = [
    'Exporter',
    'Importer',
    'Manufacturer',
    'Trader',
    'Wholesaler',
    'Retailer',
    'Agent/Broker',
] as const;

// Registration Form Labels
export const REGISTRATION_LABELS = {
    COMPANY_NAME: 'Company Name',
    BUSINESS_TYPE: 'Business Type',
    COUNTRY: 'Country',
    WEBSITE: 'Website',
    PRIMARY_CONTACT: 'Primary Contact',
    BUSINESS_PHONE: 'Business Phone',
    BUSINESS_EMAIL: 'Business Email',
    PAN_TAX_ID: 'PAN / Tax ID',
    GST_NUMBER: 'GST Number',
    IS_EXPORTER: 'Are you an exporter?',
    MSME_NUMBER: 'MSME Number (Optional)',
    FSSAI_NUMBER: 'FSSAI Number (Optional)',
    SPICE_REGISTRATION: 'SPICE Board Registration (Optional)',
} as const;

// Quality Badges
export const QUALITY_BADGES = {
    PREMIUM: 'Premium',
    VERIFIED: 'Verified',
    CERTIFIED: 'Certified',
    STANDARD: 'Standard',
} as const;

// Product Grades
export const PRODUCT_GRADES = {
    W320: 'W320',
    W240: 'W240',
    W180: 'W180',
    W450: 'W450',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
    COUNTRIES: '/api/v1/config/countries',
    SYSTEM_CONFIG: '/api/v1/config/system',
    DASHBOARD_STATS: '/api/v1/dashboard/stats',
} as const;

// Helper Functions
export function getStatusBadgeStyle(status: InventoryStatus): string {
    return STATUS_BADGE_STYLES[status] || 'bg-gray-100 text-gray-700 hover:bg-gray-100';
}

export function getStatusLabel(status: InventoryStatus): string {
    return STATUS_LABELS[status] || status;
}

export function getStockColorClass(stock: number): string {
    if (stock >= STOCK_THRESHOLDS.LOW_STOCK) return 'text-green-600';
    if (stock > STOCK_THRESHOLDS.OUT_OF_STOCK) return 'text-yellow-500';
    return 'text-red-600';
}

export function determineStockStatus(currentStock: number, reserved: number): InventoryStatus {
    const available = currentStock - reserved;

    if (available <= STOCK_THRESHOLDS.OUT_OF_STOCK) {
        return INVENTORY_STATUSES.OUT_OF_STOCK;
    }

    if (available < STOCK_THRESHOLDS.LOW_STOCK) {
        return INVENTORY_STATUSES.LOW_STOCK;
    }

    return INVENTORY_STATUSES.IN_STOCK;
}
