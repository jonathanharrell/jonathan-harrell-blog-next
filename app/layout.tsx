import { ReactNode } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/header";
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
    <html lang="en">
      <body className="font-requiem bg-neutral-100 dark:bg-neutral-800 text-neutral-800">
        <Header />
        <main>{children}</main>
        <footer className="wrapper">footer</footer>
      </body>
    </html>
  );
}
