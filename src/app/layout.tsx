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
    // <html lang="en" className="font-raleway bg-background font-light text-text">
    <html
      lang="en"
      className="font-raleway font-light text-text"
      style={{
        background:
          "linear-gradient(90deg, rgba(200,203,205,1) 0%, rgba(238,243,246,1) 50%, rgba(200,203,205,1) 100%)",
      }}
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
