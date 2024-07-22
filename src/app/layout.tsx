import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { pageMetadata } from "@/info";

export const metadata: Metadata = pageMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/avatar.png" type="image/png" />
      </head>
      <body
        className={cn(
          "min-h-screen h-screen bg-background font-sans antialiased dark"
        )}
      >
        {children}
      </body>
    </html>
  );
}
