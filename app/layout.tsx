import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Human in the Loop",
  description: "Jonathan Harrell's creative scrapbook",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-requiem bg-white text-neutral-800">
        {children}
      </body>
    </html>
  );
}
