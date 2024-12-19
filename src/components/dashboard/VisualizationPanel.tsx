import { Card } from "@/components/ui/card";
import ChartControls from "./ChartControls";
import PerformanceChart from "./PerformanceChart";

interface VisualizationPanelProps {
  chartType?: "line" | "bar";
  selectedMetric?: string;
  metrics?: string[];
  data?: Array<{ label: string; value: number }>;
  onChartTypeChange?: (type: "line" | "bar") => void;
  onMetricChange?: (metric: string) => void;
}

const VisualizationPanel = ({
  chartType = "line",
  selectedMetric = "accuracy",
  metrics = ["accuracy", "latency", "memory", "parameters"],
  data = [
    { label: "GPT-4", value: 95.8 },
    { label: "BERT-Large", value: 89.2 },
    { label: "T5-Base", value: 87.5 },
    { label: "RoBERTa-Large", value: 91.3 },
    { label: "GPT-3", value: 93.7 },
  ],
  onChartTypeChange = () => {},
  onMetricChange = () => {},
}: VisualizationPanelProps) => {
  return (
    <Card className="w-full h-[500px] bg-background">
      <ChartControls
        chartType={chartType}
        selectedMetric={selectedMetric}
        metrics={metrics}
        onChartTypeChange={onChartTypeChange}
        onMetricChange={onMetricChange}
      />
      <div className="h-[440px]">
        <PerformanceChart
          data={data}
          chartType={chartType}
          metric={selectedMetric}
          height={440}
        />
      </div>
    </Card>
  );
};

export default VisualizationPanel;
