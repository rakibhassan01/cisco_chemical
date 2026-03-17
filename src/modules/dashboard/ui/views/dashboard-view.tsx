"use client";

import { User as UserType, Order as OrderType } from "@/payload-types";
import {
  User,
  Package,
  LogOut,
  ShieldCheck,
  Mail,
  Calendar,
  ChevronRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { signOutAction } from "@/modules/auth/actions";
import { toast } from "sonner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface DashboardViewProps {
  user: UserType;
  orders: OrderType[];
}

export const DashboardView = ({ user, orders }: DashboardViewProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignOut = async () => {
    await signOutAction();
    toast.success("Signed out successfully");
  };

  const navItems = [
    {
      icon: User,
      label: "My Profile",
      href: "/profile",
      description: "Manage your personal information",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Package,
      label: "My Orders",
      href: "/orders",
      description: "Track and manage your order history",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: ShieldCheck,
      label: "Security",
      href: "/security",
      description: "Manage your account security",
      color: "text-gray-600",
      bg: "bg-gray-100",
    },
  ];

  const pendingOrders = orders.filter(
    (order) => order.status === "pending" || order.status === "processing",
  ).length;

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: Package,
      color: "text-green-600",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: Clock,
      color: "text-orange-600",
    },
    {
      label: "Account Status",
      value: "Verified",
      icon: CheckCircle2,
      color: "text-blue-600",
    },
  ];

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 sm:pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Block */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Account Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome back, <span className="font-semibold text-gray-900">{user.name}</span>
            </p>
          </div>
          
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main User Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 text-center border-b border-gray-50">
                <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-500 text-sm mt-1">{user.email}</p>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Email Address</span>
                    <span className="text-sm font-medium text-gray-900 truncate">{user.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Account Created</span>
                    <span className="text-sm font-medium text-gray-900">
                      {isMounted ? new Date(user.createdAt).toLocaleDateString() : '...'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <Link
                  href="/profile"
                  className="flex items-center justify-center w-full py-2.5 rounded-lg bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-colors"
                >
                  Update Profile
                </Link>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="space-y-3">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                      <stat.icon className={cn("w-5 h-5", stat.color)} />
                    </div>
                    <span className="text-sm font-semibold text-gray-600">{stat.label}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity & Links */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-bold text-gray-900">Quick Links</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {navItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", item.bg)}>
                        <item.icon className={cn("w-5 h-5", item.color)} />
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold text-sm">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wider">Recent Orders</h3>
                <Link
                  href="/orders"
                  className="text-xs font-bold text-green-600 hover:underline"
                >
                  View all orders
                </Link>
              </div>

              {recentOrders.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-xl">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <Package className="w-6 h-6" />
                  </div>
                  <p className="text-gray-500 font-medium text-sm">No recent orders found</p>
                  <Link
                    href="/products"
                    className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-xs hover:bg-green-700 transition-colors"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-400">
                          <Package className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase mb-0.5">
                            Order #{String(order.id).slice(-8).toUpperCase()}
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            ${order.total.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className={cn(
                          "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border",
                          order.status === "delivered" 
                            ? "bg-green-50 text-green-700 border-green-100" 
                            : "bg-blue-50 text-blue-700 border-blue-100"
                        )}>
                          {order.status || "In Process"}
                        </span>
                        <span className="text-[10px] font-medium text-gray-400" suppressHydrationWarning>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
