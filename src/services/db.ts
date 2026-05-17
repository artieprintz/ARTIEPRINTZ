import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const dbService = {

// GET ALL ORDERS
async getOrders() {
if (isSupabaseConfigured) {
try {
const { data, error } = await supabase
.from('order_data')
.select('*')
.order('created_at', { ascending: false });

```
    if (error) throw error;

    return data || [];

  } catch (err) {
    console.error('Supabase getOrders error:', err);
  }
}

// Local fallback
const local = localStorage.getItem('artie_orders');
return local ? JSON.parse(local) : [];
```

},

// CREATE ORDER
async createOrder(orderData: any, items: any[]) {

```
if (isSupabaseConfigured) {
  try {

    const { data, error } = await supabase
      .from('order_data')
      .insert([
        {
          customer_name: orderData.customer_name,
          phone: orderData.phone,
          address: orderData.address,
          products: items,
          total: orderData.total.toString(),
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('SUPABASE INSERT ERROR:', error);
      throw error;
    }

    console.log('ORDER SAVED:', data);

    return data;

  } catch (err) {
    console.error('Supabase createOrder error:', err);
  }
}

// Local fallback
const id = Math.floor(Math.random() * 10000);

const newOrder = {
  ...orderData,
  id,
  created_at: new Date().toISOString(),
  products: items
};

const local = localStorage.getItem('artie_orders');
const orders = local ? JSON.parse(local) : [];

localStorage.setItem(
  'artie_orders',
  JSON.stringify([newOrder, ...orders])
);

return newOrder;
```

},

// UPDATE STATUS
async updateOrderStatus(orderId: number | string, status: string) {

```
if (isSupabaseConfigured) {
  try {

    const { error } = await supabase
      .from('order_data')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;

    return true;

  } catch (err) {
    console.error('Supabase updateStatus error:', err);
  }
}

return true;
```

},

// GET SINGLE ORDER
async getOrderById(orderId: string) {

```
if (isSupabaseConfigured) {
  try {

    const { data, error } = await supabase
      .from('order_data')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) throw error;

    return data;

  } catch (err) {
    console.error('Supabase getOrderById error:', err);
  }
}

// Local fallback
const local = localStorage.getItem('artie_orders');

if (local) {
  const orders = JSON.parse(local);

  return orders.find(
    (o: any) => o.id.toString() === orderId.toString()
  );
}

return null;
```

},

// FILE UPLOAD
async uploadFile(file: File) {

```
if (isSupabaseConfigured) {
  try {

    const fileExt = file.name.split('.').pop();

    const fileName =
      `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}.${fileExt}`;

    const { error: uploadError } = await supabase
      .storage
      .from('prints')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl }
    } = supabase
      .storage
      .from('prints')
      .getPublicUrl(fileName);

    return publicUrl;

  } catch (err) {
    console.error('Supabase upload error:', err);
  }
}

// Local fallback
const reader = new FileReader();

const promise = new Promise<string>((resolve, reject) => {
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = reject;
});

reader.readAsDataURL(file);

return await promise;
```

}
};
