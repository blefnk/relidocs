import type { Metadata } from "next";

import "./globals.css";

import { RootProvider } from "fumadocs-ui/provider";
import { cn } from "fumadocs-ui/utils/cn";
import { Inter, Space_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  description:
    "reliverse is a commitment to modernize how we build, not just what we build. it's a movement for speed, clarity, and trust. a universe where devs don't fight their tools, and code feels like flow, not friction.",
  metadataBase: new URL("https://docs.reliverse.org"),
  openGraph: {
    images: "/og-image.png",
  },
  title: "relidocs: reliverse documentation",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={inter.className} lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex flex-col min-h-screen bg-background font-sans antialiased",
          inter.variable,
          spaceMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
          themes={["light", "dark", "ghibli", "system"]}
        >
          <RootProvider>{children}</RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
