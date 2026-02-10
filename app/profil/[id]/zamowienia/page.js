import { getOrders } from "@/app/api/getOrders/route";
import UserOrders from "@/components/user-profile/userOrders/UserOrders";
import { getCurrentUser } from "@/lib/auth";

export default async function Orders() {
  const userData = await getCurrentUser();
  const orders = await getOrders(userData.userId, false);

  const groupedOrdersMap = new Map();
  orders.forEach((row) => {
    if (!groupedOrdersMap.has(row.id)) {
      groupedOrdersMap.set(row.id, {
        id: row.id,
        payment_method: row.payment_method,
        delivery_method: row.delivery_method,
        order_date: row.order_date,
        total_price: row.total_price,
        status: row.status,
        points: row.points,
        delivery_end_date: row.delivery_end_date,
        payment_date: row.payment_date,
        invoice_number: row.invoice_number,
        producer_name: row.producer_name,
        producer_address: row.producer_address,
        producer_nip: row.producer_nip,
        client_first_name: row.client_first_name,
        client_last_name: row.client_last_name,
        client_street: row.client_street,
        client_postal_code: row.client_postal_code,
        client_city: row.client_city,
        delivery_cost: row.delivery_cost,
        items: [],
      });
    }

    const order = groupedOrdersMap.get(row.id);
    order.items.push({
      product_name: row.product_name,
      product_quantity: row.product_quantity,
      product_net_price: row.product_net_price,
      product_vat_rate: row.product_vat_rate,
      product_vat_amount: row.product_vat_amount,
      product_gross_price: row.product_gross_price,
    });
  });

  const groupedOrders = Array.from(groupedOrdersMap.values());

  return <UserOrders orders={groupedOrders} />;
}
