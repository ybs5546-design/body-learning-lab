import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "우리 몸 탐구실 | 6학년 과학",
  description: "발표를 듣고, 탐구하고, 나의 말로 연결하는 우리 몸 학습 공간",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
