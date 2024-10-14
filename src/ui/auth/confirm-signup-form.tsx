"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserIcon } from "lucide-react";

export default function EmailVerification() {
    const searchParams = useSearchParams(); // Use search params to get the email
    const email = searchParams.get("email"); // Get email from query parameters
    const [code, setCode] = useState(Array(6).fill("")); // Holds the 6-digit code
    const [countdown, setCountdown] = useState(60); // 60-second countdown timer
    const [isResendEnabled, setIsResendEnabled] = useState(false); // Resend button state

    // Countdown logic
    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setIsResendEnabled(true); // Enable resend option after countdown ends
        }
    }, [countdown]);

    const handleChange = (value: string, index: number) => {
        if (/^[0-9]$/.test(value) || value === "") { // Allow only digits or empty value
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Automatically move to next input if the current one is filled
            if (value && index < 5) {
                document.getElementById(`input-${index + 1}`).focus();
            }
            // Move back to the previous input when the current one is cleared
            if (!value && index > 0) {
                document.getElementById(`input-${index - 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && code[index] === "") {
            // Move to the previous input when backspace is pressed on an empty field
            if (index > 0) {
                document.getElementById(`input-${index - 1}`).focus();
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const verificationCode = code.join(""); // Convert array to string
        console.log("Verification code submitted:", verificationCode);
        console.log("Email from URL:", email);

        if (!email) {
            console.error("Email is undefined. Please check the URL.");
            return;
        }

        try {
            const response = await fetch('/api/auth/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, verificationCode }), // Send both email and verification code
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Verification successful:", data);
                // Redirect or display success message
            } else {
                console.error("Verification error:", data.error);
            }
        } catch (error) {
            console.error("Failed to verify email:", error);
        }
    };

    const handleResend = async () => {
        try {
            const response = await fetch('/api/auth/resend-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }), // Send the user's email to the server
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Verification code resent:", data);
                setCode(Array(6).fill("")); // Reset the input fields
                setCountdown(60); // Reset countdown
                setIsResendEnabled(false); // Disable resend button again
            } else {
                console.error("Error resending code:", data.error);
            }
        } catch (error) {
            console.error("Failed to resend verification code:", error);
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

            {/* Verification card */}
            <div className="w-full max-w-sm z-10">
                <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                    <div className="p-6">
                        <div className="flex justify-center mb-4">
                            <div className="bg-green-500 rounded-full p-2 shadow-lg">
                                <UserIcon className="w-6 h-6 text-gray-900" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Email Verification</h2>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="flex justify-between mb-4">
                                {code.map((digit, index) => (
                                    <Input
                                        key={index}
                                        type="text"
                                        id={`input-${index}`}
                                        maxLength={1} // Restrict to 1 character
                                        className="w-12 h-12 text-center bg-gray-700 border border-gray-600 text-gray-100 focus:ring-green-500 focus:border-green-500 rounded-lg"
                                        value={digit}
                                        onChange={(e) => handleChange(e.target.value, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace logic
                                    />
                                ))}
                            </div>
                            <Button className="w-full bg-green-500 hover:bg-green-600 text-gray-900 font-semibold text-sm rounded-lg transition-all duration-200 transform hover:scale-105">
                                Verify Code
                            </Button>
                            {countdown > 0 ? (
                                <p className="text-center text-gray-400">Resend code in {countdown}s</p>
                            ) : (
                                <p className="text-center text-gray-400 mt-2">Didn't receive the code? <span onClick={handleResend} className="text-green-500 cursor-pointer hover:underline">Resend code</span></p>
                            )}
                        </form>
                    </div>
                    <div className="px-6 py-3 bg-gray-700 bg-opacity-50 border-t border-gray-600 text-center">
                        <p className="text-xs text-gray-400">Secured by <span className="text-green-500">fvlcon</span></p>
                    </div>
                </div>
            </div>

            {/* Animation CSS */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-20px) scale(0.9); }
                }
            `}</style>
        </div>
    );
}
