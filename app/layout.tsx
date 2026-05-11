import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Toaster from "@/components/Toaster";
import { AppProvider } from "@/lib/AppState";

export const metadata: Metadata = {
  title: "Alumni Network · Universität Bamberg",
  description: "Otto-Friedrich-Universität Bamberg Alumni Dashboard"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProvider>
          <Sidebar />
          <div className="ml-64 min-h-screen">
            <Topbar />
            <main className="px-8 py-8 max-w-7xl mx-auto">{children}</main>
          </div>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
