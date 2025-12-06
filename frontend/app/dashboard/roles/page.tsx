"use client"
import { PageHeader } from "@/components/layout/page-header"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
const roles = [
  {
    name: "Admin",
    description: "Full system access and management",
    permissions: [
      "View Dashboard",
      "Manage Scans",
      "Manage Users",
      "Manage Policies",
      "View Reports",
      "Configure Settings",
    ],
  },
  {
    name: "Auditor",
    description: "Audit and compliance review access",
    permissions: ["View Dashboard", "View Scans", "View Evidence", "View Reports", "Manage Exceptions"],
  },
  {
    name: "Viewer",
    description: "Read-only access to dashboard",
    permissions: ["View Dashboard", "View Reports"],
  },
]

export default function RolesPage() {
  return (
    <DashboardLayout title="Roles">
    <div className="space-y-6">
      <PageHeader title="Roles" description="Manage user roles and permissions">
        <Button>Create Role</Button>
      </PageHeader>

      <div className="px-6">
        <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Roles" }]} />
      </div>

      <div className="px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.name} className="p-6 border border-border">
            <h3 className="font-semibold text-lg text-foreground mb-2">{role.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
            <div className="space-y-2">
              {role.permissions.map((permission) => (
                <div key={permission} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{permission}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Edit
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
    </DashboardLayout>
  )
}
