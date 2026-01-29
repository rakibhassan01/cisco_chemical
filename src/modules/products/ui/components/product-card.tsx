"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/payload-types";
import { useCurrency } from "@/providers/currency-provider";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const image = typeof product.mainImage === "object" && product.mainImage !== null
    ? (product.mainImage as { url?: string }).url
    : null;
  const categoryName = typeof product.category === "object" && product.category !== null
    ? (product.category as { name: string }).name
    : "Chemical";

  return (
    <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 overflow-hidden flex flex-col h-full">
      <div 
        className="relative h-64 w-full overflow-hidden bg-slate-50 cursor-pointer" 
        onClick={() => router.push(`/products/${product.slug}`)}
      >
        <Image
          src={image || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 backdrop-blur-md text-emerald-800 border-none px-4 py-1.5 rounded-full text-xs font-black shadow-sm uppercase tracking-widest">
            {categoryName}
          </Badge>
        </div>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <Badge variant="destructive" className="px-6 py-2 rounded-full font-black text-sm">OUT OF STOCK</Badge>
          </div>
        )}
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 
            className="text-xl font-black text-slate-900 leading-tight mb-2 group-hover:text-emerald-600 transition-colors cursor-pointer" 
            onClick={() => router.push(`/products/${product.slug}`)}
          >
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-950">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-slate-400 line-through font-bold">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-8 flex-1">
          {typeof product.description === 'string' ? product.description : "Advanced chemical solution for industrial applications."}
        </p>

        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
            disabled={product.stock === 0}
            className="flex items-center justify-center gap-2 py-4 bg-slate-50 hover:bg-emerald-50 text-slate-900 hover:text-emerald-700 rounded-2xl font-black text-xs transition-all border border-slate-100 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
          >
            <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            CART
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(); router.push('/cart'); }}
            disabled={product.stock === 0}
            className="flex items-center justify-center gap-2 py-4 bg-slate-950 hover:bg-emerald-600 text-white rounded-2xl font-black text-xs transition-all shadow-xl shadow-slate-200 hover:shadow-emerald-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}
