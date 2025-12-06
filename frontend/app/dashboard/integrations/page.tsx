"use client"
import { PageHeader } from "@/components/layout/page-header"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, XCircle, Plug } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
const integrations = [
  { name: "ServiceNow", status: "connected", description: "IT Service Management" },
  { name: "Jira", status: "connected", description: "Issue Tracking" },
  { name: "Vault", status: "disconnected", description: "Secrets Management" },
  { name: "Splunk", status: "connected", description: "SIEM" },
]

export default function IntegrationsPage() {
  return (
    <DashboardLayout title="Integrations">
      <div className="space-y-6">
      <PageHeader title="Integrations" description="Connect external services and platforms" />

      <div className="px-6">
        <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Integrations" }]} />
      </div>

      <div className="px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.name} className="p-6 border border-border flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/30 rounded">
                <Plug className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{integration.name}</h3>
                <p className="text-sm text-muted-foreground">{integration.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  {integration.status === "connected" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary border-primary/20">
                        Connected
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-muted-foreground" />
                      <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground">
                        Disconnected
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Button variant={integration.status === "connected" ? "outline" : "default"} size="sm">
              {integration.status === "connected" ? "Manage" : "Connect"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
    </DashboardLayout>
  )
}
