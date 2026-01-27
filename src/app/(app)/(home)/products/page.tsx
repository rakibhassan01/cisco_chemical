import { ProductsView } from "@/modules/products/ui/views/product-view";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Suspense } from "react";
import { Product } from "@/payload-types";

const Products = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  const { docs: products = [] } = await payload.find({
    collection: "products",
    depth: 1, // To get category details
  });


  return (
    <div className="pt-18">
      <Suspense
        fallback={<div className="min-h-screen animate-pulse bg-gray-50" />}
      >
        <ProductsView initialProducts={products as Product[]} />
      </Suspense>
    </div>
  );
};

export default Products;
