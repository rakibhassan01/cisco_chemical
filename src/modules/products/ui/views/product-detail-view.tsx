"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useLivePreview } from "@payloadcms/live-preview-react";
import { Product, Category } from "@/payload-types";
import Image from "next/image";
import { Beaker, ChevronLeft, Eye, X, Pencil, Terminal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProductDetailViewProps {
  initialProduct: Product;
  serverURL: string;
}

export const ProductDetailView = ({
  initialProduct,
  serverURL,
}: ProductDetailViewProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const effectiveServerURL =
    serverURL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  const { data: product, isLoading } = useLivePreview({
    initialData: initialProduct,
    serverURL: effectiveServerURL,
    depth: 1,
  });

  if (!product) return null;

  const categoryName =
    typeof product.category === "object"
      ? (product.category as Category).name
      : "Uncategorized";

  const imageUrl =
    (typeof product.mainImage === "object" ? product.mainImage.url : null) ||
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop";

  const price = product.price;
  const oldPrice = product.oldPrice;
  const stock = product.stock;
  const gallery = product.gallery || [];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          {/* Image Section */}
          <div className="p-6 lg:p-12 space-y-6 bg-slate-50/50">
            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-white shadow-inner border border-gray-100">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {categoryName}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {gallery.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="relative h-24 rounded-lg overflow-hidden border border-gray-200 hover:border-green-500 transition-all cursor-pointer shadow-sm"
                  >
                    <Image
                      src={item.image?.url || ""}
                      alt={`${product.name} gallery ${index}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-4 text-green-600">
              <Beaker className="w-8 h-8" />
              <span className="text-sm font-bold uppercase tracking-widest text-gray-500">
                Premium Chemical Solution
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Price section */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-green-600">
                {price ? `$${price}` : "Call for price"}
              </span>
              {oldPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ${oldPrice}
                </span>
              )}
              {stock > 0 ? (
                <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  {stock} in stock
                </span>
              ) : (
                <span className="ml-auto px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  Out of stock
                </span>
              )}
            </div>

            <div className="text-lg text-gray-600 mb-8 leading-relaxed">
              {typeof product.description === "string" ? (
                <p className="whitespace-pre-wrap">{product.description}</p>
              ) : (
                <div className="space-y-4">
                  {(product.description as any)?.root?.children?.map(
                    (node: any, i: number) => {
                      if (node.type === "paragraph") {
                        return (
                          <p key={i} className="whitespace-pre-wrap">
                            {node.children
                              ?.map((child: any) => child.text)
                              .join("")}
                          </p>
                        );
                      }
                      if (node.type === "heading") {
                        const headingText = node.children
                          ?.map((child: any) => child.text)
                          .join("");
                        const tag = node.tag as string;
                        if (tag === "h1") return <h1 key={i} className="text-3xl font-bold">{headingText}</h1>;
                        if (tag === "h2") return <h2 key={i} className="text-2xl font-bold">{headingText}</h2>;
                        if (tag === "h3") return <h3 key={i} className="text-xl font-bold">{headingText}</h3>;
                        if (tag === "h4") return <h4 key={i} className="text-lg font-bold">{headingText}</h4>;
                        return (
                          <h5 key={i} className="font-bold">
                            {headingText}
                          </h5>
                        );
                      }
                      return null;
                    },
                  )}
                </div>
              )}
            </div>

            <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-4">
              <button
                className={`flex-1 min-w-[200px] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${
                  stock > 0
                    ? "bg-green-600 hover:bg-green-700 shadow-green-600/20"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
              <button className="flex-1 min-w-[200px] bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-xl font-bold transition-all active:scale-95">
                Technical Datasheet (TDS)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        {isPreviewOpen ? (
          <div className="bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col min-w-[240px] transition-all duration-300">
            {/* Header with Toggle */}
            <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${isLoading ? "bg-amber-400 rotate-180 animate-pulse" : "bg-emerald-500"}`}
                />
                <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                  {isLoading ? "Syncing..." : "Live Preview"}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsPreviewOpen(false);
                }}
                className="hover:bg-slate-200 p-1.5 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
                title="Hide Preview Bar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col p-2 space-y-1">
              <a
                href={`/admin/collections/products/${product.id}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <Pencil className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  Edit Document
                </span>
              </a>

              <div className="flex items-center gap-3 px-3 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100/50">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold">Preview Active</span>
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <a
                href={`/api/products/${product.id}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-200 transition-colors">
                  <Terminal className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  View JSON API
                </span>
              </a>
            </div>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsPreviewOpen(true);
            }}
            className="bg-white text-slate-900 px-6 py-4 rounded-full shadow-2xl hover:shadow-emerald-500/10 transition-all border border-slate-200 active:scale-95 flex items-center gap-3 cursor-pointer group hover:border-emerald-200"
            title="Open Live Preview Tools"
          >
            <div
              className={`w-2 h-2 rounded-full ${isLoading ? "bg-amber-400 animate-pulse" : "bg-emerald-500"}`}
            />
            <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">
              Live Preview
            </span>
            <Eye className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 group-hover:rotate-12 transition-all" />
          </button>
        )}
      </div>
    </div>
  );
};
