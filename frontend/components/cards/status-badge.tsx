import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "running" | "completed" | "failed" | "pending" | "approved" | "expired"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    running: {
      label: "Running",
      bg: "bg-blue-50 text-blue-700 border-blue-200",
      darkBg: "dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-700",
    },
    completed: {
      label: "Completed",
      bg: "bg-green-50 text-green-700 border-green-200",
      darkBg: "dark:bg-green-900/20 dark:text-green-400 dark:border-green-700",
    },
    failed: {
      label: "Failed",
      bg: "bg-red-50 text-red-700 border-red-200",
      darkBg: "dark:bg-red-900/20 dark:text-red-400 dark:border-red-700",
    },
    pending: {
      label: "Pending",
      bg: "bg-yellow-50 text-yellow-700 border-yellow-200",
      darkBg: "dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-700",
    },
    approved: {
      label: "Approved",
      bg: "bg-green-50 text-green-700 border-green-200",
      darkBg: "dark:bg-green-900/20 dark:text-green-400 dark:border-green-700",
    },
    expired: {
      label: "Expired",
      bg: "bg-gray-50 text-gray-700 border-gray-200",
      darkBg: "dark:bg-gray-700/30 dark:text-gray-300 dark:border-gray-600",
    },
  }

  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.bg,
        config.darkBg,
        className,
      )}
    >
      {config.label}
    </span>
  )
}
