import { z } from "zod";
import DOMPurify from 'dompurify';

// Sanitization helper
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: []
  });
}

export function sanitizeText(text: string): string {
  return text.trim().replace(/[<>]/g, '');
}

// Authentication schemas
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
});

// Tour schemas
export const tourSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10).max(500),
  detailed_content: z.string().min(100).optional(),
  category: z.string().min(1),
  duration: z.number().min(1).max(365),
  price: z.number().positive().optional(),
  currency: z.string().min(1).max(5).default('₹'),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  itinerary: z.string().min(50).optional(),
  featured: z.boolean().default(false),
  show_on_homepage: z.boolean().default(false),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  map_location: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional(),
  seo_meta: z.object({
    title: z.string().max(60),
    description: z.string().max(160),
    keywords: z.array(z.string())
  }).optional()
});

// Contact form schemas
export const contactSubmissionSchema = z.object({
  name: z.string().min(2).max(100),
  nationality: z.string().max(100).optional(),
  contact_whatsapp: z.string().min(10).max(20),
  destination_interested: z.string().min(1).max(200),
  number_of_persons: z.number().min(1).max(50),
  number_of_kids_and_age: z.string().max(200).optional(),
  number_of_rooms: z.number().min(1).max(20),
  tour_days: z.number().min(1).max(365),
  travel_date: z.string().optional(),
  hotel_category: z.enum(['standard', 'deluxe', 'premium', 'luxury']),
  special_comments: z.string().max(1000).optional(),
  source_page: z.string().default('contact')
});

export const tourInquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  nationality: z.string().max(100).optional(),
  contact_number: z.string().min(10).max(20),
  number_of_persons: z.number().min(1).max(50),
  number_of_kids_and_age: z.string().max(200).optional(),
  hotel_category: z.enum(['standard', 'deluxe', 'premium', 'luxury']),
  number_of_rooms: z.number().min(1).max(20),
  preferred_dates: z.string().max(200).optional(),
  special_comments: z.string().max(1000).optional(),
  message: z.string().max(1000).optional(),
  tour_id: z.string().uuid()
});

// Admin schemas
export const adminUserSchema = z.object({
  email: z.string().email(),
  full_name: z.string().min(2).max(100),
  role: z.enum(['admin', 'super_admin']).default('admin'),
  is_active: z.boolean().default(true)
});

export const homepageContentSchema = z.object({
  section_name: z.string().min(1).max(100),
  content: z.record(z.any()),
  is_active: z.boolean().default(true)
});

export const siteSettingSchema = z.object({
  setting_key: z.string().min(1).max(100),
  setting_value: z.record(z.any()),
  is_public: z.boolean().default(false),
  description: z.string().max(500).optional()
});

// File upload validation
export const imageUploadSchema = z.object({
  file: z.any().refine((file) => {
    if (!file) return false;
    return file.size <= 5 * 1024 * 1024; // 5MB max
  }, 'File size must be less than 5MB').refine((file) => {
    if (!file) return false;
    return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type);
  }, 'File must be a JPEG, PNG, or WebP image')
});

// Sanitization transformers
export const sanitizedString = z.string().transform(sanitizeText);
export const sanitizedHtml = z.string().transform(sanitizeHtml);