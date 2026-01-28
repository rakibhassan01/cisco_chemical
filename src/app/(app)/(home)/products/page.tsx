import { ProductsView } from "@/modules/products/ui/views/product-view";
import { Suspense } from "react";

const Products = () => {
  return (
    <div className="pt-20">
      <Suspense
        fallback={<div className="min-h-screen animate-pulse bg-slate-50" />}
      >
        <ProductsView />
      </Suspense>
    </div>
  );
};

export default Products;
