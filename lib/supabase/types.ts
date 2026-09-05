export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          slug: string
          tagline: string | null
          description: string
          category: string
          fabric_details: string
          construction: string | null
          price_kes: number
          price_usd: number
          images: string[]
          is_featured: boolean
          is_in_stock: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          tagline?: string | null
          description: string
          category: string
          fabric_details: string
          construction?: string | null
          price_kes: number
          price_usd: number
          images?: string[]
          is_featured?: boolean
          is_in_stock?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          tagline?: string | null
          description?: string
          category?: string
          fabric_details?: string
          construction?: string | null
          price_kes?: number
          price_usd?: number
          images?: string[]
          is_featured?: boolean
          is_in_stock?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          size: string
          color: string
          stock_quantity: number
          sku: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          size: string
          color: string
          stock_quantity?: number
          sku: string
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          size?: string
          color?: string
          stock_quantity?: number
          sku?: string
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          client_name: string
          client_email: string
          client_phone: string
          fitting_type: string
          location_type: string
          appointment_date: string
          time_slot: string
          status: string
          notes: string | null
          sartorial_preferences: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          client_name: string
          client_email: string
          client_phone: string
          fitting_type: string
          location_type: string
          appointment_date: string
          time_slot: string
          status?: string
          notes?: string | null
          sartorial_preferences?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          client_email?: string
          client_phone?: string
          fitting_type?: string
          location_type?: string
          appointment_date?: string
          time_slot?: string
          status?: string
          notes?: string | null
          sartorial_preferences?: Json | null
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          customer_name: string
          customer_email: string
          customer_phone: string
          shipping_address: Json
          total_amount_kes: number
          currency: string
          payment_status: string
          fulfillment_status: string
          white_glove_delivery: boolean
          gift_wrap: boolean
          special_instructions: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_number: string
          customer_name: string
          customer_email: string
          customer_phone: string
          shipping_address: Json
          total_amount_kes: number
          currency?: string
          payment_status?: string
          fulfillment_status?: string
          white_glove_delivery?: boolean
          gift_wrap?: boolean
          special_instructions?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          shipping_address?: Json
          total_amount_kes?: number
          currency?: string
          payment_status?: string
          fulfillment_status?: string
          white_glove_delivery?: boolean
          gift_wrap?: boolean
          special_instructions?: string | null
          created_at?: string
        }
      }
      bespoke_inquiries: {
        Row: {
          id: string
          client_name: string
          client_email: string
          client_phone: string | null
          category: string
          garment_specifications: Json
          estimated_price_kes: number | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          client_name: string
          client_email: string
          client_phone?: string | null
          category: string
          garment_specifications: Json
          estimated_price_kes?: number | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          client_email?: string
          client_phone?: string | null
          category?: string
          garment_specifications?: Json
          estimated_price_kes?: number | null
          status?: string
          created_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

