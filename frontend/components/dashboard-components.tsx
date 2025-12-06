import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <p className="text-lg font-semibold text-foreground mb-2">{title}</p>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  )
}

export function StatsGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">{children}</div>
}

export function StatCard({ label, value, icon, change, trend }: any) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      <div className="text-2xl font-bold text-foreground mb-2">{value}</div>
      {change && (
        <div className={`text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
          {trend === "up" ? "↑" : "↓"} {Math.abs(change)}% from last period
        </div>
      )}
    </Card>
  )
}

export function Table({ columns, data }: { columns: { label: string; key: string }[]; data: any[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              {columns.map((col) => (
                <th key={col.key} className="text-left px-4 py-3 font-semibold text-foreground">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-sm text-foreground">
                    {row[col.key] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
