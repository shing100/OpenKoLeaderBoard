import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartData {
  label: string;
  value: number;
}

interface PerformanceChartProps {
  data?: ChartData[];
  chartType?: "line" | "bar";
  metric?: string;
  height?: number;
}

const PerformanceChart = ({
  data = [
    { label: "GPT-4", value: 95.8 },
    { label: "BERT-Large", value: 89.2 },
    { label: "T5-Base", value: 87.5 },
    { label: "RoBERTa-Large", value: 91.3 },
    { label: "GPT-3", value: 93.7 },
  ],
  chartType = "line",
  metric = "accuracy",
  height = 440,
}: PerformanceChartProps) => {
  const maxValue = Math.max(...data.map((item) => item.value));
  const minValue = Math.min(...data.map((item) => item.value));
  const range = maxValue - minValue;
  const padding = range * 0.1;

  const normalizeValue = (value: number) =>
    ((value - minValue) / (range + padding * 2)) * (height - 80);

  const chartWidth = 1472;
  const barWidth = Math.min(80, (chartWidth - 100) / data.length);
  const spacing =
    (chartWidth - 100 - barWidth * data.length) / (data.length - 1);

  return (
    <Card className="w-full h-full bg-background p-6">
      <div className="w-full h-full relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 h-full w-16 flex flex-col justify-between text-sm text-muted-foreground">
          <span>{(maxValue + padding).toFixed(1)}%</span>
          <span>{((maxValue + minValue) / 2).toFixed(1)}%</span>
          <span>{(minValue - padding).toFixed(1)}%</span>
        </div>

        {/* Chart area */}
        <div className="ml-16 h-full">
          {/* Grid lines */}
          <div className="absolute w-full h-full">
            {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
              <div
                key={tick}
                className="absolute w-full border-t border-muted"
                style={{ top: `${tick * 100}%` }}
              />
            ))}
          </div>

          {/* Chart content */}
          <div className="relative h-full">
            {chartType === "bar" ? (
              <div className="absolute bottom-8 flex items-end h-full">
                {data.map((item, index) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center"
                    style={{
                      marginLeft: index === 0 ? 0 : spacing,
                      width: barWidth,
                    }}
                  >
                    <div
                      className="w-full bg-primary rounded-t"
                      style={{
                        height: `${normalizeValue(item.value)}px`,
                      }}
                    />
                    <span className="mt-2 text-sm text-muted-foreground rotate-45 origin-left">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <svg
                className="absolute inset-0 h-[calc(100%-32px)]"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
              >
                <path
                  d={`M ${data
                    .map(
                      (item, index) =>
                        `${(index * (chartWidth - 100)) / (data.length - 1)},${height - normalizeValue(item.value)}`,
                    )
                    .join(" L ")}`}
                  className="stroke-primary fill-none stroke-2"
                />
                {data.map((item, index) => (
                  <g key={item.label}>
                    <circle
                      cx={(index * (chartWidth - 100)) / (data.length - 1)}
                      cy={height - normalizeValue(item.value)}
                      r="4"
                      className="fill-primary"
                    />
                    <text
                      x={(index * (chartWidth - 100)) / (data.length - 1)}
                      y={height - 10}
                      className="text-sm text-muted-foreground"
                      textAnchor="middle"
                      transform={`rotate(45 ${(index * (chartWidth - 100)) / (data.length - 1)} ${height - 10})`}
                    >
                      {item.label}
                    </text>
                  </g>
                ))}
              </svg>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceChart;
