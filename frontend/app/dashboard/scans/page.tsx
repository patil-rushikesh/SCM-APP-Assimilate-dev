"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader, StatsGrid, StatCard, Table } from "@/components/dashboard-components"
import { Play, CheckCircle2, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ScansPage() {
  const scanStats = [
    { label: "Total Scans", value: "1,234", icon: <Play className="w-5 h-5" />, change: 45, trend: "up" },
    { label: "Completed", value: "1,198", icon: <CheckCircle2 className="w-5 h-5" />, change: 12, trend: "up" },
    { label: "Failed", value: "24", icon: <XCircle className="w-5 h-5" />, change: 5, trend: "down" },
    { label: "Running", value: "12", icon: <Clock className="w-5 h-5" />, change: 2, trend: "up" },
  ]

  const scans = [
    { scan: "SCAN-2024-001", asset: "prod-db-01", type: "Full", status: "Completed", initiated: "2 hours ago" },
    { scan: "SCAN-2024-002", asset: "staging-web-02", type: "Quick", status: "Failed", initiated: "4 hours ago" },
    { scan: "SCAN-2024-003", asset: "prod-api-03", type: "Full", status: "Running", initiated: "30 minutes ago" },
    { scan: "SCAN-2024-004", asset: "dev-app-04", type: "Compliance", status: "Pending", initiated: "1 day ago" },
  ]

  return (
    <DashboardLayout title="Scans">
      <PageHeader title="Security Scans" description="View and manage all security scans" />

      <StatsGrid>
        {scanStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </StatsGrid>

      <div className="flex gap-3 mb-6">
        <Button>+ New Scan</Button>
        <Button variant="outline">Schedule</Button>
      </div>

      <Table
        columns={[
          { label: "Scan", key: "scan" },
          { label: "Asset", key: "asset" },
          { label: "Type", key: "type" },
          { label: "Status", key: "status" },
          { label: "Initiated", key: "initiated" },
        ]}
        data={scans}
      />
    </DashboardLayout>
  )
}
