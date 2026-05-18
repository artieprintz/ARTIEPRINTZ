import { supabase, isSupabaseConfigured } from '../lib/supabase';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  size?: string;
  variant?: string;
  option?: string;
  custom_size?: string;
  upload_url?: string | null;
}

export interface OrderInput {
  customer_name: string;
  phone: string;
  address: string;
  total: number;
}

export interface Order {
  id: number;
  created_at: string;
  customer_name: string;
  phone: string;
  address: string;
  products: OrderItem[];
  total: string;
}

/* ------------------------------------------------------------------ */
/*  Table name — must match your Supabase table exactly                */
/* ------------------------------------------------------------------ */

const TABLE = 'order_data';

/* ------------------------------------------------------------------ */
/*  Local-storage helpers (fallback when Supabase is not configured)   */
/* ------------------------------------------------------------------ */

const LOCAL_KEY = 'artie_orders';

function getLocalOrders(): Order[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalOrders(orders: Order[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(orders));
}

/* ------------------------------------------------------------------ */
/*  Database service                                                   */
/* ------------------------------------------------------------------ */

export const dbService = {

  // ── GET ALL ORDERS ──────────────────────────────────────────────
  async getOrders(): Promise<Order[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from(TABLE)
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        return (data || []).map((row: any) => ({
          ...row,
          products: typeof row.products === 'string'
            ? JSON.parse(row.products)
            : (row.products || []),
        }));
      } catch (err) {
        console.error('[DB] getOrders error:', err);
      }
    }

    return getLocalOrders();
  },

  // ── CREATE ORDER ────────────────────────────────────────────────
  async createOrder(orderData: OrderInput, items: OrderItem[]): Promise<Order | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from(TABLE)
          .insert([
            {
              customer_name: orderData.customer_name,
              phone: orderData.phone,
              address: orderData.address,
              total: orderData.total.toString(),
              products: items,
            },
          ])
          .select()
          .single();

        if (error) {
          console.error('[DB] INSERT error:', error);
          throw error;
        }

        console.log('[DB] Order saved:', data);
        return data as Order;
      } catch (err) {
        console.error('[DB] createOrder error:', err);
      }
    }

    // Local fallback
    const id = Date.now();
    const newOrder: Order = {
      id,
      created_at: new Date().toISOString(),
      customer_name: orderData.customer_name,
      phone: orderData.phone,
      address: orderData.address,
      total: orderData.total.toString(),
      products: items,
    };

    const orders = getLocalOrders();
    saveLocalOrders([newOrder, ...orders]);
    return newOrder;
  },

  // ── UPDATE STATUS (no status column — update total as workaround) ─
  async updateOrderStatus(_orderId: number | string, _status: string): Promise<boolean> {
    // Note: order_data table has no 'status' column.
    // This is a no-op for now. Add a 'status' column if you need it.
    console.warn('[DB] updateOrderStatus: no status column in order_data table');
    return true;
  },

  // ── GET SINGLE ORDER ────────────────────────────────────────────
  async getOrderById(orderId: string): Promise<Order | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from(TABLE)
          .select('*')
          .eq('id', orderId)
          .single();

        if (error) throw error;

        return {
          ...data,
          products: typeof data.products === 'string'
            ? JSON.parse(data.products)
            : (data.products || []),
        } as Order;
      } catch (err) {
        console.error('[DB] getOrderById error:', err);
      }
    }

    const orders = getLocalOrders();
    return orders.find((o) => o.id.toString() === orderId.toString()) || null;
  },

  // ── FILE UPLOAD ─────────────────────────────────────────────────
  async uploadFile(file: File): Promise<string | null> {
    if (isSupabaseConfigured) {
      try {
        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from('prints')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('prints')
          .getPublicUrl(fileName);

        return publicUrl;
      } catch (err) {
        console.error('[DB] upload error:', err);
      }
    }

    // Local fallback — convert to data URL
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
};
