import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  status?: "success" | "warning" | "error" | "neutral";
}

const MetricCard = ({
  title,
  value,
  change = 0,
  trend = "neutral",
  status = "neutral",
}: MetricCardProps) => {
  return (
    <Card
      className={cn(
        "bg-card transition-all hover:shadow-md",
        status === "success" && "border-l-4 border-l-green-500",
        status === "warning" && "border-l-4 border-l-yellow-500",
        status === "error" && "border-l-4 border-l-red-500",
      )}
    >
      <CardContent className="p-6">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="mt-2 flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
          <div
            className={cn(
              "flex items-center text-sm font-medium px-2.5 py-1 rounded-md",
              trend === "up" && "text-green-700 bg-green-500/10",
              trend === "down" && "text-red-700 bg-red-500/10",
              trend === "neutral" && "text-zinc-700 bg-zinc-500/10",
            )}
          >
            {trend === "up" && <ArrowUpIcon className="mr-1 h-3 w-3" />}
            {trend === "down" && <ArrowDownIcon className="mr-1 h-3 w-3" />}
            {trend === "neutral" && <MinusIcon className="mr-1 h-3 w-3" />}
            {change > 0 ? "+" : ""}
            {change}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricCardsProps {
  metrics?: MetricCardProps[];
}

const MetricCards = ({
  metrics = [
    {
      title: "Total Models",
      value: "2,547",
      change: 12.5,
      trend: "up",
      status: "success",
    },
    {
      title: "Average Score",
      value: "76.8%",
      change: 2.3,
      trend: "up",
      status: "success",
    },
    {
      title: "CO₂ Emissions",
      value: "28.5kg",
      change: -5.2,
      trend: "down",
      status: "warning",
    },
    {
      title: "Error Rate",
      value: "1.2%",
      change: -0.8,
      trend: "down",
      status: "success",
    },
  ],
}: MetricCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default MetricCards;
