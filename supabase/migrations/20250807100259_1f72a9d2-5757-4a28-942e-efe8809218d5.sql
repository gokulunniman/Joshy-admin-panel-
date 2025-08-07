-- Create comprehensive schema for Kerala Tours Admin Panel
-- Based on PRD §2-5 and technical specification

-- ============================================================================
-- 1. ENUMS AND TYPES
-- ============================================================================

-- Tour categories matching PRD §2.1 Navigation
CREATE TYPE tour_category AS ENUM ('kerala', 'discover-india', 'ayurveda', 'heritage', 'global');

-- Tour status for publishing workflow
CREATE TYPE tour_status AS ENUM ('draft', 'published', 'archived');

-- Hotel categories for inquiries
CREATE TYPE hotel_category AS ENUM ('1★', '2★', '3★', '4★', '5★');

-- Inquiry statuses for admin workflow
CREATE TYPE inquiry_status AS ENUM ('new', 'in_progress', 'quoted', 'booked', 'resolved', 'closed', 'cancelled');

-- Admin roles for access control
CREATE TYPE admin_role AS ENUM ('super_admin', 'admin', 'editor');

-- ============================================================================
-- 2. CORE TABLES
-- ============================================================================

-- Tour Categories (PRD §2.1)
CREATE TABLE public.tour_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name tour_category UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tours Master Table (PRD §2.2, Technical Spec §4.2)
CREATE TABLE public.tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  detailed_content TEXT,
  category tour_category NOT NULL,
  duration INTEGER NOT NULL, -- days
  price DECIMAL(10,2),
  currency TEXT DEFAULT '₹',
  slug TEXT UNIQUE NOT NULL,
  featured BOOLEAN DEFAULT false,
  show_on_homepage BOOLEAN DEFAULT false,
  status tour_status DEFAULT 'draft',
  itinerary TEXT,
  map_location JSONB, -- {lat: number, lng: number}
  seo_meta JSONB, -- {title, description, keywords[]}
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tour Images (Technical Spec §8.1)
CREATE TABLE public.tour_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES public.tours(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  file_size INTEGER,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tour Inclusions/Exclusions (Technical Spec §2.1)
CREATE TABLE public.tour_inclusions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES public.tours(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('inclusion', 'exclusion')),
  item TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- 3. HOMEPAGE CONTENT MANAGEMENT (PRD §5.2.6)
-- ============================================================================

-- Homepage Content (PRD §1.1, §1.2, §1.3)
CREATE TABLE public.homepage_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name TEXT UNIQUE NOT NULL, -- 'hero_banner', 'about_us', 'featured_tours'
  content JSONB NOT NULL, -- Flexible JSON structure for different section types
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Banner Images for Homepage (PRD §1.1)
CREATE TABLE public.banner_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  alt_text TEXT,
  title TEXT,
  subtitle TEXT,
  cta_text TEXT,
  cta_link TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- 4. INQUIRIES MANAGEMENT (PRD §5.2.5)
-- ============================================================================

-- Contact Submissions (PRD §5.1)
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  nationality TEXT,
  contact_whatsapp TEXT NOT NULL,
  destination_interested TEXT NOT NULL,
  number_of_persons INTEGER NOT NULL,
  number_of_kids_and_age TEXT,
  number_of_rooms INTEGER NOT NULL,
  tour_days INTEGER NOT NULL,
  travel_date DATE,
  hotel_category hotel_category NOT NULL,
  special_comments TEXT,
  source_page TEXT DEFAULT 'contact', -- 'homepage', 'contact', 'tour_detail'
  status inquiry_status DEFAULT 'new',
  admin_notes TEXT,
  response_date TIMESTAMPTZ,
  conversion_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tour-specific Inquiries (Technical Spec §2.1)
CREATE TABLE public.tour_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES public.tours(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  nationality TEXT,
  contact_number TEXT NOT NULL,
  number_of_persons INTEGER NOT NULL,
  number_of_kids_and_age TEXT,
  preferred_dates TEXT,
  hotel_category hotel_category NOT NULL,
  number_of_rooms INTEGER NOT NULL,
  special_comments TEXT,
  message TEXT,
  status inquiry_status DEFAULT 'new',
  admin_notes TEXT,
  response_date TIMESTAMPTZ,
  conversion_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- 5. SITE SETTINGS & ADMIN (PRD §3, §4)
-- ============================================================================

-- Site Settings (PRD §3.1, §3.2, §3.3, §3.4)
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false, -- Whether accessible to anon users
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Admin Users (Technical Spec §2.1)
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role admin_role DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- 6. INDEXES FOR PERFORMANCE
-- ============================================================================

-- Tours indexes
CREATE INDEX idx_tours_category ON public.tours(category);
CREATE INDEX idx_tours_status ON public.tours(status);
CREATE INDEX idx_tours_featured ON public.tours(featured);
CREATE INDEX idx_tours_slug ON public.tours(slug);
CREATE INDEX idx_tours_created_at ON public.tours(created_at DESC);

-- Inquiries indexes  
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX idx_tour_inquiries_status ON public.tour_inquiries(status);
CREATE INDEX idx_tour_inquiries_tour_id ON public.tour_inquiries(tour_id);
CREATE INDEX idx_tour_inquiries_created_at ON public.tour_inquiries(created_at DESC);

-- Images indexes
CREATE INDEX idx_tour_images_tour_id ON public.tour_images(tour_id);
CREATE INDEX idx_tour_images_is_primary ON public.tour_images(is_primary);
CREATE INDEX idx_banner_images_sort_order ON public.banner_images(sort_order);

-- ============================================================================
-- 7. TRIGGERS FOR UPDATED_AT
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to relevant tables
CREATE TRIGGER update_tours_updated_at
  BEFORE UPDATE ON public.tours
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_homepage_content_updated_at
  BEFORE UPDATE ON public.homepage_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tour_inquiries_updated_at
  BEFORE UPDATE ON public.tour_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- 8. INITIAL DATA SEEDING
-- ============================================================================

-- Insert tour categories (PRD §2.1)
INSERT INTO public.tour_categories (name, display_name, description, slug) VALUES
('kerala', 'Kerala Tours', 'Explore the backwaters and beauty of Kerala', 'kerala'),
('discover-india', 'Discover India', 'Journey through incredible India', 'discover-india'),
('ayurveda', 'Ayurveda', 'Wellness and healing experiences', 'ayurveda'),
('heritage', 'Heritage Tours', 'Historical and cultural experiences', 'heritage'),
('global', 'Global Holidays', 'International destinations', 'global');

-- Insert basic site settings (PRD §3)
INSERT INTO public.site_settings (setting_key, setting_value, description, is_public) VALUES
('contact_info', '{"address": "Kerala, India", "phone": "+91 0000 0000", "email": "KeralaTours Global@gmail.com", "whatsapp": "+91 0000 0000"}', 'Contact information', true),
('social_links', '{"facebook": "", "instagram": "", "twitter": "", "youtube": ""}', 'Social media links', true),
('company_info', '{"name": "Kerala Tours Global", "tagline": "Your Gateway to Incredible Journeys"}', 'Company information', true);

-- Insert default homepage sections (PRD §1)
INSERT INTO public.homepage_content (section_name, content) VALUES
('about_us', '{"title": "About Us - Namaste", "description": "Welcome to Kerala Tours Global, your trusted partner for incredible journeys across India and beyond.", "features": []}'),
('hero_settings', '{"auto_rotation": 5000, "transition_duration": 1000}');