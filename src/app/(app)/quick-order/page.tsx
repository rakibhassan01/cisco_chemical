import { getCurrentUser } from "@/modules/auth/actions";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { QuickOrderView } from "@/modules/dashboard/ui/views/quick-order-view";
import { Product } from "@/payload-types";

export default async function QuickOrderPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in?callbackUrl=/quick-order");
  }

  const payload = await getPayload({ config: configPromise });

  const productsRes = await payload.find({
    collection: "products",
    limit: 100, // Fetch up to 100 products for selection
    sort: "name",
  });

  const products = productsRes.docs as unknown as Product[];

  return <QuickOrderView products={products} userId={user.id} />;
}
