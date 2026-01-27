import { getCurrentUser } from "@/modules/auth/actions";
import { redirect } from "next/navigation";
import { DashboardView } from "@/modules/dashboard/ui/views/dashboard-view";
import { User as UserType, Order as OrderType } from "@/payload-types";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const DashboardPage = async () => {
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
    console.error("Dashboard: Error fetching orders:", error);
  }

  return <DashboardView user={user as UserType} orders={orders} />;
};

export default DashboardPage;
