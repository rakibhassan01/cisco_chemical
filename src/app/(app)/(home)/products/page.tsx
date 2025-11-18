// import { ProductsView } from "@/modules/products/ui/views/product-view";
import { ProductsView } from "@/modules/products/ui/views/product-view";
import configPromise from "@payload-config";
import { getPayload } from "payload";

const Products = async () => {
  const payload = await getPayload({
    config: configPromise,
  });
  const data = await payload.find({
    collection: "categories",
  });
  return (
    <div className="pt-18">
      <ProductsView />+{/* {JSON.stringify(data, null, 2)}  */}
    </div>
  );
};

export default Products;
