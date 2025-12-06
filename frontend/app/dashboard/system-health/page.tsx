"use client"
import { PageHeader } from "@/components/layout/page-header"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { KPICard } from "@/components/cards/kpi-card"
import { StatusBadge } from "@/components/cards/status-badge"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const systemMetrics = [
  { name: "00:00", cpu: 45, memory: 62, disk: 58 },
  { name: "04:00", cpu: 52, memory: 68, disk: 60 },
  { name: "08:00", cpu: 48, memory: 65, disk: 59 },
  { name: "12:00", cpu: 72, memory: 78, disk: 72 },
  { name: "16:00", cpu: 68, memory: 75, disk: 70 },
  { name: "20:00", cpu: 55, memory: 70, disk: 65 },
]

const serviceStatus = [
  { name: "API Server", status: "completed", uptime: "99.99%", responseTime: "45ms" },
  { name: "Database", status: "completed", uptime: "99.97%", responseTime: "12ms" },
  { name: "Scan Engine", status: "completed", uptime: "99.88%", responseTime: "128ms" },
  { name: "Cache Layer", status: "completed", uptime: "99.95%", responseTime: "2ms" },
  { name: "Message Queue", status: "completed", uptime: "99.99%", responseTime: "8ms" },
]

export default function SystemHealthPage() {
  return (
    <DashboardLayout title="System Health">
      <div className="space-y-6">
      <PageHeader title="System Health" description="Monitor system performance and service status" />

      <div className="px-6">
        <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "System Health" }]} />
      </div>

      {/* Status Cards */}
      <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard label="Overall Status" value="Healthy" icon={<CheckCircle2 className="w-8 h-8 text-primary" />} />
        <KPICard label="Avg Uptime" value="99.96%" icon={<Clock className="w-8 h-8" />} />
        <KPICard label="Critical Alerts" value="0" icon={<AlertCircle className="w-8 h-8" />} />
      </div>

      <div className="px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CPU Usage */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-4">CPU Usage</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={systemMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Line type="monotone" dataKey="cpu" stroke="oklch(0.3 0.1 0)" dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-muted-foreground mt-2">Current: 55%</p>
        </div>

        {/* Memory Usage */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-4">Memory Usage</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={systemMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Area type="monotone" dataKey="memory" fill="oklch(0.4 0.1 0)" stroke="oklch(0.3 0.1 0)" />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-sm text-muted-foreground mt-2">Current: 70GB / 128GB</p>
        </div>

        {/* Disk Usage */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-4">Disk Usage</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={systemMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Line type="monotone" dataKey="disk" stroke="oklch(0.5 0.1 0)" dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-muted-foreground mt-2">Current: 65%</p>
        </div>
      </div>

      {/* Service Status */}
      <div className="px-6 bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Service Status</h3>
        <div className="space-y-3">
          {serviceStatus.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between p-3 rounded border border-border/50 hover:bg-secondary/20"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{service.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Uptime</p>
                  <p className="text-sm font-semibold text-foreground">{service.uptime}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Response</p>
                  <p className="text-sm font-semibold text-foreground">{service.responseTime}</p>
                </div>
                <StatusBadge status={service.status as any} />
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </DashboardLayout>
  )
}
