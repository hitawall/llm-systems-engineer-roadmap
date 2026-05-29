import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeaderProgress } from "@/components/header-progress"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "LLM Systems Engineer Roadmap",
  description:
    "A personal learning tracker for pivoting into LLM systems engineering — RAG, agents, eval, deployment, and beyond.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm relative">
          <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
            <Link href="/" className="font-semibold text-sm tracking-tight hover:opacity-80 transition-opacity">
              LLM Roadmap
            </Link>
            <nav className="flex items-center gap-2">
              <Link
                href="/projects"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
              >
                About
              </Link>
              <ThemeToggle />
            </nav>
          </div>
          <HeaderProgress />
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
          <p>
            Portfolio &gt; certificates. Alternate courses with building.{" "}
            <Link
              href="/about"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Read the honest caveat.
            </Link>
          </p>
        </footer>
      </body>
    </html>
  )
}
