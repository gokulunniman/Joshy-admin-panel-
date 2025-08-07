-- CRITICAL SECURITY FIX: Enable RLS and Add Security Policies

-- Enable Row Level Security on all tables
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_inclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banner_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create security definer function to safely check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() 
    AND is_active = true 
    AND role IN ('admin', 'super_admin')
  );
$$;

-- Create function to check if user is authenticated
CREATE OR REPLACE FUNCTION public.is_authenticated()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT auth.uid() IS NOT NULL;
$$;

-- TOURS TABLE POLICIES
CREATE POLICY "Public can view published tours" ON public.tours
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins have full access to tours" ON public.tours
  FOR ALL USING (public.is_admin());

-- TOUR CATEGORIES POLICIES  
CREATE POLICY "Public can view active categories" ON public.tour_categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins have full access to categories" ON public.tour_categories
  FOR ALL USING (public.is_admin());

-- TOUR IMAGES POLICIES
CREATE POLICY "Public can view tour images" ON public.tour_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tours 
      WHERE tours.id = tour_images.tour_id 
      AND tours.status = 'published'
    )
  );

CREATE POLICY "Admins have full access to tour images" ON public.tour_images
  FOR ALL USING (public.is_admin());

-- TOUR INCLUSIONS POLICIES
CREATE POLICY "Public can view tour inclusions" ON public.tour_inclusions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tours 
      WHERE tours.id = tour_inclusions.tour_id 
      AND tours.status = 'published'
    )
  );

CREATE POLICY "Admins have full access to tour inclusions" ON public.tour_inclusions
  FOR ALL USING (public.is_admin());

-- CONTACT SUBMISSIONS POLICIES (Admin only)
CREATE POLICY "Only admins can access contact submissions" ON public.contact_submissions
  FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone can insert contact submissions" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

-- TOUR INQUIRIES POLICIES (Admin only)
CREATE POLICY "Only admins can access tour inquiries" ON public.tour_inquiries
  FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone can insert tour inquiries" ON public.tour_inquiries
  FOR INSERT WITH CHECK (true);

-- HOMEPAGE CONTENT POLICIES
CREATE POLICY "Public can view active homepage content" ON public.homepage_content
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins have full access to homepage content" ON public.homepage_content
  FOR ALL USING (public.is_admin());

-- BANNER IMAGES POLICIES
CREATE POLICY "Public can view active banner images" ON public.banner_images
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins have full access to banner images" ON public.banner_images
  FOR ALL USING (public.is_admin());

-- SITE SETTINGS POLICIES
CREATE POLICY "Public can view public site settings" ON public.site_settings
  FOR SELECT USING (is_public = true);

CREATE POLICY "Admins have full access to site settings" ON public.site_settings
  FOR ALL USING (public.is_admin());

-- ADMIN USERS POLICIES (Super restricted)
CREATE POLICY "Admins can view admin users" ON public.admin_users
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Super admins can manage admin users" ON public.admin_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid() 
      AND is_active = true 
      AND role = 'super_admin'
    )
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.tours TO anon;
GRANT SELECT ON public.tour_categories TO anon;
GRANT SELECT ON public.tour_images TO anon;
GRANT SELECT ON public.tour_inclusions TO anon;
GRANT SELECT ON public.homepage_content TO anon;
GRANT SELECT ON public.banner_images TO anon;
GRANT SELECT ON public.site_settings TO anon;
GRANT INSERT ON public.contact_submissions TO anon;
GRANT INSERT ON public.tour_inquiries TO anon;

-- Grant full access to authenticated users (will be restricted by RLS)
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;