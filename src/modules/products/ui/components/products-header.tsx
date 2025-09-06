import { Atom } from "lucide-react";

export const ProductsHeader = () => {
  return (
    <div className="relative overflow-hidden py-20 bg-gradient-to-r from-emerald-900 via-teal-800 to-green-800 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent dark:via-slate-500/10"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center backdrop-blur-sm rounded-full px-6 py-2 mb-8 border bg-white/10 border-white/20 text-emerald-100 dark:bg-white/5 dark:border-white/20 dark:text-gray-300">
          <Atom
            className="w-5 h-5 mr-2 animate-spin text-emerald-300 dark:text-slate-400"
            style={{ animationDuration: "3s" }}
          />
          <span className="text-sm font-medium">
            Advanced Chemical Solutions
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Premium
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 dark:from-slate-400 dark:via-gray-300 dark:to-white">
            Chemical Products
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl max-w-3xl mx-auto mb-8 leading-relaxed text-emerald-100 dark:text-gray-300">
          Discover our comprehensive range of high-quality chemicals engineered
          for industrial excellence and innovation
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center space-x-8 text-emerald-200 dark:text-gray-400">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">500+</div>
            <div className="text-sm">Products</div>
          </div>
          <div className="w-px h-12 bg-emerald-400/30 dark:bg-gray-400/30"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">99.9%</div>
            <div className="text-sm">Purity</div>
          </div>
          <div className="w-px h-12 bg-emerald-400/30 dark:bg-gray-400/30"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">24/7</div>
            <div className="text-sm">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};
