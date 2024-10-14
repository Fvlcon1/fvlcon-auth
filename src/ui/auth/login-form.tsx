// pages/auth/login.js
"use client"
import { useState } from "react";
import { signIn } from "next-auth/react"; // Import signIn from NextAuth
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LockIcon, MailIcon, EyeIcon, EyeOffIcon, InfoIcon } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      setErrorMessage(res.error); // Set error message
    } else {
      // Redirect on successful login
      window.location.href = "/dashboard/home"; // Change to your desired route
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-4 overflow-hidden relative bg-gray-900">
      {/* Animated background */}
      <div className="absolute inset-0 w-full h-full">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-green-500 opacity-30 rounded-full"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Login card */}
      <div className="w-full max-w-sm z-10">
        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div className="bg-green-500 rounded-full p-2 shadow-lg">
                <LockIcon className="w-6 h-6 text-gray-900" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-100 mb-1">Welcome Back</h2>
            <p className="text-center text-gray-300 text-sm mb-4">Sign in to access your account</p>

            {/* Instructions */}
            <div className="bg-gray-700 bg-opacity-50 rounded-lg p-3 mb-4">
              <h3 className="flex items-center text-sm font-semibold text-green-400 mb-2">
                <InfoIcon className="w-4 h-4 mr-1" />
                Instructions
              </h3>
              <ul className="text-gray-300 text-xs space-y-1">
                <li>• Use registered email</li>
                <li>• Strong password (min. 8 chars)</li>
                <li>• Enable two-factor auth</li>
                <li>• Don't share credentials</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-300 text-sm">
                  Email
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    className="block w-full pl-9 text-sm bg-gray-700 bg-opacity-50 border-gray-600 text-gray-100 focus:ring-green-500 focus:border-green-500 rounded-lg"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-300 text-sm">
                  Password
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="block w-full pl-9 pr-9 text-sm bg-gray-700 bg-opacity-50 border-gray-600 text-gray-100 focus:ring-green-500 focus:border-green-500 rounded-lg"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-300 focus:outline-none focus:text-gray-300"
                    >
                      {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember-me" className="text-green-500 focus:ring-green-500 rounded h-3 w-3" />
                  <Label htmlFor="remember-me" className="ml-2 block text-xs text-gray-300">
                    Remember me
                  </Label>
                </div>
                <div className="text-xs">
                  <a href="#" className="font-medium text-green-500 hover:text-green-400">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="flex h-8 items-end space-x-1">
                {errorMessage && (
                  <>
                    <InfoIcon className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  </>
                )}
              </div>
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-gray-900 font-semibold text-sm rounded-lg transition-all duration-200 transform hover:scale-105">
                Sign in
              </Button>
            </form>
          </div>
          <div className="px-6 py-3 bg-gray-700 bg-opacity-50 border-t border-gray-600">
            <p className="text-center text-xs text-gray-400">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="font-medium text-green-500 hover:text-green-400">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* CSS for animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </div>
  );
}
