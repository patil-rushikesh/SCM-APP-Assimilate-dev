"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/dashboard-components"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Bell, Lock, Users } from "lucide-react"

export default function SettingsPage() {
  const settingsSections = [
    {
      icon: <Settings className="w-5 h-5" />,
      title: "General Settings",
      description: "Configure dashboard preferences",
      items: ["Theme", "Language", "Time Zone"],
    },
    {
      icon: <Bell className="w-5 h-5" />,
      title: "Notifications",
      description: "Manage alert and notification preferences",
      items: ["Email Alerts", "Scan Notifications", "Exception Requests"],
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Security",
      description: "Configure security and access settings",
      items: ["2FA Authentication", "API Keys", "Session Management"],
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Users & Roles",
      description: "Manage team members and permissions",
      items: ["Add Users", "Role Management", "Access Control"],
    },
  ]

  return (
    <DashboardLayout title="Settings">
      <PageHeader title="Dashboard Settings" description="Configure your dashboard and preferences" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsSections.map((section, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-primary">{section.icon}</div>
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                {section.items.map((item) => (
                  <p key={item} className="text-sm text-foreground">
                    • {item}
                  </p>
                ))}
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
