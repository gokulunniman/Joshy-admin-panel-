export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_active: boolean | null
          last_login: string | null
          role: Database["public"]["Enums"]["admin_role"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id: string
          is_active?: boolean | null
          last_login?: string | null
          role?: Database["public"]["Enums"]["admin_role"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          role?: Database["public"]["Enums"]["admin_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      banner_images: {
        Row: {
          alt_text: string | null
          created_at: string | null
          cta_link: string | null
          cta_text: string | null
          id: string
          image_url: string
          is_active: boolean | null
          sort_order: number | null
          subtitle: string | null
          title: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          cta_link?: string | null
          cta_text?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          sort_order?: number | null
          subtitle?: string | null
          title?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          cta_link?: string | null
          cta_text?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          sort_order?: number | null
          subtitle?: string | null
          title?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          admin_notes: string | null
          contact_whatsapp: string
          conversion_date: string | null
          created_at: string | null
          destination_interested: string
          hotel_category: Database["public"]["Enums"]["hotel_category"]
          id: string
          name: string
          nationality: string | null
          number_of_kids_and_age: string | null
          number_of_persons: number
          number_of_rooms: number
          response_date: string | null
          source_page: string | null
          special_comments: string | null
          status: Database["public"]["Enums"]["inquiry_status"] | null
          tour_days: number
          travel_date: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          contact_whatsapp: string
          conversion_date?: string | null
          created_at?: string | null
          destination_interested: string
          hotel_category: Database["public"]["Enums"]["hotel_category"]
          id?: string
          name: string
          nationality?: string | null
          number_of_kids_and_age?: string | null
          number_of_persons: number
          number_of_rooms: number
          response_date?: string | null
          source_page?: string | null
          special_comments?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"] | null
          tour_days: number
          travel_date?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          contact_whatsapp?: string
          conversion_date?: string | null
          created_at?: string | null
          destination_interested?: string
          hotel_category?: Database["public"]["Enums"]["hotel_category"]
          id?: string
          name?: string
          nationality?: string | null
          number_of_kids_and_age?: string | null
          number_of_persons?: number
          number_of_rooms?: number
          response_date?: string | null
          source_page?: string | null
          special_comments?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"] | null
          tour_days?: number
          travel_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      homepage_content: {
        Row: {
          content: Json
          created_at: string | null
          id: string
          is_active: boolean | null
          section_name: string
          updated_at: string | null
        }
        Insert: {
          content: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          section_name: string
          updated_at?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          section_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          setting_key: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          setting_key: string
          setting_value: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      tour_categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          id: string
          is_active: boolean | null
          name: Database["public"]["Enums"]["tour_category"]
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          id?: string
          is_active?: boolean | null
          name: Database["public"]["Enums"]["tour_category"]
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          id?: string
          is_active?: boolean | null
          name?: Database["public"]["Enums"]["tour_category"]
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tour_images: {
        Row: {
          alt_text: string | null
          created_at: string | null
          file_size: number | null
          id: string
          image_url: string
          is_primary: boolean | null
          mime_type: string | null
          sort_order: number | null
          tour_id: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          file_size?: number | null
          id?: string
          image_url: string
          is_primary?: boolean | null
          mime_type?: string | null
          sort_order?: number | null
          tour_id?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          file_size?: number | null
          id?: string
          image_url?: string
          is_primary?: boolean | null
          mime_type?: string | null
          sort_order?: number | null
          tour_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tour_images_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_inclusions: {
        Row: {
          created_at: string | null
          id: string
          item: string
          sort_order: number | null
          tour_id: string | null
          type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          item: string
          sort_order?: number | null
          tour_id?: string | null
          type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          item?: string
          sort_order?: number | null
          tour_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_inclusions_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_inquiries: {
        Row: {
          admin_notes: string | null
          contact_number: string
          conversion_date: string | null
          created_at: string | null
          email: string
          hotel_category: Database["public"]["Enums"]["hotel_category"]
          id: string
          message: string | null
          name: string
          nationality: string | null
          number_of_kids_and_age: string | null
          number_of_persons: number
          number_of_rooms: number
          preferred_dates: string | null
          response_date: string | null
          special_comments: string | null
          status: Database["public"]["Enums"]["inquiry_status"] | null
          tour_id: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          contact_number: string
          conversion_date?: string | null
          created_at?: string | null
          email: string
          hotel_category: Database["public"]["Enums"]["hotel_category"]
          id?: string
          message?: string | null
          name: string
          nationality?: string | null
          number_of_kids_and_age?: string | null
          number_of_persons: number
          number_of_rooms: number
          preferred_dates?: string | null
          response_date?: string | null
          special_comments?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"] | null
          tour_id?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          contact_number?: string
          conversion_date?: string | null
          created_at?: string | null
          email?: string
          hotel_category?: Database["public"]["Enums"]["hotel_category"]
          id?: string
          message?: string | null
          name?: string
          nationality?: string | null
          number_of_kids_and_age?: string | null
          number_of_persons?: number
          number_of_rooms?: number
          preferred_dates?: string | null
          response_date?: string | null
          special_comments?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"] | null
          tour_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tour_inquiries_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      tours: {
        Row: {
          category: Database["public"]["Enums"]["tour_category"]
          created_at: string | null
          currency: string | null
          description: string
          detailed_content: string | null
          duration: number
          featured: boolean | null
          id: string
          itinerary: string | null
          map_location: Json | null
          price: number | null
          seo_meta: Json | null
          show_on_homepage: boolean | null
          slug: string
          status: Database["public"]["Enums"]["tour_status"] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          category: Database["public"]["Enums"]["tour_category"]
          created_at?: string | null
          currency?: string | null
          description: string
          detailed_content?: string | null
          duration: number
          featured?: boolean | null
          id?: string
          itinerary?: string | null
          map_location?: Json | null
          price?: number | null
          seo_meta?: Json | null
          show_on_homepage?: boolean | null
          slug: string
          status?: Database["public"]["Enums"]["tour_status"] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          category?: Database["public"]["Enums"]["tour_category"]
          created_at?: string | null
          currency?: string | null
          description?: string
          detailed_content?: string | null
          duration?: number
          featured?: boolean | null
          id?: string
          itinerary?: string | null
          map_location?: Json | null
          price?: number | null
          seo_meta?: Json | null
          show_on_homepage?: boolean | null
          slug?: string
          status?: Database["public"]["Enums"]["tour_status"] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      admin_role: "super_admin" | "admin" | "editor"
      hotel_category: "1★" | "2★" | "3★" | "4★" | "5★"
      inquiry_status:
        | "new"
        | "in_progress"
        | "quoted"
        | "booked"
        | "resolved"
        | "closed"
        | "cancelled"
      tour_category:
        | "kerala"
        | "discover-india"
        | "ayurveda"
        | "heritage"
        | "global"
      tour_status: "draft" | "published" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_role: ["super_admin", "admin", "editor"],
      hotel_category: ["1★", "2★", "3★", "4★", "5★"],
      inquiry_status: [
        "new",
        "in_progress",
        "quoted",
        "booked",
        "resolved",
        "closed",
        "cancelled",
      ],
      tour_category: [
        "kerala",
        "discover-india",
        "ayurveda",
        "heritage",
        "global",
      ],
      tour_status: ["draft", "published", "archived"],
    },
  },
} as const
