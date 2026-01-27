"use client";

import { User as UserType } from "@/payload-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateUserAction } from "../../actions";
import { toast } from "sonner";
import { Loader2, User, Mail, Camera, Save } from "lucide-react";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileViewProps {
  user: UserType;
}

export const ProfileView = ({ user }: ProfileViewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    const result = await updateUserAction(data);
    if (result.success) {
      toast.success("Profile updated successfully");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to update profile");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-green-500 to-green-600"></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-8 flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-white p-1 shadow-xl">
                  <div className="w-full h-full rounded-xl bg-green-50 flex items-center justify-center text-green-600 text-4xl font-bold border border-green-100 uppercase">
                    {user.name?.[0]}
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 max-w-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-green-500" />
                    Full Name
                  </label>
                  <input
                    {...register("name")}
                    className={`w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-green-500" />
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    className={`w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
