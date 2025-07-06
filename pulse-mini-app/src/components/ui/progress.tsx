import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentProps<"div"> {
  value?: number
}

function Progress({ className, value, ...props }: ProgressProps) {
  return (
    <div
      data-slot="progress"
      className={cn(
        "bg-gray-200 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className="bg-blue-500 h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
}

export { Progress }