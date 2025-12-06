import type React from "react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  label: string
  value: string | number
  change?: number
  trend?: "up" | "down"
  icon?: React.ReactNode
  className?: string
}

export function KPICard({ label, value, change, trend, icon, className }: KPICardProps) {
  return (
    <div className={cn("bg-card border border-border rounded-lg p-4", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase">{label}</p>
          <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
          {change !== undefined && (
            <p className={cn("text-xs mt-2", trend === "up" ? "text-destructive" : "text-muted-foreground")}>
              {trend === "up" ? "↑" : "↓"} {Math.abs(change)}% from last period
            </p>
          )}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </div>
  )
}
