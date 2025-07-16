"use client";
import Link from "next/link";
import { SocialLogin } from "../components/social-login";
import { useState } from "react";

export const SignInView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Handle login logic here
    console.log("Login attempt:", { email, password });
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80")',
      }}
    >
      {/* Green overlay */}
      <div className="absolute inset-0 bg-green-500 opacity-75"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Welcome Text Section */}
          <div className="text-white text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Hi 👋 Welcome Back.
            </h1>
            <p className="text-lg sm:text-xl opacity-90 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Lorem Ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>

          {/* Login Form Section */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600">Please sign in to your account.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mail@gmail.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm space-y-2 sm:space-y-0">
                  <button className="text-green-600 hover:text-green-700 transition-colors">
                    Forgot password?
                  </button>
                  <div className="text-gray-600">
                    Don&apos;t have account?{" "}
                    <Link
                      href="/sign-up"
                      className="text-green-600 hover:text-green-700 transition-colors"
                    >
                      Create an Account
                    </Link>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Login
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                <SocialLogin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
