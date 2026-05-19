import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/shared/Navbar";
import Footer from "@/app/components/shared/Footer";
import ClientLayout from "@/app/components/shared/ClientLayout";
import ToastProvider from "@/app/components/shared/ToastProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaVault - Startup Idea Sharing Platform",
  description: "Share, explore and validate breakthrough startup ideas.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-100 text-base-content transition-colors duration-300">
        <ClientLayout>
          <ToastProvider>
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </ToastProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
