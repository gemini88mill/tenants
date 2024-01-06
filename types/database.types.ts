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
      address_type: {
        Row: {
          address_type: string
          id: number
        }
        Insert: {
          address_type: string
          id?: number
        }
        Update: {
          address_type?: string
          id?: number
        }
        Relationships: []
      }
      addresses: {
        Row: {
          address_id: number
          address_type: number | null
          audit_info: number
          city: string | null
          country: string | null
          postal_code: string | null
          state_province: string | null
          street_address: string | null
          street_address_2: string | null
        }
        Insert: {
          address_id?: number
          address_type?: number | null
          audit_info: number
          city?: string | null
          country?: string | null
          postal_code?: string | null
          state_province?: string | null
          street_address?: string | null
          street_address_2?: string | null
        }
        Update: {
          address_id?: number
          address_type?: number | null
          audit_info?: number
          city?: string | null
          country?: string | null
          postal_code?: string | null
          state_province?: string | null
          street_address?: string | null
          street_address_2?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_address_type_fkey"
            columns: ["address_type"]
            isOneToOne: false
            referencedRelation: "address_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "addresses_audit_info_fkey"
            columns: ["audit_info"]
            isOneToOne: false
            referencedRelation: "audit_info"
            referencedColumns: ["id"]
          }
        ]
      }
      audit_info: {
        Row: {
          created_at: string
          created_by: string | null
          edited_at: string | null
          editied_by: string | null
          id: number
        }
        Insert: {
          created_at: string
          created_by?: string | null
          edited_at?: string | null
          editied_by?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          edited_at?: string | null
          editied_by?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "audit_info_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_info_editied_by_fkey"
            columns: ["editied_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      contact_types: {
        Row: {
          id: number
          type: string
        }
        Insert: {
          id?: number
          type: string
        }
        Update: {
          id?: number
          type?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          audit_info: number
          contact: string | null
          contact_type: number | null
          id: number
          is_primary: boolean | null
          sms_ok: boolean | null
        }
        Insert: {
          audit_info: number
          contact?: string | null
          contact_type?: number | null
          id?: number
          is_primary?: boolean | null
          sms_ok?: boolean | null
        }
        Update: {
          audit_info?: number
          contact?: string | null
          contact_type?: number | null
          id?: number
          is_primary?: boolean | null
          sms_ok?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_audit_info_fkey"
            columns: ["audit_info"]
            isOneToOne: false
            referencedRelation: "audit_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_contact_type_fkey"
            columns: ["contact_type"]
            isOneToOne: false
            referencedRelation: "contact_types"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          address: number | null
          audit_key: number | null
          auth_id: string
          birth_date: string | null
          first_name: string
          last_name: string
          middle_name: string | null
          occupation: string | null
          profile_id: number
        }
        Insert: {
          address?: number | null
          audit_key?: number | null
          auth_id?: string
          birth_date?: string | null
          first_name?: string
          last_name?: string
          middle_name?: string | null
          occupation?: string | null
          profile_id?: number
        }
        Update: {
          address?: number | null
          audit_key?: number | null
          auth_id?: string
          birth_date?: string | null
          first_name?: string
          last_name?: string
          middle_name?: string | null
          occupation?: string | null
          profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "profiles_address_fkey"
            columns: ["address"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "profiles_audit_key_fkey"
            columns: ["audit_key"]
            isOneToOne: false
            referencedRelation: "audit_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tenants: {
        Row: {
          address: number | null
          audit_key: number
          lease_end_date: string | null
          lease_start_date: string | null
          profile: number | null
          property_id: number | null
          tenant_id: number
          user_id: string | null
        }
        Insert: {
          address?: number | null
          audit_key: number
          lease_end_date?: string | null
          lease_start_date?: string | null
          profile?: number | null
          property_id?: number | null
          tenant_id?: number
          user_id?: string | null
        }
        Update: {
          address?: number | null
          audit_key?: number
          lease_end_date?: string | null
          lease_start_date?: string | null
          profile?: number | null
          property_id?: number | null
          tenant_id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenants_address_fkey"
            columns: ["address"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "tenants_audit_key_fkey"
            columns: ["audit_key"]
            isOneToOne: false
            referencedRelation: "audit_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenants_profile_fkey"
            columns: ["profile"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "tenants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
