export const mockAssets = [
  {
    id: 1,
    name: "prod-db-01",
    type: "Database",
    environment: "Production",
    compliance: "95%",
    status: "completed",
    lastScan: "2 hours ago",
  },
  {
    id: 2,
    name: "staging-web-02",
    type: "Web Server",
    environment: "Staging",
    compliance: "78%",
    status: "failed",
    lastScan: "4 hours ago",
  },
  {
    id: 3,
    name: "api-gateway-01",
    type: "API Gateway",
    environment: "Production",
    compliance: "88%",
    status: "completed",
    lastScan: "1 hour ago",
  },
]

export const mockScans = [
  { id: 1, name: "CIS AWS Scan", assetCount: 5, policy: "CIS v1.4", status: "completed" as const, progress: 100 },
  { id: 2, name: "STIG DB Audit", assetCount: 2, policy: "STIG Release 1", status: "running" as const, progress: 65 },
]

export const mockExceptions = [
  { id: "EXC-001", asset: "prod-db-01", control: "DB-003", status: "approved" as const, expiry: "2024-12-31" },
  { id: "EXC-002", asset: "api-gateway-01", control: "API-001", status: "pending" as const, expiry: "N/A" },
]
