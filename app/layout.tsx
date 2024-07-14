import type { Metadata } from "next";
import "./globals.css";
import {Nav} from "@/components/nav";

export const metadata: Metadata = {
  title: "Jonathan Harrell",
  description: "Jonathan Harrell's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mercury bg-white text-neutral-800">
        <Nav />
        <main className="md:w-[95vw] lg:w-[90vw] 2xl:w-[80vw] max-w-[1300px] mx-auto px-8 sm:px-12">
          {children}
        </main>
      </body>
    </html>
  );
}
