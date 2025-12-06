"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/page-header"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"

const assets = [
  { id: 1, name: "prod-db-01" },
  { id: 2, name: "staging-web-02" },
  { id: 3, name: "api-gateway-01" },
]

const policies = [
  { id: 1, name: "CIS v1.4" },
  { id: 2, name: "STIG Release 1" },
  { id: 3, name: "Internal Security" },
]

export default function NewScanPage() {
  const [step, setStep] = useState(1)
  const [selectedAssets, setSelectedAssets] = useState<number[]>([])
  const [selectedPolicy, setSelectedPolicy] = useState("")

  return (
    <div className="space-y-6">
      <PageHeader title="New Scan" description="Configure and schedule a new compliance scan" />

      <div className="px-6">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Scans", href: "/dashboard/scans" },
            { label: "New Scan" },
          ]}
        />
      </div>

      <div className="px-6 max-w-2xl">
        {/* Wizard Steps */}
        <div className="flex gap-4 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  s === step
                    ? "bg-primary text-primary-foreground"
                    : s < step
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 4 && <div className="w-12 h-0.5 bg-border" />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Assets */}
        {step === 1 && (
          <Card className="p-6 border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Step 1: Select Assets</h2>
            <div className="space-y-3">
              {assets.map((asset) => (
                <div key={asset.id} className="flex items-center gap-3 p-3 border border-border rounded">
                  <Checkbox
                    checked={selectedAssets.includes(asset.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedAssets([...selectedAssets, asset.id])
                      } else {
                        setSelectedAssets(selectedAssets.filter((id) => id !== asset.id))
                      }
                    }}
                  />
                  <label className="flex-1 cursor-pointer text-foreground">{asset.name}</label>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Step 2: Select Policy */}
        {step === 2 && (
          <Card className="p-6 border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Step 2: Select Policy</h2>
            <div className="space-y-3">
              {policies.map((policy) => (
                <div
                  key={policy.id}
                  className="flex items-center gap-3 p-3 border border-border rounded cursor-pointer hover:bg-secondary/20"
                  onClick={() => setSelectedPolicy(policy.name)}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      selectedPolicy === policy.name ? "bg-primary border-primary" : "border-border"
                    }`}
                  />
                  <label className="flex-1 cursor-pointer text-foreground">{policy.name}</label>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Step 3: Configure */}
        {step === 3 && (
          <Card className="p-6 border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Step 3: Configure</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Scan Name</label>
                <Input placeholder="e.g., Weekly Production Scan" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Description (optional)</label>
                <Input placeholder="Add notes about this scan" className="mt-1" />
              </div>
            </div>
          </Card>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <Card className="p-6 border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Step 4: Review & Schedule</h2>
            <div className="space-y-4">
              <div className="p-3 bg-secondary/30 rounded border border-border">
                <p className="text-xs text-muted-foreground">Assets: {selectedAssets.length}</p>
                <p className="text-xs text-muted-foreground">Policy: {selectedPolicy}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Schedule</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Run immediately" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Run Now</SelectItem>
                    <SelectItem value="schedule">Schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Previous
            </Button>
          )}
          <Button onClick={() => (step < 4 ? setStep(step + 1) : null)}>{step === 4 ? "Start Scan" : "Next"}</Button>
        </div>
      </div>
    </div>
  )
}
