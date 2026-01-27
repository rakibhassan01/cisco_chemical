import { getCurrentUser } from "@/modules/auth/actions";
import { OrdersView } from "@/modules/dashboard/ui/views/orders-view";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Order as OrderType } from "@/payload-types";

export default async function OrdersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  let orders: OrderType[] = [];
  try {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
      collection: "orders",
      where: {
        user: {
          equals: user.id,
        },
      },
      sort: "-createdAt",
    });
    orders = docs as unknown as OrderType[];
  } catch (error) {
    console.error("OrdersPage: Error fetching orders:", error);
  }

  return <OrdersView orders={orders} />;
}
