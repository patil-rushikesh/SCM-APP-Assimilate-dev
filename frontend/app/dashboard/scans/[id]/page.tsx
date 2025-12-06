"use client"
import { PageHeader } from "@/components/layout/page-header"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { KPICard } from "@/components/cards/kpi-card"
import { StatusBadge } from "@/components/cards/status-badge"
import { CheckCircle2, AlertCircle, Clock } from "lucide-react"

const scanDetails = {
  name: "Production CIS Scan",
  status: "running",
  progress: 65,
  startTime: "11:15 AM",
  estimatedTime: "2 hours",
  assetsCanned: 5,
  controlsChecked: 2342,
}

const scanLogs = [
  "Starting scan on prod-db-01...",
  "Checking 342 CIS controls...",
  "Database encryption: PASS",
  "Access controls: FAIL - Missing role separation",
  "Backup strategy: PASS",
  "Moving to next asset...",
  "Starting scan on api-gateway-01...",
  "Checking 289 CIS controls...",
  "TLS configuration: PASS",
  "Rate limiting: PASS",
]

export default function ScanDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <PageHeader title={scanDetails.name} description="Real-time scan progress and details" />

      <div className="px-6">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Scans", href: "/dashboard/scans" },
            { label: scanDetails.name },
          ]}
        />
      </div>

      {/* Metrics */}
      <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard label="Progress" value={`${scanDetails.progress}%`} icon={<Clock className="w-8 h-8" />} />
        <KPICard
          label="Controls Checked"
          value={scanDetails.controlsChecked.toLocaleString()}
          icon={<CheckCircle2 className="w-8 h-8" />}
        />
        <KPICard label="Status" value={scanDetails.status} icon={<AlertCircle className="w-8 h-8" />} />
      </div>

      <div className="px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Bar */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">Scan Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-foreground">Overall Progress</span>
                <span className="text-sm font-semibold text-foreground">{scanDetails.progress}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div
                  className="bg-primary h-full rounded-full transition-all"
                  style={{ width: `${scanDetails.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-3 rounded bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">Assets Scanned</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{scanDetails.assetsCanned}</p>
              </div>
              <div className="p-3 rounded bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">Estimated Time</p>
                <p className="text-lg font-semibold text-foreground mt-1">{scanDetails.estimatedTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">Scan Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <StatusBadge status={scanDetails.status as any} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Started</p>
              <p className="text-sm font-medium text-foreground">{scanDetails.startTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="px-6 bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Scan Logs</h3>
        <div className="bg-primary text-primary-foreground rounded p-4 font-mono text-xs space-y-1 max-h-80 overflow-y-auto">
          {scanLogs.map((log, index) => (
            <div key={index} className="text-primary-foreground/80">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
