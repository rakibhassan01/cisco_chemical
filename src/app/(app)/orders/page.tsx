import { getCurrentUser } from "@/modules/auth/actions";
import { OrdersView } from "@/modules/dashboard/ui/views/orders-view";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Order as OrderType, Quote as QuoteType } from "@/payload-types";

export default async function OrdersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  let orders: OrderType[] = [];
  let quotes: QuoteType[] = [];
  try {
    const payload = await getPayload({ config: configPromise });

    const [ordersRes, quotesRes] = await Promise.all([
      payload.find({
        collection: "orders",
        where: {
          user: {
            equals: user.id,
          },
        },
        sort: "-createdAt",
      }),
      payload.find({
        collection: "quotes",
        where: {
          user: {
            equals: user.id,
          },
        },
        sort: "-createdAt",
      }),
    ]);

    orders = ordersRes.docs as unknown as OrderType[];
    quotes = quotesRes.docs;
  } catch (error) {
    console.error("OrdersPage: Error fetching data:", error);
  }

  return <OrdersView orders={orders} quotes={quotes} />;
}
