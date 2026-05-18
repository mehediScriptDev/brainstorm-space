import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/shared/Navbar";
import Footer from "@/app/components/shared/Footer";
import { IdeaVaultProvider } from "@/context/IdeaVaultContext";
import ClientLayout from "@/app/components/shared/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-100 text-base-content transition-colors duration-300">
        <IdeaVaultProvider>
          <ClientLayout>
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </ClientLayout>
        </IdeaVaultProvider>
      </body>
    </html>
  );
}
