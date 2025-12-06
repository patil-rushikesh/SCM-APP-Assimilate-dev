"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader, StatsGrid, StatCard, Table } from "@/components/dashboard-components"
import { BarChart3, Calendar, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ReportsPage() {
  const reportStats = [
    { label: "Reports Generated", value: "89", icon: <FileText className="w-5 h-5" />, change: 15, trend: "up" },
    { label: "This Month", value: "12", icon: <Calendar className="w-5 h-5" />, change: 3, trend: "up" },
    { label: "Scheduled", value: "6", icon: <BarChart3 className="w-5 h-5" />, change: 1, trend: "up" },
    { label: "Downloads", value: "234", icon: <Download className="w-5 h-5" />, change: 28, trend: "up" },
  ]

  const reports = [
    { report: "Monthly Summary", type: "Compliance", generated: "2024-01-31", status: "Available", size: "2.4 MB" },
    { report: "Vulnerability Report", type: "Security", generated: "2024-01-25", status: "Available", size: "5.1 MB" },
    { report: "Audit Trail", type: "Operational", generated: "2024-01-20", status: "Available", size: "1.8 MB" },
    { report: "Executive Summary", type: "Management", generated: "2024-01-15", status: "Scheduled", size: "Pending" },
  ]

  return (
    <DashboardLayout title="Reports">
      <PageHeader title="Compliance Reports" description="Generate and manage compliance reports" />

      <StatsGrid>
        {reportStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </StatsGrid>

      <div className="flex gap-3 mb-6">
        <Button>+ Generate Report</Button>
        <Button variant="outline">Manage Schedule</Button>
      </div>

      <Table
        columns={[
          { label: "Report", key: "report" },
          { label: "Type", key: "type" },
          { label: "Generated", key: "generated" },
          { label: "Status", key: "status" },
          { label: "Size", key: "size" },
        ]}
        data={reports}
      />
    </DashboardLayout>
  )
}
