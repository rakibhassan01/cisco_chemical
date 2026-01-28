"use client";

import { useState, useEffect, useCallback } from "react";
import { useQueryState, parseAsInteger, parseAsBoolean } from "nuqs";
import { Search } from "lucide-react";
import { Product, Category } from "@/payload-types";
import { useCart } from "@/hooks/use-cart";
import {
  getFilteredProductsAction,
  getCategoriesAction,
} from "@/modules/products/actions";
import { ProductFilters } from "../components/product-filters";
import { ProductCard } from "../components/product-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductsViewProps {
  initialProducts?: Product[];
}

const EMPTY_ARRAY: Product[] = [];

export function ProductsView({
  initialProducts = EMPTY_ARRAY,
}: ProductsViewProps) {
  const { addToCart } = useCart();

  // Query State
  const [search, setSearch] = useQueryState("q", { defaultValue: "" });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all",
  });
  const [minPrice, setMinPrice] = useQueryState(
    "min",
    parseAsInteger.withDefault(0),
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    "max",
    parseAsInteger.withDefault(10000),
  );
  const [inStock, setInStock] = useQueryState(
    "stock",
    parseAsBoolean.withDefault(false),
  );
  const [sort, setSort] = useQueryState("sort", { defaultValue: "-createdAt" });
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  // Data State
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [data, setData] = useState<{
    products: Product[];
    totalDocs: number;
    totalPages: number;
  }>({
    products: initialProducts,
    totalDocs: initialProducts.length,
    totalPages: Math.ceil(initialProducts.length / 9) || 1,
  });
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const result = await getFilteredProductsAction({
      query: search || undefined,
      category,
      minPrice,
      maxPrice,
      inStock,
      sort,
      page,
      limit: 9,
    });
    setData({
      products: result.products,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
    });
    setLoading(false);
  }, [search, category, minPrice, maxPrice, inStock, sort, page]);

  useEffect(() => {
    // Check if we have any active filters
    const hasActiveFilters =
      (search && search !== "") ||
      category !== "all" ||
      minPrice > 0 ||
      maxPrice < 10000 ||
      inStock ||
      page > 1;

    // Fetch if we have no initial products OR if filters are active
    if (initialProducts.length === 0 || hasActiveFilters) {
      fetchProducts();
    } else {
      setData({
        products: initialProducts,
        totalDocs: initialProducts.length,
        totalPages: Math.ceil(initialProducts.length / 9) || 1,
      });
      setLoading(false);
    }
  }, [
    fetchProducts,
    initialProducts,
    search,
    category,
    minPrice,
    maxPrice,
    inStock,
    page,
  ]);

  useEffect(() => {
    const fetchCats = async () => {
      const cats = await getCategoriesAction();
      setCategories(cats);
    };
    fetchCats();
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 w-full shrink-0">
            <div className="sticky top-28">
              <ProductFilters
                categories={categories}
                selectedCategory={category}
                onCategoryChange={(val) => {
                  setCategory(val);
                  setPage(1);
                }}
                priceRange={[minPrice, maxPrice]}
                onPriceChange={(range) => {
                  setMinPrice(range[0]);
                  setMaxPrice(range[1]);
                  setPage(1);
                }}
                inStock={inStock}
                onInStockChange={(val) => {
                  setInStock(val);
                  setPage(1);
                }}
                onReset={() => {
                  setCategory("all");
                  setMinPrice(0);
                  setMaxPrice(10000);
                  setInStock(false);
                  setSearch("");
                  setPage(1);
                }}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl border-none text-xs font-black focus:ring-2 focus:ring-emerald-500 transition-all uppercase tracking-wider"
                />
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <p className="text-[10px] font-black text-slate-400 hidden sm:block uppercase tracking-[0.2em]">
                  {data.totalDocs} Products
                </p>
                <div className="h-8 w-[1px] bg-slate-100 hidden sm:block" />
                <Select value={sort} onValueChange={(val) => setSort(val)}>
                  <SelectTrigger className="w-full sm:w-[180px] rounded-xl border-slate-100 bg-slate-50 h-10 font-black text-slate-700 text-[10px] uppercase tracking-widest">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100">
                    <SelectItem
                      value="-createdAt"
                      className="font-black text-[10px] uppercase tracking-widest"
                    >
                      Newest First
                    </SelectItem>
                    <SelectItem
                      value="price"
                      className="font-black text-[10px] uppercase tracking-widest"
                    >
                      Price: Low to High
                    </SelectItem>
                    <SelectItem
                      value="-price"
                      className="font-black text-[10px] uppercase tracking-widest"
                    >
                      Price: High to Low
                    </SelectItem>
                    <SelectItem
                      value="name"
                      className="font-black text-[10px] uppercase tracking-widest"
                    >
                      Name: A to Z
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-64 w-full rounded-[2rem]" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : data.products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {data.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() =>
                      addToCart({
                        id: String(product.id),
                        name: product.name,
                        price: product.price,
                        image:
                          typeof product.mainImage === "object" &&
                          product.mainImage !== null
                            ? (product.mainImage as { url?: string }).url || ""
                            : "",
                        slug: product.slug || "",
                      })
                    }
                  />
                ))}
              </div>
            ) : (
              <NoResults
                onClear={() => {
                  setSearch("");
                  setCategory("all");
                  setMinPrice(0);
                  setMaxPrice(10000);
                  setInStock(false);
                  setPage(1);
                }}
              />
            )}

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="flex justify-center pt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => page > 1 && handlePageChange(page - 1)}
                        className={`cursor-pointer ${page === 1 ? "opacity-50 pointer-events-none" : ""}`}
                      />
                    </PaginationItem>

                    {[...Array(data.totalPages)].map((_, i) => {
                      const p = i + 1;
                      return (
                        <PaginationItem key={p}>
                          <PaginationLink
                            isActive={page === p}
                            onClick={() => handlePageChange(p)}
                            className="cursor-pointer"
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          page < data.totalPages && handlePageChange(page + 1)
                        }
                        className={`cursor-pointer ${page === data.totalPages ? "opacity-50 pointer-events-none" : ""}`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function NoResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100">
      <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-xl mb-6">
        <Search className="w-10 h-10 text-slate-200" />
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-2">
        No matches found
      </h3>
      <p className="text-slate-500 font-medium mb-8">
        Try adjusting your filters or search terms
      </p>
      <button
        onClick={onClear}
        className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-emerald-200 active:scale-95 transition-all uppercase tracking-widest"
      >
        Reset All Filters
      </button>
    </div>
  );
}
