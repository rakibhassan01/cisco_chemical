"use client";

import { useState, useEffect, useCallback } from "react";
import { useQueryState, parseAsInteger, parseAsBoolean } from "nuqs";
import { Search, SlidersHorizontal, X } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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
        <div className="flex flex-col gap-8">
          {/* Mobile Filter Trigger & Toolbar */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 font-bold" />
                  <input
                    type="text"
                    placeholder="Search chemicals..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-100 text-xs font-bold focus:ring-2 focus:ring-emerald-500 transition-all uppercase tracking-wider shadow-sm"
                  />
                </div>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden flex items-center gap-2 rounded-2xl border-slate-100 bg-white h-11 px-4 font-black text-[10px] uppercase tracking-widest shadow-sm">
                      <SlidersHorizontal className="w-4 h-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:w-[350px] p-0 border-r-0">
                    <div className="h-full overflow-y-auto p-6 pt-10">
                      <SheetHeader className="mb-8">
                        <SheetTitle className="text-left font-black text-2xl tracking-tighter uppercase">Filters</SheetTitle>
                        <SheetDescription className="text-left font-medium text-slate-500">Simplify your chemical search</SheetDescription>
                      </SheetHeader>
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
                  </SheetContent>
                </Sheet>
              </div>

              <div className="hidden sm:flex items-center gap-4">
                <Select value={sort} onValueChange={(val) => setSort(val)}>
                  <SelectTrigger className="w-[180px] rounded-2xl border-slate-100 bg-white h-11 font-black text-slate-700 text-[10px] uppercase tracking-widest shadow-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-100">
                    <SelectItem value="-createdAt" className="font-black text-[10px] uppercase tracking-widest">Newest First</SelectItem>
                    <SelectItem value="price" className="font-black text-[10px] uppercase tracking-widest">Price: Low to High</SelectItem>
                    <SelectItem value="-price" className="font-black text-[10px] uppercase tracking-widest">Price: High to Low</SelectItem>
                    <SelectItem value="name" className="font-black text-[10px] uppercase tracking-widest">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {(category !== "all" || inStock || search) && (
              <div className="flex flex-wrap gap-2">
                {category !== "all" && (
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-wider">
                     Cat: {categories.find(c => String(c.id) === category)?.name || category}
                     <button onClick={() => setCategory("all")}><X className="w-3 h-3"/></button>
                   </div>
                )}
                {inStock && (
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-wider">
                     In Stock
                     <button onClick={() => setInStock(false)}><X className="w-3 h-3"/></button>
                   </div>
                )}
                {search && (
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-wider">
                     &ldquo;{search}&rdquo;
                     <button onClick={() => setSearch("")}><X className="w-3 h-3"/></button>
                   </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block lg:w-80 shrink-0">
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

            {/* Main Content Area */}
            <main className="flex-1 space-y-8">
              {/* Products Grid */}
              {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-48 sm:h-64 w-full rounded-[2rem]" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              ) : data.products.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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

              {/* Pagination Section */}
              {data.totalPages > 1 && (
                <div className="flex justify-center pt-8 sm:pt-12">
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
                          <PaginationItem key={p} className="hidden sm:inline-block">
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
