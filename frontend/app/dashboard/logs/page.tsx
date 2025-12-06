"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
const auditLogs = [
  {
    id: 1,
    timestamp: "2024-12-04 14:23:45",
    actor: "John Doe",
    action: "Started scan",
    context: "prod-db-01",
    hash: "a1b2c3d4...",
  },
  {
    id: 2,
    timestamp: "2024-12-04 13:15:22",
    actor: "Jane Smith",
    action: "Approved exception",
    context: "EXC-001",
    hash: "e5f6g7h8...",
  },
  {
    id: 3,
    timestamp: "2024-12-04 12:08:10",
    actor: "Mike Johnson",
    action: "Generated report",
    context: "Monthly Report",
    hash: "i9j0k1l2...",
  },
  {
    id: 4,
    timestamp: "2024-12-04 11:42:33",
    actor: "Admin",
    action: "Updated settings",
    context: "Security Policy",
    hash: "m3n4o5p6...",
  },
]

export default function LogsPage() {
  const [search, setSearch] = useState("")

  return (
      <DashboardLayout title="Logs">
        <div className="space-y-6">
      <PageHeader title="Activity Logs" description="Immutable audit trail of all system actions" />

      <div className="px-6">
        <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Activity Logs" }]} />
      </div>

      <div className="px-6 space-y-4">
        {/* Filters */}
        <div className="flex gap-2">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by actor or action..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Action Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="scan">Scan</SelectItem>
              <SelectItem value="report">Report</SelectItem>
              <SelectItem value="exception">Exception</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow className="border-border hover:bg-secondary/30">
                <TableHead className="text-foreground font-semibold">Timestamp</TableHead>
                <TableHead className="text-foreground font-semibold">Actor</TableHead>
                <TableHead className="text-foreground font-semibold">Action</TableHead>
                <TableHead className="text-foreground font-semibold">Context</TableHead>
                <TableHead className="text-foreground font-semibold">Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id} className="border-border hover:bg-secondary/20">
                  <TableCell className="text-muted-foreground text-sm">{log.timestamp}</TableCell>
                  <TableCell className="text-foreground">{log.actor}</TableCell>
                  <TableCell className="text-foreground">{log.action}</TableCell>
                  <TableCell className="text-muted-foreground">{log.context}</TableCell>
                  <TableCell className="font-mono text-muted-foreground text-xs">{log.hash}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
      </DashboardLayout>
  )
}
