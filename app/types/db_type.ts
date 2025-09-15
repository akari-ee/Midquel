export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      archive: {
        Row: {
          homepage_featured: boolean | null
          id: number
          images: Json | null
          info: string
          location: string | null
          slug: string | null
          tag: string | null
          tagline: string
          thumbnail_image: string
          title: string
          year: string | null
        }
        Insert: {
          homepage_featured?: boolean | null
          id?: number
          images?: Json | null
          info: string
          location?: string | null
          slug?: string | null
          tag?: string | null
          tagline: string
          thumbnail_image: string
          title: string
          year?: string | null
        }
        Update: {
          homepage_featured?: boolean | null
          id?: number
          images?: Json | null
          info?: string
          location?: string | null
          slug?: string | null
          tag?: string | null
          tagline?: string
          thumbnail_image?: string
          title?: string
          year?: string | null
        }
        Relationships: []
      }
      film: {
        Row: {
          aperture: string | null
          camera: string | null
          date: string | null
          id: number
          image: string | null
          iso: string | null
          lens: string | null
          location: string | null
          slug: string | null
          speed: string | null
          title: string
          video: string | null
        }
        Insert: {
          aperture?: string | null
          camera?: string | null
          date?: string | null
          id?: number
          image?: string | null
          iso?: string | null
          lens?: string | null
          location?: string | null
          slug?: string | null
          speed?: string | null
          title: string
          video?: string | null
        }
        Update: {
          aperture?: string | null
          camera?: string | null
          date?: string | null
          id?: number
          image?: string | null
          iso?: string | null
          lens?: string | null
          location?: string | null
          slug?: string | null
          speed?: string | null
          title?: string
          video?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          email: string | null
          id: number
          image: string | null
          info: string | null
          name: string
          phone: string | null
          role: string | null
        }
        Insert: {
          email?: string | null
          id?: number
          image?: string | null
          info?: string | null
          name: string
          phone?: string | null
          role?: string | null
        }
        Update: {
          email?: string | null
          id?: number
          image?: string | null
          info?: string | null
          name?: string
          phone?: string | null
          role?: string | null
        }
        Relationships: []
      }
      social_link: {
        Row: {
          href: string
          id: number
          label: string
          type: Database["public"]["Enums"]["social_type"]
        }
        Insert: {
          href: string
          id?: number
          label: string
          type: Database["public"]["Enums"]["social_type"]
        }
        Update: {
          href?: string
          id?: number
          label?: string
          type?: Database["public"]["Enums"]["social_type"]
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
      social_platform: "instagram" | "x" | "youtube" | "behance" | "website"
      social_type: "email" | "instagram" | "github"
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
      social_platform: ["instagram", "x", "youtube", "behance", "website"],
      social_type: ["email", "instagram", "github"],
    },
  },
} as const
