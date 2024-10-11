import { ReactNode, Suspense } from "react";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Human in the Loop",
  description: "Jonathan Harrell's creative scrapbook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className="flex flex-col min-h-screen font-requiem bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
