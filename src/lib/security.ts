// Security utilities and headers

export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
} as const;

export const RATE_LIMITS = {
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
  },
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  forms: {
    windowMs: 60 * 1000, // 1 minute
    max: 3, // limit each IP to 3 form submissions per minute
  },
} as const;

// CSRF token generation and validation
export function generateCSRFToken(): string {
  return crypto.randomUUID();
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken && token.length > 0;
}

// IP-based rate limiting (simple in-memory store for demo)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  windowMs: number,
  maxRequests: number
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = identifier;
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    // First request or window expired
    const resetTime = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetTime });
    return { allowed: true, remaining: maxRequests - 1, resetTime };
  }

  if (record.count >= maxRequests) {
    // Rate limit exceeded
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  // Increment count
  record.count++;
  rateLimitStore.set(key, record);
  
  return { 
    allowed: true, 
    remaining: maxRequests - record.count, 
    resetTime: record.resetTime 
  };
}

// File upload security
export const FILE_UPLOAD_LIMITS = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
} as const;

export function validateFileUpload(file: File): { valid: boolean; error?: string } {
  if (file.size > FILE_UPLOAD_LIMITS.maxSize) {
    return { valid: false, error: 'File size exceeds maximum limit of 5MB' };
  }

  if (!FILE_UPLOAD_LIMITS.allowedTypes.includes(file.type as any)) {
    return { valid: false, error: 'File type not allowed. Please upload JPEG, PNG, or WebP images only.' };
  }

  const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  if (!FILE_UPLOAD_LIMITS.allowedExtensions.includes(extension as any)) {
    return { valid: false, error: 'File extension not allowed.' };
  }

  return { valid: true };
}

// Audit logging
export interface AuditLogEntry {
  timestamp: string;
  userId?: string;
  action: string;
  resource: string;
  details?: Record<string, any>;
  ip?: string;
  userAgent?: string;
}

export function logAuditEvent(entry: Omit<AuditLogEntry, 'timestamp'>): void {
  const logEntry: AuditLogEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
  };

  // In production, this should send to a logging service
  console.log('[AUDIT]', JSON.stringify(logEntry));
  
  // TODO: Send to actual audit logging service
  // await sendToAuditService(logEntry);
}

// Session security
export const SESSION_CONFIG = {
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  inactivityTimeout: 2 * 60 * 60 * 1000, // 2 hours
  refreshThreshold: 15 * 60 * 1000, // Refresh if token expires in 15 minutes
} as const;

export function isSessionExpired(lastActivity: number): boolean {
  return Date.now() - lastActivity > SESSION_CONFIG.inactivityTimeout;
}

export function shouldRefreshToken(expiresAt: number): boolean {
  return expiresAt - Date.now() < SESSION_CONFIG.refreshThreshold;
}