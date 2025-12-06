"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "../app/AuthContext"

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
}

const NAV_ITEMS = [
  "Dashboard",
  "Assets",
  "Scans",
  "Evidence",
  "Exceptions",
  "Reports",
  "Settings",
  "Api Keys",
  "Integrations",
  "Logs",
  "Notifications",
  "Policies",
  "Profile",
  "Roles",
  "System Health",
  "Users"
]

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { logout } = useAuth();

  const routeMap: Record<string, string> = {
    "Dashboard": "/dashboard",
    "Assets": "/dashboard/assets",
    "Scans": "/dashboard/scans",
    "Evidence": "/dashboard/evidence",
    "Exceptions": "/dashboard/exceptions",
    "Reports": "/dashboard/reports",
    "Settings": "/dashboard/settings",
    "Api Keys": "/dashboard/api-keys",
    "Integrations": "/dashboard/integrations",
    "Logs": "/dashboard/logs",
    "Notifications": "/dashboard/notifications",
    "Policies": "/dashboard/policies",
    "Profile": "/dashboard/profile",
    "Roles": "/dashboard/roles",
    "System Health": "/dashboard/system-health",
    "Users": "/dashboard/users"
  }

  const handleNavClick = (item: string) => {
    router.push(routeMap[item] || "/dashboard")
  }

  const isActive = (item: string) => {
    return pathname === (routeMap[item] || "/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - fixed to top */}
      <header className="bg-card sticky top-0 z-20">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileOpen(true)}>
              Menu
            </Button>

            <input
              type="search"
              placeholder="Search..."
              className="hidden sm:inline-block bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground placeholder-muted-foreground"
              aria-label="Search dashboard"
            />
            <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/settings")}> 
              Settings
            </Button>
            <Button variant="destructive" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar - fixed position under header, never scrolls */}
        <aside
          className="hidden md:block w-64 min-w-[16rem] max-w-xs border-r border-border bg-card p-4 overflow-hidden flex-shrink-0"
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`w-full text-left px-4 py-2 rounded transition-colors ${
                  isActive(item)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content - scrollable area (only this scrolls) */}
        <main className="flex-1 p-6 overflow-auto h-[calc(100vh-64px)]">{children}</main>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Navigation</h2>
              <Button variant="ghost" size="sm" onClick={() => setMobileOpen(false)}>Close</Button>
            </div>
            <nav className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    handleNavClick(item)
                    setMobileOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 rounded transition-colors ${
                    isActive(item)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </div>
  )
}

