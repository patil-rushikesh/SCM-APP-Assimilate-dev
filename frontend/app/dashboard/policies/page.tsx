"use client"
import { PageHeader } from "@/components/layout/page-header"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/cards/status-badge"
import { Upload } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const policies = [
  { id: 1, name: "CIS AWS Foundations", type: "CIS", version: "1.4.0", controls: 342, status: "active" },
  { id: 2, name: "STIG Application Security", type: "STIG", version: "Release 1", controls: 289, status: "active" },
  { id: 3, name: "Internal Security Policy", type: "Custom", version: "2.1", controls: 156, status: "active" },
]

export default function PoliciesPage() {
  return (
        <DashboardLayout title="Policies">
          <div className="space-y-6">
      <PageHeader title="Policies" description="Manage compliance frameworks and control policies">
        <Button>
          <span className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import Policy
          </span>
        </Button>
      </PageHeader>

      <div className="px-6">
        <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Policies" }]} />
      </div>

      <div className="px-6">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow className="border-border hover:bg-secondary/30">
                <TableHead className="text-foreground font-semibold">Policy Name</TableHead>
                <TableHead className="text-foreground font-semibold">Type</TableHead>
                <TableHead className="text-foreground font-semibold">Version</TableHead>
                <TableHead className="text-foreground font-semibold">Controls</TableHead>
                <TableHead className="text-foreground font-semibold">Status</TableHead>
                <TableHead className="text-right text-foreground font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id} className="border-border hover:bg-secondary/20">
                  <TableCell className="font-medium text-foreground">{policy.name}</TableCell>
                  <TableCell className="text-muted-foreground">{policy.type}</TableCell>
                  <TableCell className="text-muted-foreground">{policy.version}</TableCell>
                  <TableCell className="text-muted-foreground">{policy.controls}</TableCell>
                  <TableCell>
                    <StatusBadge status="completed" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
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
