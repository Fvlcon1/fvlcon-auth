import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/ui/fonts";


export const metadata: Metadata = {
  title: "Fvlcon Auth",
  description: "Custom auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        
        {children}
        </body>
    </html>
  );
}
