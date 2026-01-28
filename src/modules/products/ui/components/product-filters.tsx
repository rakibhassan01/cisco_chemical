"use client";

import { Category } from "@/payload-types";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Filter, 
  RotateCcw,
  PackageCheck
} from "lucide-react";

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (id: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  inStock: boolean;
  onInStockChange: (checked: boolean) => void;
  onReset: () => void;
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  inStock,
  onInStockChange,
  onReset
}: ProductFiltersProps) {
  return (
    <div className="space-y-8 bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 rounded-xl">
            <Filter className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Filters</h3>
        </div>
        <button 
          onClick={onReset}
          className="text-[10px] font-black text-slate-400 hover:text-emerald-600 flex items-center gap-1 transition-all uppercase tracking-widest"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-5">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Categories</h4>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onCategoryChange("all")}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              selectedCategory === "all" 
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                selectedCategory === cat.id 
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Price Range</h4>
          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <div className="px-2">
          <Slider
            defaultValue={[0, 10000]}
            max={10000}
            step={100}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={(val: any) => onPriceChange(val as [number, number])}
            className="my-6"
          />
        </div>
      </div>

      {/* Stock Status */}
      <div className="space-y-5">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Availability</h4>
        <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-[1.5rem] border border-slate-100 group hover:border-emerald-100 transition-all cursor-pointer" onClick={() => onInStockChange(!inStock)}>
          <Checkbox 
            id="inStock" 
            checked={inStock}
            onCheckedChange={(checked) => onInStockChange(!!checked)}
            className="border-emerald-200 data-[state=checked]:bg-emerald-600 h-5 w-5 rounded-lg"
          />
          <Label 
            htmlFor="inStock" 
            className="text-xs font-black text-slate-700 cursor-pointer flex items-center gap-2 grow uppercase tracking-wider"
          >
            <PackageCheck className="w-4 h-4 text-emerald-500" />
            In Stock Only
          </Label>
        </div>
      </div>
    </div>
  );
}
