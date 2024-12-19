import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, LineChart } from "lucide-react";

interface ChartControlsProps {
  chartType?: "line" | "bar";
  selectedMetric?: string;
  metrics?: string[];
  onChartTypeChange?: (type: "line" | "bar") => void;
  onMetricChange?: (metric: string) => void;
}

const ChartControls = ({
  chartType = "line",
  selectedMetric = "accuracy",
  metrics = ["accuracy", "latency", "memory", "parameters"],
  onChartTypeChange = () => {},
  onMetricChange = () => {},
}: ChartControlsProps) => {
  return (
    <div className="flex items-center justify-between w-full h-[60px] bg-background p-4 border-b">
      <div className="flex items-center space-x-4">
        <Button
          variant={chartType === "line" ? "default" : "outline"}
          size="icon"
          onClick={() => onChartTypeChange("line")}
        >
          <LineChart className="h-4 w-4" />
        </Button>
        <Button
          variant={chartType === "bar" ? "default" : "outline"}
          size="icon"
          onClick={() => onChartTypeChange("bar")}
        >
          <BarChart className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Metric:</span>
        <Select value={selectedMetric} onValueChange={onMetricChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            {metrics.map((metric) => (
              <SelectItem key={metric} value={metric}>
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ChartControls;
