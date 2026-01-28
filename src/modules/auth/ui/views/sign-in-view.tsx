"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

import { signInAction } from "../../actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export const SignInView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true);
    try {
      const result = await signInAction(data);
      if (result?.success) {
        toast.success("Login Successful", {
          description: "Welcome back to Cisco Chemical.",
        });
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error("Authentication Failed", {
          description:
            result?.error || "Invalid email or password. Please try again.",
        });
      }
    } catch {
      toast.error("An error occurred", {
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#FDFDFD] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50/50 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4" />

      <div className="w-full max-w-[1100px] grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: Branding & Info */}
        <div className="hidden lg:flex flex-col space-y-8 pr-12">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-slate-950 rounded-3xl flex items-center justify-center shadow-2xl shadow-slate-200">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-5xl font-black text-slate-950 leading-[1.1] tracking-tight">
              Access the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Chemical Portal.
              </span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md">
              Enter your credentials to manage your industrial solutions,
              orders, and professional chemical resources.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-100">
            <div className="space-y-1">
              <p className="text-2xl font-black text-slate-950">Secure</p>
              <p className="text-sm text-slate-500 font-medium">
                End-to-end encrypted sessions
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-black text-slate-950">Scale</p>
              <p className="text-sm text-slate-500 font-medium">
                Industrial-grade infrastructure
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Log-in Form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[2.5rem] bg-white/80 backdrop-blur-xl">
            <CardHeader className="space-y-2 pt-10 pb-6 px-10">
              <CardTitle className="text-3xl font-black text-slate-950 tracking-tight">
                Sign In
              </CardTitle>
              <CardDescription className="text-slate-500 font-medium">
                Continue to your Cisco dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="px-10">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                            <Input
                              placeholder="mail@gmail.com"
                              className="pl-12 h-14 rounded-2xl bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-emerald-500/20 transition-all font-bold text-sm"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="pl-12 h-14 rounded-2xl bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-emerald-500/20 transition-all font-bold text-sm"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1" />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 rounded-2xl bg-slate-950 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 hover:shadow-emerald-200 active:scale-95 disabled:opacity-50 mt-4 group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-6 pt-6 pb-10 px-10">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-[10px]">
                  <span className="px-4 bg-white text-slate-400 font-black uppercase tracking-[0.2em]">
                    Don&apos;t have an account?
                  </span>
                </div>
              </div>
              <Link href="/sign-up" className="w-full">
                <Button
                  variant="outline"
                  className="w-full h-14 rounded-2xl border-slate-100 bg-slate-50/50 hover:bg-white font-black text-xs uppercase tracking-[0.2em] text-slate-900 transition-all"
                >
                  Create Account
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
