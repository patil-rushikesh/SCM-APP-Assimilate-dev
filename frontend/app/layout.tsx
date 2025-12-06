import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./AuthContext";
import { cookies } from "next/headers";

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SCM Platform Dashboard",
  description: "Enterprise Supply Chain Security & Compliance Management Platform",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get('user_token');
  const userToken = token?.value;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <AuthProvider userToken={userToken}>
          {children}  
        </AuthProvider>
      </body>
    </html>
  )
}
