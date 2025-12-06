export interface Asset {
  id: number
  name: string
  type: string
  environment: string
  compliance: string
  status: string
  lastScan: string
}

export interface Scan {
  id: number
  name: string
  assetCount: number
  policy: string
  status: "running" | "completed" | "failed"
  progress: number
}

export interface Exception {
  id: string
  asset: string
  control: string
  status: "approved" | "pending" | "expired"
  expiry: string
}

export interface Evidence {
  id: number
  asset: string
  control: string
  severity: string
  timestamp: string
}

export interface SystemHealth {
  cpu: number
  memory: number
  disk: number
  uptime: number
}

export interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
}
