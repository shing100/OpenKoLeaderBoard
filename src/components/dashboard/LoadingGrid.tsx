import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingGridProps {
  columns?: number;
  rows?: number;
}

export const LoadingGrid = ({ columns = 8, rows = 8 }: LoadingGridProps) => {
  return (
    <Card className="w-full h-[calc(100vh-220px)] min-h-[600px] bg-background overflow-hidden border">
      <ScrollArea className="h-full">
        <div className="min-w-max">
          {/* Header */}
          <div className="flex w-full border-b bg-card sticky top-0 shadow-md z-10">
            <div className="w-16 px-4 py-3">
              <Skeleton className="h-4 w-4" />
            </div>
            <div className="w-[300px] px-4 py-3">
              <Skeleton className="h-4 w-20" />
            </div>
            {Array(columns)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="w-24 px-4 py-3">
                  <Skeleton className="h-4 w-16 ml-auto" />
                </div>
              ))}
          </div>

          {/* Content */}
          <div className="space-y-1">
            {Array(rows)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex w-full items-center border-b px-4 py-3"
                >
                  <div className="w-16 flex items-center justify-start">
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                  <div className="w-[300px]">
                    <Skeleton className="h-5 w-40" />
                  </div>
                  {Array(columns)
                    .fill(0)
                    .map((_, j) => (
                      <div key={j} className="w-24 text-right">
                        <Skeleton className="h-5 w-16 ml-auto" />
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};
