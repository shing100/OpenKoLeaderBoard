import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Star } from "lucide-react";

interface ModelData {
  rank: number;
  type: "gpt" | "llama" | "mistral";
  model: string;
  average: number;
  ifeval: number;
  bbh: number;
  math: number;
  gpqa: number;
  musr: number;
  mmlu: number;
  co2: number;
}

interface ModelComparisonGridProps {
  data?: ModelData[];
  searchQuery?: string;
  filterType?: string;
}

const ModelComparisonGrid = ({
  data = [
    {
      rank: 1,
      type: "gpt",
      model: "MazyarPanahi/calme-3.2-instruct-7bb",
      average: 52.02,
      ifeval: 80.63,
      bbh: 62.61,
      math: 39.95,
      gpqa: 20.36,
      musr: 38.53,
      mmlu: 70.03,
      co2: 33.01,
    },
    {
      rank: 2,
      type: "llama",
      model: "dfurman/CalmRys-7BB-Orpo-v0.1",
      average: 51.24,
      ifeval: 81.63,
      bbh: 61.92,
      math: 40.71,
      gpqa: 20.02,
      musr: 36.37,
      mmlu: 66.8,
      co2: 13.0,
    },
    {
      rank: 3,
      type: "llama",
      model: "MazyarPanahi/calme-3.1-instruct-7bb",
      average: 51.2,
      ifeval: 81.36,
      bbh: 62.41,
      math: 38.75,
      gpqa: 19.46,
      musr: 36.5,
      mmlu: 68.72,
      co2: 32.22,
    },
    {
      rank: 4,
      type: "mistral",
      model: "mistralai/Mistral-7B-v0.1",
      average: 50.8,
      ifeval: 79.45,
      bbh: 60.32,
      math: 37.91,
      gpqa: 18.76,
      musr: 35.8,
      mmlu: 67.54,
      co2: 28.15,
    },
  ],
  searchQuery = "",
  filterType = "all",
}: ModelComparisonGridProps) => {
  const filteredData = data
    .filter((row) =>
      row.model.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((row) => {
      if (filterType === "all") return true;
      if (filterType === "top10") return row.rank <= 10;
      return row.type === filterType;
    });

  return (
    <Card className="w-full h-[600px] bg-background overflow-hidden border">
      <div className="w-full h-full">
        <div className="flex w-full items-center border-b bg-muted/50 px-4 py-3 text-sm font-medium text-muted-foreground sticky top-0">
          <div className="w-16 text-center">#</div>
          <div className="w-[300px]">Model</div>
          <div className="w-24 text-right">Average</div>
          <div className="w-24 text-right">IFEval</div>
          <div className="w-24 text-right">BBH</div>
          <div className="w-24 text-right">MATH</div>
          <div className="w-24 text-right">GPQA</div>
          <div className="w-24 text-right">MUSR</div>
          <div className="w-24 text-right">MMLU-PRO</div>
          <div className="w-24 text-right">CO₂ Cost</div>
        </div>

        <ScrollArea className="h-[calc(600px-48px)]">
          {filteredData.length > 0 ? (
            filteredData.map((row) => (
              <div
                key={row.rank}
                className="flex w-full items-center border-b hover:bg-muted/50 transition-colors px-4 py-4 group"
              >
                <div className="w-16 flex items-center justify-center">
                  {row.rank === 1 ? (
                    <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                    </div>
                  ) : row.rank === 2 ? (
                    <div className="h-8 w-8 rounded-full bg-zinc-500/10 flex items-center justify-center">
                      <Star className="h-4 w-4 text-zinc-500" />
                    </div>
                  ) : row.rank === 3 ? (
                    <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <Star className="h-4 w-4 text-amber-500" />
                    </div>
                  ) : (
                    <span className="text-muted-foreground font-medium">
                      {row.rank}
                    </span>
                  )}
                </div>
                <div className="w-[300px] font-medium text-primary group-hover:text-primary/80 transition-colors">
                  {row.model}
                </div>
                <div className="w-24 text-right">
                  <span className="bg-green-500/10 text-green-700 dark:text-green-500 px-2.5 py-1.5 rounded-md font-medium">
                    {row.average.toFixed(2)}%
                  </span>
                </div>
                <div className="w-24 text-right font-medium">
                  {row.ifeval.toFixed(2)}%
                </div>
                <div className="w-24 text-right font-medium">
                  {row.bbh.toFixed(2)}%
                </div>
                <div className="w-24 text-right font-medium">
                  {row.math.toFixed(2)}%
                </div>
                <div className="w-24 text-right font-medium">
                  {row.gpqa.toFixed(2)}%
                </div>
                <div className="w-24 text-right font-medium">
                  {row.musr.toFixed(2)}%
                </div>
                <div className="w-24 text-right font-medium">
                  {row.mmlu.toFixed(2)}%
                </div>
                <div className="w-24 text-right font-medium">
                  {row.co2.toFixed(2)}kg
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No models found
            </div>
          )}
        </ScrollArea>
      </div>
    </Card>
  );
};

export default ModelComparisonGrid;
