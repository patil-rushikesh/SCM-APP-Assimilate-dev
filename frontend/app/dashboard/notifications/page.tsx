"use client"
import { PageHeader } from "@/components/layout/page-header"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { StatusBadge } from "@/components/cards/status-badge"
import { Trash2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
const notifications = [
  {
    id: 1,
    title: "Scan Completed",
    message: "Production CIS scan completed with 95% compliance",
    severity: "completed",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Critical Issue",
    message: "prod-db-01 has 2 critical control failures",
    severity: "failed",
    time: "4 hours ago",
  },
  {
    id: 3,
    title: "Exception Expiring",
    message: "EXC-001 will expire in 7 days",
    severity: "pending",
    time: "6 hours ago",
  },
]

export default function NotificationsPage() {
  return (
    <DashboardLayout title="Notifications">
    <div className="space-y-6">
      <PageHeader title="Notifications" description="View system notifications and alerts">
        <Button variant="outline">Mark All Read</Button>
      </PageHeader>

      <div className="px-6">
        <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Notifications" }]} />
      </div>

      <div className="px-6 space-y-3 max-w-2xl">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className="p-4 border border-border flex items-start justify-between hover:bg-secondary/20 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">{notification.title}</h3>
                <StatusBadge status={notification.severity as any} />
              </div>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
            </div>
            <Button variant="ghost" size="icon">
              <Trash2 className="w-4 h-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
    </DashboardLayout>
  )
}
