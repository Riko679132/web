import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Counter App",
  description: "极简全栈计数器 - Next.js + Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
        {children}
      </body>
    </html>
  );
}
