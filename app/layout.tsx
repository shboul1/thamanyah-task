import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";

const myFont = localFont({
  src: "./IBMPlexSansArabic-Regular.otf",
  variable: "--font-ibm-plex-sans",
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thamanyah Task",
  description: "Frontend task for Thamanyah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${myFont.variable} antialiased`}
      >
        <NuqsAdapter>
          <main className="font-ibm-plex grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-dvh">
            <Sidebar />
            <div className="px-4 py-2 max-h-dvh overflow-scroll">
              {children}
            </div>
          </main>
        </NuqsAdapter>
      </body>
    </html>
  );
}
