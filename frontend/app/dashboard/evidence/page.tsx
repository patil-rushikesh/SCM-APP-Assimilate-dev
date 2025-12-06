"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader, StatsGrid, StatCard, Table } from "@/components/dashboard-components"
import { FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EvidencePage() {
  const evidenceStats = [
    { label: "Total Evidence", value: "856", icon: <FileText className="w-5 h-5" />, change: 23, trend: "up" },
    { label: "Verified", value: "812", icon: <CheckCircle2 className="w-5 h-5" />, change: 18, trend: "up" },
    { label: "Pending", value: "34", icon: <Clock className="w-5 h-5" />, change: 4, trend: "up" },
    { label: "Issues", value: "10", icon: <AlertCircle className="w-5 h-5" />, change: 1, trend: "down" },
  ]

  const evidence = [
    { evidence: "EV-2024-001", control: "AC-2.1", status: "Verified", type: "Scan Report", uploaded: "2 days ago" },
    { evidence: "EV-2024-002", control: "AC-3.2", status: "Pending", type: "Screenshot", uploaded: "1 day ago" },
    { evidence: "EV-2024-003", control: "SI-4.1", status: "Verified", type: "Log File", uploaded: "3 days ago" },
    { evidence: "EV-2024-004", control: "CP-2.1", status: "Issues", type: "Document", uploaded: "5 days ago" },
  ]

  return (
    <DashboardLayout title="Evidence">
      <PageHeader title="Compliance Evidence" description="Manage and verify compliance evidence" />

      <StatsGrid>
        {evidenceStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </StatsGrid>

      <div className="flex gap-3 mb-6">
        <Button>+ Upload Evidence</Button>
        <Button variant="outline">Bulk Import</Button>
      </div>

      <Table
        columns={[
          { label: "Evidence", key: "evidence" },
          { label: "Control", key: "control" },
          { label: "Status", key: "status" },
          { label: "Type", key: "type" },
          { label: "Uploaded", key: "uploaded" },
        ]}
        data={evidence}
      />
    </DashboardLayout>
  )
}
