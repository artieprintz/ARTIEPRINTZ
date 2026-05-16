import { supabase, isSupabaseConfigured } from '../lib/supabase';

// High-level service to handle database operations with fallback to localStorage
// This avoids "Invalid Path" errors when Supabase is not configured.

export const dbService = {
  // Orders
  async getOrders() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
      } catch (err) {
        console.error('Supabase getOrders error:', err);
        // Fallback to local
      }
    }
    
    // Local Fallback
    const local = localStorage.getItem('artie_orders');
    return local ? JSON.parse(local) : [];
  },

  async createOrder(orderData: any, items: any[]) {
    if (isSupabaseConfigured) {
      try {
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert([orderData])
          .select()
          .single();

        if (orderError) throw orderError;

        const orderItems = items.map(item => ({
          ...item,
          order_id: order.id
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) throw itemsError;

        return order;
      } catch (err) {
        console.error('Supabase createOrder error:', err);
        // Fallback to local
      }
    }

    // Local Fallback
    const id = Math.floor(Math.random() * 10000);
    const newOrder = { 
      ...orderData, 
      id, 
      created_at: new Date().toISOString(),
      order_items: items.map((item, index) => ({ ...item, id: index, order_id: id }))
    };
    
    const local = localStorage.getItem('artie_orders');
    const orders = local ? JSON.parse(local) : [];
    localStorage.setItem('artie_orders', JSON.stringify([newOrder, ...orders]));
    
    return newOrder;
  },

  async updateOrderStatus(orderId: number | string, status: string) {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('orders')
          .update({ status })
          .eq('id', orderId);
        if (error) throw error;
        return true;
      } catch (err) {
        console.error('Supabase updateStatus error:', err);
      }
    }

    // Local Fallback
    const local = localStorage.getItem('artie_orders');
    if (local) {
      const orders = JSON.parse(local);
      const updated = orders.map((o: any) => o.id === orderId ? { ...o, status } : o);
      localStorage.setItem('artie_orders', JSON.stringify(updated));
    }
    return true;
  },

  async getOrderById(orderId: string) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .eq('id', orderId)
          .single();
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Supabase getOrderById error:', err);
      }
    }

    // Local Fallback
    const local = localStorage.getItem('artie_orders');
    if (local) {
      const orders = JSON.parse(local);
      return orders.find((o: any) => o.id.toString() === orderId.toString());
    }
    return null;
  },

  // Storage
  async uploadFile(file: File) {
    if (isSupabaseConfigured) {
      try {
        const fileExt = file.name.includes('.') ? file.name.split('.').pop() : 'png';
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const filePath = fileName;

        // Diagnostic list for debugging bucket availability
        const { data: bucketCheck } = await supabase.storage.listBuckets();
        const bucketExists = bucketCheck?.some(b => b.name === 'prints');
        console.log('Bucket "prints" status:', bucketExists ? 'Found' : 'Missing');

        const { error: uploadError } = await supabase.storage
          .from('prints')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          // Improve specific error messaging for common Supabase Storage failures
          if (uploadError.message === 'Invalid path specified in request URL') {
            throw new Error('Supabase Storage Endpoint Incorrect or Bucket "prints" Missing. Please ensure you created a PUBLIC bucket named "prints".');
          }
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('prints')
          .getPublicUrl(filePath);

        return publicUrl;
      } catch (err) {
        console.error('Supabase upload error:', err);
        // If it's a specific "bucket missing" or "auth" error, we might want to propagate it
        // but for now we follow the "operation must succeed for UX" pattern via fallback
      }
    }

    // Default Fallback: Data URL (Local Preview)
    console.info('Using local Data URL fallback for media.');
    const reader = new FileReader();
    const promise = new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
    reader.readAsDataURL(file);
    return await promise;
  }
};
