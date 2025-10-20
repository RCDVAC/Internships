import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChatLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Skeleton className="mb-2 h-9 w-48" />
          <Skeleton className="h-5 w-96" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <Card className="p-4">
            <Skeleton className="mb-4 h-6 w-32" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <Skeleton className="mb-4 h-6 w-32" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
