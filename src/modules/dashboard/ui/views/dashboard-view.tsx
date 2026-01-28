"use client";

import { User as UserType, Order as OrderType } from "@/payload-types";
import {
  User,
  Package,
  Settings,
  LogOut,
  History,
  ShieldCheck,
  Mail,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { signOutAction } from "@/modules/auth/actions";
import { toast } from "sonner";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      label: "Profile Information",
      href: "/profile",
      description: "Update your personal details and contact info",
    },
    {
      icon: Package,
      label: "My Orders",
      href: "/orders",
      description: "View and track your recent chemical orders",
    },
    {
      icon: History,
      label: "Order History",
      href: "/orders",
      description: "Access details of your past transactions",
    },
    {
      icon: ShieldCheck,
      label: "Security",
      href: "/security",
      description: "Manage your password and account security",
    },
    {
      icon: Settings,
      label: "Account Settings",
      href: "/settings",
      description: "Configure your account preferences",
    },
  ];

  const pendingOrders = orders.filter(
    (order) => order.status === "pending" || order.status === "processing",
  ).length;

  const stats = [
    {
      label: "Total Orders",
      value: orders.length.toString(),
      icon: Package,
      color: "bg-blue-500",
    },
    {
      label: "Pending Deliveries",
      value: pendingOrders.toString(),
      icon: History,
      color: "bg-orange-500",
    },
    {
      label: "Account Status",
      value: "Active",
      icon: ShieldCheck,
      color: "bg-green-500",
    },
  ];

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user.name}!</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-red-200 text-red-600 font-medium bg-white hover:bg-red-50 transition-all duration-300 shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Card & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-green-500 to-green-600"></div>
              <div className="px-6 pb-6">
                <div className="relative -mt-12 mb-4">
                  <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                    <div className="w-full h-full rounded-xl bg-green-50 flex items-center justify-center text-green-600 text-3xl font-bold border border-green-100 uppercase">
                      {user.name?.[0]}
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-4 h-4 text-green-500" />
                    <span className="text-sm truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-4 h-4 text-green-500" />
                    <span className="text-sm">
                      Joined{" "}
                      {isMounted
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "..."}
                    </span>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="mt-6 block w-full text-center py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-all duration-300 shadow-sm"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Main Navigation Links */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
              <div className="p-4 border-b border-gray-50">
                <h3 className="text-lg font-bold text-gray-900">
                  Account Management
                </h3>
                <p className="text-sm text-gray-500">
                  Quickly access your account features
                </p>
              </div>
              <div className="divide-y divide-gray-50">
                {navItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold group-hover:text-green-600 transition-colors">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Recent Orders
                </h3>
                <Link
                  href="/orders"
                  className="text-sm font-medium text-green-600 hover:text-green-700"
                >
                  View All
                </Link>
              </div>

              {recentOrders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <Package className="w-8 h-8" />
                  </div>
                  <p className="text-gray-500 font-medium">
                    No recent orders found
                  </p>
                  <Link
                    href="/products"
                    className="mt-4 inline-block px-6 py-2 border border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-all"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:border-green-100 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                          <Package className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            Order #{String(order.id).slice(-8).toUpperCase()}
                          </p>
                          <p className="text-xs text-gray-500" suppressHydrationWarning>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">
                          ${order.total.toLocaleString()}
                        </p>
                        <p className="text-xs font-medium text-green-600 uppercase tracking-wider">
                          {order.status || "Pending"}
                        </p>
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
