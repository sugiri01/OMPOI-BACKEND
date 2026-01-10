/**
 * Constants and static configuration for the buyer application
 */

// Order Status Configuration
export const ORDER_STATUSES = {
    PENDING_PAYMENT: 'Pending Payment',
    PROCESSING: 'Processing',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
} as const;

export type OrderStatus = typeof ORDER_STATUSES[keyof typeof ORDER_STATUSES];

// Status Color Mappings
export const STATUS_COLORS = {
    [ORDER_STATUSES.PENDING_PAYMENT]: 'text-yellow-800 bg-yellow-100',
    [ORDER_STATUSES.PROCESSING]: 'text-violet-800 bg-violet-100',
    [ORDER_STATUSES.SHIPPED]: 'text-blue-800 bg-blue-100',
    [ORDER_STATUSES.DELIVERED]: 'text-green-800 bg-green-100',
    [ORDER_STATUSES.CANCELLED]: 'text-red-800 bg-red-100',
} as const;

// Product Quality Grades
export const QUALITY_GRADES = {
    PREMIUM_A_PLUS: 'Premium A+ Grade',
    PREMIUM_A: 'Premium A+',
    GRADE_A_PLUS: 'Grade A+',
    GRADE_A: 'Grade A',
    PREMIUM: 'Premium',
} as const;

// Feature Flags
export const FEATURES = {
    AI_INSIGHTS: {
        title: 'AI Insights',
        description: 'Smart supplier filtering',
    },
    FLEXIBLE_PAYMENT: {
        title: 'FlexiPayment',
        description: 'Multi-currency support',
    },
    QUALITY_ASSURED: {
        title: 'Quality Assured',
        description: 'Agent verified shipments',
    },
    PRIMO_SUPPLIERS: {
        title: 'Primo',
        description: 'Top Rated Suppliers',
    },
} as const;

// UI Labels and Text
export const UI_LABELS = {
    PLATFORM_TAGLINE: "India's No.1 online agri marketplace platform",
    OFFERS_SECTION_TITLE: 'Offers for you',
    WHATS_NEW_SECTION_TITLE: "What's new",
    PREMIUM_SUPPLIERS_TITLE: 'Premium Suppliers',
    CUSTOMER_REVIEWS_TITLE: 'Customer Reviews',
} as const;

// New Features Configuration
export const NEW_FEATURES = [
    {
        title: 'Flexible Payment',
        description: '30% advance, 70% on delivery terms',
    },
    {
        title: 'Multi-currency Support',
        description: 'Pay securely in USD, EUR, INR',
    },
    {
        title: 'Quality Assurance',
        description: 'Agent verified shipments & certificates',
    },
] as const;

// Statistics Display Configuration
export const STATS_CONFIG = {
    ACTIVE_SUPPLIERS: {
        title: 'Active suppliers',
        defaultValue: '150+',
        configKey: 'active_suppliers_count',
    },
    COUNTRIES_COVERED: {
        title: 'Countries covered',
        defaultValue: '12+',
        configKey: 'countries_covered',
    },
    MT_SOURCED: {
        title: 'MT sourced yearly',
        defaultValue: '50K+',
        configKey: 'mt_sourced_yearly',
    },
} as const;

// API Endpoints
export const API_ENDPOINTS = {
    OFFERS: '/api/v1/config/offers',
    FEATURED_SUPPLIERS: '/api/v1/config/suppliers/featured',
    COUNTRIES: '/api/v1/config/countries',
    SYSTEM_CONFIG: '/api/v1/config/system',
} as const;

// Helper function to get status color class
export function getStatusColorClass(status: OrderStatus): string {
    return STATUS_COLORS[status] || 'text-gray-800 bg-gray-100';
}
