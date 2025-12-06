"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { AlertCircle, CheckCircle2, Clock, TrendingUp } from "lucide-react"

interface KPICardProps {
  label: string
  value: string | number
  change?: number
  trend?: "up" | "down"
  icon?: React.ReactNode
}

const KPICard = ({ label, value, change, trend, icon }: KPICardProps) => (
  <div className="bg-card border border-border rounded-lg p-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      {icon && <div className="text-muted-foreground">{icon}</div>}
    </div>
    <div className="text-2xl font-bold text-foreground">{value}</div>
    {change && (
      <div className={`text-xs mt-2 ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
        {trend === "up" ? "↑" : "↓"} {Math.abs(change)}%
      </div>
    )}
  </div>
)

type StatusType = "completed" | "failed" | "pending" | "approved"

interface StatusBadgeProps {
  status: StatusType
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusStyles: Record<StatusType, string> = {
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-blue-100 text-blue-800",
  }
  return (
    <span className={`text-xs px-2 py-1 rounded ${statusStyles[status]}`}>
      {status}
    </span>
  )
}

interface Activity {
  time: string
  action: string
  asset?: string
  exception?: string
  type?: string
  status: StatusType
}

export default function DashboardPage() {
  const recentActivity: Activity[] = [
    { time: "2 hours ago", action: "Scan completed", asset: "prod-db-01", status: "completed" },
    { time: "4 hours ago", action: "Scan failed", asset: "staging-web-02", status: "failed" },
    { time: "6 hours ago", action: "Exception approved", exception: "EXC-2024-0156", status: "approved" },
    { time: "1 day ago", action: "Report generated", type: "Monthly Summary", status: "completed" },
  ]

  return (
    <DashboardLayout title="SCM Dashboard">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          label="Compliance Score"
          value="82%"
          change={5}
          trend="up"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
        <KPICard
          label="Critical Issues"
          value="12"
          change={25}
          trend="down"
          icon={<AlertCircle className="w-5 h-5" />}
        />
        <KPICard label="Running Scans" value="3" icon={<Clock className="w-5 h-5" />} />
        <KPICard
          label="Assets"
          value="2,847"
          change={12}
          trend="up"
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      {/* Recent Activity */}
      <section className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded border border-border/50 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.asset || activity.exception || activity.type}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{activity.time}</span>
                <StatusBadge status={activity.status} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  )
}
