"use client"
import { PageHeader } from "@/components/layout/page-header"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy, Trash2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
const apiKeys = [
  {
    id: 1,
    name: "Production API",
    key: "sk_live_abc123...",
    scopes: ["read", "write"],
    created: "2024-01-15",
    lastUsed: "2 hours ago",
  },
  {
    id: 2,
    name: "Integration Key",
    key: "sk_live_def456...",
    scopes: ["read"],
    created: "2024-02-20",
    lastUsed: "1 day ago",
  },
]

export default function APIKeysPage() {
  return (
    <DashboardLayout title="API Keys">
      <div className="space-y-6">
        <PageHeader title="API Keys" description="Manage API keys for programmatic access">
          <Button>Generate New Key</Button>
        </PageHeader>

        <div className="px-6">
          <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "API Keys" }]} />
        </div>

        <div className="px-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow className="border-border hover:bg-secondary/30">
                  <TableHead className="text-foreground font-semibold">Name</TableHead>
                  <TableHead className="text-foreground font-semibold">Key</TableHead>
                  <TableHead className="text-foreground font-semibold">Scopes</TableHead>
                  <TableHead className="text-foreground font-semibold">Created</TableHead>
                  <TableHead className="text-foreground font-semibold">Last Used</TableHead>
                  <TableHead className="text-right text-foreground font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key) => (
                  <TableRow key={key.id} className="border-border hover:bg-secondary/20">
                    <TableCell className="font-medium text-foreground">{key.name}</TableCell>
                    <TableCell className="font-mono text-muted-foreground text-sm">{key.key}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{key.scopes.join(", ")}</TableCell>
                    <TableCell className="text-muted-foreground">{key.created}</TableCell>
                    <TableCell className="text-muted-foreground">{key.lastUsed}</TableCell>
                    <TableCell className="text-right flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
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
