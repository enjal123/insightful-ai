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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      platform_connections: {
        Row: {
          access_token: string
          business_email: string | null
          business_id: string
          business_name: string | null
          connected_at: string
          id: string
          is_active: boolean | null
          last_synced_at: string | null
          metadata: Json | null
          platform: Database["public"]["Enums"]["review_platform"]
          refresh_token: string | null
          token_expires_at: string | null
          user_id: string
        }
        Insert: {
          access_token: string
          business_email?: string | null
          business_id: string
          business_name?: string | null
          connected_at?: string
          id?: string
          is_active?: boolean | null
          last_synced_at?: string | null
          metadata?: Json | null
          platform: Database["public"]["Enums"]["review_platform"]
          refresh_token?: string | null
          token_expires_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string
          business_email?: string | null
          business_id?: string
          business_name?: string | null
          connected_at?: string
          id?: string
          is_active?: boolean | null
          last_synced_at?: string | null
          metadata?: Json | null
          platform?: Database["public"]["Enums"]["review_platform"]
          refresh_token?: string | null
          token_expires_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      review_responses: {
        Row: {
          ai_generated: boolean | null
          ai_length: string | null
          ai_tone: string | null
          created_at: string
          id: string
          is_from_platform: boolean | null
          response_date: string
          response_text: string
          review_id: string
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean | null
          ai_length?: string | null
          ai_tone?: string | null
          created_at?: string
          id?: string
          is_from_platform?: boolean | null
          response_date?: string
          response_text: string
          review_id: string
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean | null
          ai_length?: string | null
          ai_tone?: string | null
          created_at?: string
          id?: string
          is_from_platform?: boolean | null
          response_date?: string
          response_text?: string
          review_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_responses_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      reviewer_profiles: {
        Row: {
          created_at: string
          id: string
          is_elite: boolean | null
          local_guide_level: number | null
          location: string | null
          metadata: Json | null
          platform: Database["public"]["Enums"]["review_platform"]
          platform_reviewer_id: string
          profile_photo: string | null
          profile_url: string | null
          reviewer_name: string
          total_reviews: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_elite?: boolean | null
          local_guide_level?: number | null
          location?: string | null
          metadata?: Json | null
          platform: Database["public"]["Enums"]["review_platform"]
          platform_reviewer_id: string
          profile_photo?: string | null
          profile_url?: string | null
          reviewer_name: string
          total_reviews?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_elite?: boolean | null
          local_guide_level?: number | null
          location?: string | null
          metadata?: Json | null
          platform?: Database["public"]["Enums"]["review_platform"]
          platform_reviewer_id?: string
          profile_photo?: string | null
          profile_url?: string | null
          reviewer_name?: string
          total_reviews?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          ai_replied: boolean | null
          author_name: string
          author_profile_photo: string | null
          created_at: string
          helpful_count: number | null
          id: string
          is_replied: boolean | null
          language: string | null
          likes_count: number | null
          platform: Database["public"]["Enums"]["review_platform"]
          platform_connection_id: string
          platform_review_id: string
          rating: number
          review_date: string
          review_photos: string[] | null
          review_text: string | null
          reviewer_profile_id: string | null
          sentiment: Database["public"]["Enums"]["review_sentiment"] | null
          updated_at: string
          verified_purchase: boolean | null
        }
        Insert: {
          ai_replied?: boolean | null
          author_name: string
          author_profile_photo?: string | null
          created_at?: string
          helpful_count?: number | null
          id?: string
          is_replied?: boolean | null
          language?: string | null
          likes_count?: number | null
          platform: Database["public"]["Enums"]["review_platform"]
          platform_connection_id: string
          platform_review_id: string
          rating: number
          review_date: string
          review_photos?: string[] | null
          review_text?: string | null
          reviewer_profile_id?: string | null
          sentiment?: Database["public"]["Enums"]["review_sentiment"] | null
          updated_at?: string
          verified_purchase?: boolean | null
        }
        Update: {
          ai_replied?: boolean | null
          author_name?: string
          author_profile_photo?: string | null
          created_at?: string
          helpful_count?: number | null
          id?: string
          is_replied?: boolean | null
          language?: string | null
          likes_count?: number | null
          platform?: Database["public"]["Enums"]["review_platform"]
          platform_connection_id?: string
          platform_review_id?: string
          rating?: number
          review_date?: string
          review_photos?: string[] | null
          review_text?: string | null
          reviewer_profile_id?: string | null
          sentiment?: Database["public"]["Enums"]["review_sentiment"] | null
          updated_at?: string
          verified_purchase?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_platform_connection_id_fkey"
            columns: ["platform_connection_id"]
            isOneToOne: false
            referencedRelation: "platform_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_profile_id_fkey"
            columns: ["reviewer_profile_id"]
            isOneToOne: false
            referencedRelation: "reviewer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      review_platform: "google" | "yelp"
      review_sentiment: "positive" | "neutral" | "negative"
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
      review_platform: ["google", "yelp"],
      review_sentiment: ["positive", "neutral", "negative"],
    },
  },
} as const
