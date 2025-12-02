export const TestTags = {
    // Test types
    SMOKE: '@smoke',
    E2E: '@e2e',
    
    // Test natures
    POSITIVE: '@positive',
    NEGATIVE: '@negative',

    // Feature areas
    LOGIN: '@login',
    INVENTORY: '@inventory',
    CART: '@cart',
    CHECKOUT: '@checkout',

    // Priorities
    CRITICAL: '@critical',
    HIGH: '@high',
    MEDIUM: '@medium',
    LOW: '@low',
} as const;