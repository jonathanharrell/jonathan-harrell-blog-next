import { ReactNode, Suspense } from "react";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import NextTopLoader from "nextjs-toploader";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";
import { Spinner } from "@/components/spinner";
import { SkipToContent } from "@/components/skip-to-content";

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
        <head>
          <link
            rel="preload"
            href="/fonts/etbookot-roman-webfont.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/etbookot-italic-webfont.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link rel="icon" href="/assets/favicon/favicon.ico" sizes="32x32" />
          <link
            rel="icon"
            href="/assets/favicon/icon.svg"
            type="image/svg+xml"
          />
          <link
            rel="apple-touch-icon"
            href="/assets/favicon/apple-touch-icon.png"
          />
        </head>
        <body className="flex flex-col min-h-dvh font-etbook bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100">
          <NextTopLoader color="#737373" />
          <SkipToContent />
          <Header />
          <main id="main" className="flex flex-col flex-1" tabIndex={-1}>
            <Suspense
              fallback={
                <div className="flex items-center justify-center flex-1">
                  <Spinner />
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
