import { ReactNode, Suspense } from "react";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import NextTopLoader from "nextjs-toploader";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Spinner } from "@/components/spinner";
import { SkipToContent } from "@/components/skip-to-content";
import "@/styles/index.css";
import { openGraphImage } from "@/app/shared-metadata";

export const metadata: Metadata = {
  title: "Human in the Loop",
  description: "Jonathan Harrell’s commonplace book",
  openGraph: {
    ...openGraphImage,
  },
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
          <meta name="color-scheme" content="light" />
        </head>
        <body className="flex flex-col min-h-dvh font-etbook bg-white text-neutral-800">
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
