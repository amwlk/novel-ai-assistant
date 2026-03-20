import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "长篇小说AI助手",
  description: "网文创作者专属的AI创作提效平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className={`${inter.variable} min-h-full flex flex-col bg-gray-50`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
