import { ProductsView } from "@/modules/products/ui/views/product-view";
import HeroBanner from "../components/hero-banner";
import { ProductsHeader } from "@/modules/products/ui/components/products-header";
import { CTA } from "@/modules/products/ui/components/CTA";
import { Product } from "@/payload-types";

interface HomeViewProps {
  products?: Product[];
}

export const HomeView = ({ products = [] }: HomeViewProps) => {
  return (
    <>
      <HeroBanner />
      <ProductsHeader />
      <ProductsView initialProducts={products} />
      <CTA />
    </>
  );
};
