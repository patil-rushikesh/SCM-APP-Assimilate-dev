"use client"
import { PageHeader } from "@/components/layout/page-header"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/cards/status-badge"
import { KPICard } from "@/components/cards/kpi-card"
import { CheckCircle2, AlertCircle } from "lucide-react"

const assetDetails = {
  id: "prod-db-01",
  name: "Production Database Server",
  type: "Database",
  environment: "Production",
  ipAddress: "192.168.1.100",
  owner: "Database Team",
  lastScan: "2 hours ago",
  complianceScore: 95,
}

const complianceResults = [
  { controlId: "DB-001", name: "Database encryption enabled", status: "completed", severity: "high" },
  { controlId: "DB-002", name: "Backup strategy configured", status: "completed", severity: "medium" },
  { controlId: "DB-003", name: "Access controls enforced", status: "failed", severity: "high" },
  { controlId: "DB-004", name: "Audit logging enabled", status: "completed", severity: "medium" },
]

export default function AssetDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <PageHeader title={assetDetails.name} description={`${assetDetails.type} • ${assetDetails.environment}`}>
        <Button>Run Scan</Button>
      </PageHeader>

      <div className="px-6">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Assets", href: "/dashboard/assets" },
            { label: assetDetails.id },
          ]}
        />
      </div>

      {/* Asset Info */}
      <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase">IP Address</p>
          <p className="text-lg font-semibold text-foreground mt-1">{assetDetails.ipAddress}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase">Owner</p>
          <p className="text-lg font-semibold text-foreground mt-1">{assetDetails.owner}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase">Last Scan</p>
          <p className="text-lg font-semibold text-foreground mt-1">{assetDetails.lastScan}</p>
        </div>
      </div>

      {/* Compliance Metrics */}
      <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard
          label="Compliance Score"
          value={`${assetDetails.complianceScore}%`}
          icon={<CheckCircle2 className="w-8 h-8" />}
        />
        <KPICard label="Passed Controls" value="3" icon={<CheckCircle2 className="w-8 h-8" />} />
        <KPICard label="Failed Controls" value="1" icon={<AlertCircle className="w-8 h-8" />} />
      </div>

      {/* Compliance Results */}
      <div className="px-6">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Compliance Results</h3>
          </div>
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow className="border-border hover:bg-secondary/30">
                <TableHead className="text-foreground font-semibold">Control ID</TableHead>
                <TableHead className="text-foreground font-semibold">Control Name</TableHead>
                <TableHead className="text-foreground font-semibold">Status</TableHead>
                <TableHead className="text-foreground font-semibold">Severity</TableHead>
                <TableHead className="text-right text-foreground font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceResults.map((result) => (
                <TableRow key={result.controlId} className="border-border hover:bg-secondary/20">
                  <TableCell className="font-mono text-sm text-muted-foreground">{result.controlId}</TableCell>
                  <TableCell className="text-foreground">{result.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={result.status as any} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={result.severity === "high" ? "failed" : "pending"} />
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
  )
}
