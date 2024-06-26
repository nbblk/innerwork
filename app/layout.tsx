import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./styles/globals.css";

const redhatDisplay = Red_Hat_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={redhatDisplay.className}>{children}</body>
    </html>
  );
}
