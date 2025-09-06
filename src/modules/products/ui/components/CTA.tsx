export const CTA = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-gray-900 via-emerald-900 to-green-900 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Elevate Your Chemical Processes?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-emerald-100 dark:text-gray-300">
          Partner with us for premium chemical solutions tailored to your
          industry needs. Our technical experts are ready to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300 shadow-lg shadow-green-600/25">
            Request Quote
          </button>
          <button className="border-2 border-green-500 text-green-400 px-8 py-4 rounded-xl font-semibold hover:bg-green-500 hover:text-white transition-all duration-300">
            Technical Support
          </button>
        </div>
      </div>
    </div>
  );
};
