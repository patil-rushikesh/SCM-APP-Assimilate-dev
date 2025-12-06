"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader, StatsGrid, StatCard, Table } from "@/components/dashboard-components"
import { AlertTriangle, CheckCircle2, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ExceptionsPage() {
  const exceptionStats = [
    { label: "Total Exceptions", value: "47", icon: <AlertTriangle className="w-5 h-5" />, change: 8, trend: "up" },
    { label: "Approved", value: "32", icon: <CheckCircle2 className="w-5 h-5" />, change: 5, trend: "up" },
    { label: "Pending", value: "12", icon: <Clock className="w-5 h-5" />, change: 2, trend: "up" },
    { label: "Rejected", value: "3", icon: <XCircle className="w-5 h-5" />, change: 1, trend: "down" },
  ]

  const exceptions = [
    { exception: "EXC-2024-0156", control: "AC-2.1", status: "Approved", expiry: "2025-03-15", reason: "Temporary access" },
    { exception: "EXC-2024-0157", control: "SI-4.1", status: "Pending", expiry: "2024-12-31", reason: "Legacy system" },
    { exception: "EXC-2024-0158", control: "CP-2.1", status: "Approved", expiry: "2025-06-30", reason: "Business need" },
    { exception: "EXC-2024-0159", control: "AU-2.2", status: "Rejected", expiry: "N/A", reason: "High risk" },
  ]

  return (
    <DashboardLayout title="Exceptions">
      <PageHeader title="Security Exceptions" description="Request and manage security exceptions" />

      <StatsGrid>
        {exceptionStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </StatsGrid>

      <div className="flex gap-3 mb-6">
        <Button>+ Request Exception</Button>
        <Button variant="outline">Export</Button>
      </div>

      <Table
        columns={[
          { label: "Exception", key: "exception" },
          { label: "Control", key: "control" },
          { label: "Status", key: "status" },
          { label: "Expiry", key: "expiry" },
          { label: "Reason", key: "reason" },
        ]}
        data={exceptions}
      />
    </DashboardLayout>
  )
}
