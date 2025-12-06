"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Zap,
  FileText,
  AlertCircle,
  BarChart3,
  Settings,
  Users,
  Activity,
  Plug,
  Key,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
}

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Assets", href: "/dashboard/assets", icon: Package },
  { label: "Scans", href: "/dashboard/scans", icon: Zap },
  { label: "Evidence", href: "/dashboard/evidence", icon: FileText },
  { label: "Exceptions", href: "/dashboard/exceptions", icon: AlertCircle },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { label: "Policies", href: "/dashboard/policies", icon: Shield },
]

const adminItems = [
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Integrations", href: "/dashboard/integrations", icon: Plug },
  { label: "Activity Logs", href: "/dashboard/logs", icon: Activity },
  { label: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn("bg-sidebar border-r border-sidebar-border transition-all duration-300", isOpen ? "w-64" : "w-20")}
    >
      <div className="h-16 flex items-center justify-center border-b border-sidebar-border">
        <div className="text-xl font-bold text-sidebar-foreground">{isOpen ? "SCM" : "S"}</div>
      </div>

      <nav className="p-4 space-y-8 h-[calc(100vh-64px)] overflow-y-auto">
        <div>
          <div className={cn("text-xs font-semibold text-sidebar-foreground/60 mb-3 px-2", !isOpen && "hidden")}>
            MAIN
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && <span className="text-sm">{item.label}</span>}
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <div className={cn("text-xs font-semibold text-sidebar-foreground/60 mb-3 px-2", !isOpen && "hidden")}>
            ADMIN
          </div>
          <div className="space-y-1">
            {adminItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && <span className="text-sm">{item.label}</span>}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </aside>
  )
}
