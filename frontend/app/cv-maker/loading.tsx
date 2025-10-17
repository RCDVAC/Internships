import { Skeleton } from "@/components/ui/skeleton"

export default function CVMakerLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="mt-2 h-5 w-96" />
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="lg:col-span-9">
            <Skeleton className="h-[600px] w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
