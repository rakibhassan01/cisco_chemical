import { HomeView } from "@/modules/home/ui/views/home-view";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Suspense } from "react";
import { Product } from "@/payload-types";

export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });

  const { docs: products = [] } = await payload.find({
    collection: "products",
    depth: 1,
  });


  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <HomeView products={products as Product[]} />
    </Suspense>
  );
}
