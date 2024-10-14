"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LockIcon,
  MailIcon,
  EyeIcon,
  EyeOffIcon,
  UserIcon,
  BuildingIcon,
} from "lucide-react";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Initialize Next.js router

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      companyCode: formData.get("companyCode"),
      password: formData.get("password"),
    };

    setIsLoading(true);
    setErrorMessage("");

    // Redirect to the verification page immediately
    router.push(`/auth/confirm?email=${encodeURIComponent(data.email)}`);


    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative bg-gray-900">
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

      {/* Sign Up card */}
      <div className="w-full max-w-sm z-10">
        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div className="bg-green-500 rounded-full p-2 shadow-lg">
                <UserIcon className="w-6 h-6 text-gray-900" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="sr-only">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="block w-full text-sm bg-gray-700 bg-opacity-50 border-gray-600 text-gray-100 focus:ring-green-500 focus:border-green-500 rounded-lg"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="sr-only">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="block w-full text-sm bg-gray-700 bg-opacity-50 border-gray-600 text-gray-100 focus:ring-green-500 focus:border-green-500 rounded-lg"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    className="block w-full pl-10 text-sm bg-gray-700 bg-opacity-50 border-gray-600 text-gray-100 focus:ring-green-500 focus:border-green-500 rounded-lg"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="companyCode" className="sr-only">
                  Company Code
                </Label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BuildingIcon className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    type="text"
                    id="companyCode"
                    name="companyCode"
                    className="block w-full pl-10 text-sm bg-gray-700 bg-opacity-50 border-gray-600 text-gray-100 focus:ring-green-500 focus:border-green-500 rounded-lg"
                    placeholder="Company Code"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="block w-full pl-10 pr-10 text-sm bg-gray-700 bg-opacity-50 border-gray-600 text-gray-100 focus:ring-green-500 focus:border-green-500 rounded-lg"
                    placeholder="Password (8+ characters)"
                    required
                    minLength={8}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-300 focus:outline-none focus:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {errorMessage && (
                <div className="text-red-500 text-center text-sm mt-2">
                  {errorMessage}
                </div>
              )}
              <Button
                type="submit"
                className={`w-full bg-green-500 hover:bg-green-600 text-gray-900 font-semibold text-sm rounded-lg transition-all duration-200 transform hover:scale-105 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </div>
          <div className="px-6 py-3 bg-gray-700 bg-opacity-50 border-t border-gray-600">
            <p className="text-center text-xs text-gray-400">
              Already have an account?{" "}
              <a
                href="/auth/signin"
                className="font-medium text-green-500 hover:text-green-400"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* CSS for animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
