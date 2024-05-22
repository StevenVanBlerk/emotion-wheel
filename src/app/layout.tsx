import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emotion wheel",
  description:
    "An interactive emotion wheel to help you make sense of what you are feeling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // TO-DO use new theme variables
    <html lang="en" className="bg-background text-text">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
