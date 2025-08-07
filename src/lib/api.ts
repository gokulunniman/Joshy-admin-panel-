import { supabase } from "@/integrations/supabase/client";
import { sanitizeText, sanitizeHtml } from "@/lib/validation";
import { logAuditEvent } from "@/lib/security";
import { toast } from "sonner";

// Base API error class
export class APIError extends Error {
  constructor(
    message: string, 
    public status: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Generic API helper with error handling
async function apiCall<T>(
  operation: () => Promise<{ data: any; error: any }>,
  operationName: string,
  auditResource?: string
): Promise<T> {
  try {
    const { data, error } = await operation();
    
    if (error) {
      console.error(`${operationName} error:`, error);
      
      // Log audit event for failures
      if (auditResource) {
        logAuditEvent({
          action: `${operationName}_failed`,
          resource: auditResource,
          details: { error: error.message }
        });
      }
      
      throw new APIError(error.message, 400, error.code);
    }

    // Log successful operations
    if (auditResource) {
      logAuditEvent({
        action: operationName,
        resource: auditResource
      });
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    console.error(`${operationName} unexpected error:`, error);
    throw new APIError(`Failed to ${operationName.toLowerCase()}`, 500);
  }
}

// Tours API
export const toursAPI = {
  async getAll(filters?: {
    category?: string;
    status?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }) {
    return apiCall(
      async () => {
        let query = supabase
          .from('tours')
          .select(`
            *,
            tour_images (
              id,
              image_url,
              alt_text,
              is_primary,
              sort_order
            ),
            tour_inclusions (
              id,
              type,
              item,
              sort_order
            )
          `);

        if (filters?.category) {
          query = query.eq('category', filters.category as any);
        }
        if (filters?.status) {
          query = query.eq('status', filters.status as any);
        }
        if (filters?.featured !== undefined) {
          query = query.eq('featured', filters.featured);
        }
        if (filters?.limit) {
          query = query.limit(filters.limit);
        }
        if (filters?.offset) {
          query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);
        }

        return query.order('created_at', { ascending: false });
      },
      'get_tours',
      'tours'
    );
  },

  async getBySlug(slug: string) {
    return apiCall(
      async () => supabase
        .from('tours')
        .select(`
          *,
          tour_images (
            id,
            image_url,
            alt_text,
            is_primary,
            sort_order
          ),
          tour_inclusions (
            id,
            type,
            item,
            sort_order
          )
        `)
        .eq('slug', sanitizeText(slug))
        .single(),
      'get_tour_by_slug',
      'tours'
    );
  },

  async create(tourData: any) {
    // Sanitize inputs
    const sanitizedData = {
      ...tourData,
      title: sanitizeText(tourData.title),
      description: sanitizeText(tourData.description),
      detailed_content: sanitizeHtml(tourData.detailed_content || ''),
      slug: sanitizeText(tourData.slug),
      itinerary: sanitizeHtml(tourData.itinerary || '')
    };

    return apiCall(
      async () => supabase
        .from('tours')
        .insert([sanitizedData])
        .select()
        .single(),
      'create_tour',
      'tours'
    );
  },

  async update(id: string, tourData: any) {
    // Sanitize inputs
    const sanitizedData = {
      ...tourData,
      title: tourData.title ? sanitizeText(tourData.title) : undefined,
      description: tourData.description ? sanitizeText(tourData.description) : undefined,
      detailed_content: tourData.detailed_content ? sanitizeHtml(tourData.detailed_content) : undefined,
      slug: tourData.slug ? sanitizeText(tourData.slug) : undefined,
      itinerary: tourData.itinerary ? sanitizeHtml(tourData.itinerary) : undefined,
      updated_at: new Date().toISOString()
    };

    return apiCall(
      async () => supabase
        .from('tours')
        .update(sanitizedData)
        .eq('id', id)
        .select()
        .single(),
      'update_tour',
      'tours'
    );
  },

  async delete(id: string) {
    return apiCall(
      async () => supabase
        .from('tours')
        .delete()
        .eq('id', id),
      'delete_tour',
      'tours'
    );
  }
};

// Inquiries API
export const inquiriesAPI = {
  async getContactSubmissions(filters?: {
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    return apiCall(
      async () => {
        let query = supabase.from('contact_submissions').select('*');
        
        if (filters?.status) {
          query = query.eq('status', filters.status as any);
        }
        if (filters?.limit) {
          query = query.limit(filters.limit);
        }
        if (filters?.offset) {
          query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);
        }

        return query.order('created_at', { ascending: false });
      },
      'get_contact_submissions',
      'contact_submissions'
    );
  },

  async getTourInquiries(filters?: {
    status?: string;
    tour_id?: string;
    limit?: number;
    offset?: number;
  }) {
    return apiCall(
      async () => {
        let query = supabase
          .from('tour_inquiries')
          .select(`
            *,
            tours (
              id,
              title,
              slug
            )
          `);
        
        if (filters?.status) {
          query = query.eq('status', filters.status as any);
        }
        if (filters?.tour_id) {
          query = query.eq('tour_id', filters.tour_id);
        }
        if (filters?.limit) {
          query = query.limit(filters.limit);
        }
        if (filters?.offset) {
          query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);
        }

        return query.order('created_at', { ascending: false });
      },
      'get_tour_inquiries',
      'tour_inquiries'
    );
  },

  async updateInquiry(table: 'contact_submissions' | 'tour_inquiries', id: string, data: any) {
    const sanitizedData = {
      ...data,
      admin_notes: data.admin_notes ? sanitizeHtml(data.admin_notes) : undefined,
      updated_at: new Date().toISOString()
    };

    return apiCall(
      async () => supabase
        .from(table)
        .update(sanitizedData)
        .eq('id', id)
        .select()
        .single(),
      'update_inquiry',
      table
    );
  }
};

// Homepage Content API
export const homepageAPI = {
  async getContent(sectionName?: string) {
    return apiCall(
      async () => {
        let query = supabase.from('homepage_content').select('*').eq('is_active', true);
        
        if (sectionName) {
          query = query.eq('section_name', sanitizeText(sectionName));
        }

        return query.order('created_at', { ascending: false });
      },
      'get_homepage_content',
      'homepage_content'
    );
  },

  async updateContent(id: string, content: any) {
    return apiCall(
      async () => supabase
        .from('homepage_content')
        .update({
          content,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single(),
      'update_homepage_content',
      'homepage_content'
    );
  }
};

// Site Settings API
export const settingsAPI = {
  async getSettings(isPublic?: boolean) {
    return apiCall(
      async () => {
        let query = supabase.from('site_settings').select('*');
        
        if (isPublic !== undefined) {
          query = query.eq('is_public', isPublic);
        }

        return query.order('setting_key');
      },
      'get_site_settings',
      'site_settings'
    );
  },

  async updateSetting(key: string, value: any, description?: string) {
    const sanitizedKey = sanitizeText(key);
    const sanitizedDescription = description ? sanitizeText(description) : undefined;

    return apiCall(
      async () => supabase
        .from('site_settings')
        .upsert({
          setting_key: sanitizedKey,
          setting_value: value,
          description: sanitizedDescription,
          updated_at: new Date().toISOString()
        })
        .select()
        .single(),
      'update_site_setting',
      'site_settings'
    );
  }
};

// Admin Users API
export const adminAPI = {
  async getUsers() {
    return apiCall(
      async () => supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false }),
      'get_admin_users',
      'admin_users'
    );
  },

  async updateUser(id: string, userData: any) {
    const sanitizedData = {
      ...userData,
      full_name: userData.full_name ? sanitizeText(userData.full_name) : undefined,
      email: userData.email ? sanitizeText(userData.email) : undefined,
      updated_at: new Date().toISOString()
    };

    return apiCall(
      async () => supabase
        .from('admin_users')
        .update(sanitizedData)
        .eq('id', id)
        .select()
        .single(),
      'update_admin_user',
      'admin_users'
    );
  }
};

// Error handler for UI
export function handleAPIError(error: unknown, fallbackMessage = "An error occurred") {
  if (error instanceof APIError) {
    toast.error(error.message);
    return error;
  }
  
  console.error('Unexpected error:', error);
  toast.error(fallbackMessage);
  return new APIError(fallbackMessage, 500);
}