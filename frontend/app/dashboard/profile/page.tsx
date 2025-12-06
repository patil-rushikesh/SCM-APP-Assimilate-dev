"use client"
import { PageHeader } from "@/components/layout/page-header"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
export default function ProfilePage() {
  return (
    <DashboardLayout title="Profile">
      <div className="space-y-6">
        <PageHeader title="Profile" description="Manage your account and preferences" />

        <div className="px-6">
          <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Profile" }]} />
        </div>

        <div className="px-6">
          <Tabs defaultValue="profile" className="w-full max-w-2xl">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card className="p-6 border border-border space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <Input defaultValue="John Doe" className="mt-2" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input type="email" defaultValue="john@example.com" className="mt-2" disabled />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Role</label>
                  <Input defaultValue="Administrator" className="mt-2" disabled />
                </div>
                <Button>Save Changes</Button>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="p-6 border border-border space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground mt-1">Add extra security to your account</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">Enabled</span>
                  </div>
                </div>
                <Button>Change Password</Button>
              </Card>
            </TabsContent>

            <TabsContent value="sessions" className="space-y-6">
              <Card className="p-6 border border-border">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded border border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">Current Session</p>
                      <p className="text-xs text-muted-foreground">Chrome on macOS</p>
                    </div>
                    <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary border-primary/20">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded border border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">Previous Session</p>
                      <p className="text-xs text-muted-foreground">Firefox on Windows • 2 days ago</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Revoke
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}

