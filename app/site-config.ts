export const BACKEND = typeof window !== 'undefined' && (window as any).__BODY_BACKEND__ ? String((window as any).__BODY_BACKEND__) : '';
