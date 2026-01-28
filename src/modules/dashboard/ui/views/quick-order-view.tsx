"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, Send, Loader2, Package, Calculator } from "lucide-react";
import { Product } from "@/payload-types";
import { useState } from "react";
import { createBulkQuoteAction } from "@/modules/products/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const quickOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1, "Select a product"),
    quantity: z.number().min(1, "Min quantity is 1"),
  })).min(1, "Add at least one item"),
  note: z.string().optional(),
});

type QuickOrderValues = z.infer<typeof quickOrderSchema>;

interface QuickOrderViewProps {
  products: Product[];
  userId: string | number;
}

export const QuickOrderView = ({ products, userId }: QuickOrderViewProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { register, control, handleSubmit, formState: { errors } } = useForm<QuickOrderValues>({
    resolver: zodResolver(quickOrderSchema),
    defaultValues: {
      items: [{ productId: "", quantity: 1 }],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const onSubmit = async (data: QuickOrderValues) => {
    setIsSubmitting(true);
    try {
      const res = await createBulkQuoteAction({
        userId,
        items: data.items,
        note: data.note || "Quick Order Request",
      });

      if (res.success) {
        toast.success("Bulk quote request submitted successfully!");
        router.push("/orders");
      } else {
        toast.error(res.error || "Failed to submit request");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quick Order Form</h1>
          <p className="text-gray-500 mt-2">
            Efficiently request quotes for multiple chemicals in a single submission.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Package className="w-4 h-4 text-green-600" />
                Order Line Items
              </div>
              <button
                type="button"
                onClick={() => append({ productId: "", quantity: 1 })}
                className="flex items-center gap-2 text-xs font-bold bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-all shadow-sm active:scale-95"
              >
                <Plus className="w-3 h-3" />
                Add Row
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="flex-1 w-full">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Select Chemical / Product
                      </label>
                      <select
                        {...register(`items.${index}.productId` as const)}
                        className={`w-full bg-gray-50 border ${errors.items?.[index]?.productId ? 'border-red-300' : 'border-gray-200'} rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all`}
                      >
                        <option value="">Choose a product...</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                      {errors.items?.[index]?.productId && (
                        <p className="mt-1 text-xs text-red-500">{errors.items[index]?.productId?.message}</p>
                      )}
                    </div>

                    <div className="w-full md:w-32">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Qty
                      </label>
                      <input
                        type="number"
                        min="1"
                        {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                      />
                    </div>

                    {fields.length > 1 && (
                      <div className="pt-5 flex items-center h-full">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {errors.items?.root && (
                <p className="mt-4 text-sm text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  {errors.items.root.message}
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              {...register("note")}
              placeholder="E.g. Specific concentrations requirements, delivery instructions..."
              rows={3}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all resize-none"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Bulk Quote Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
