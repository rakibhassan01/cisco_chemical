import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";

export const SocialLogin = () => {
  return (
    <div className="w-full">
      <Button
        variant="outline"
        className="w-full h-14 rounded-2xl border-slate-100 bg-white hover:bg-slate-50 font-black text-xs uppercase tracking-[0.2em] text-slate-700 transition-all shadow-sm flex items-center justify-center gap-3"
        type="button"
        // onClick={() => signInWithGoogle()}
      >
        <Chrome className="w-4 h-4 text-emerald-600" />
        Continue with Google
      </Button>
    </div>
  );
};
