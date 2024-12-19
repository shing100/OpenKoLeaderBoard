import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Trophy,
  Star,
  Sparkles,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useState } from "react";

type SortField = keyof Omit<ModelData, "type" | "co2">;
type SortDirection = "asc" | "desc";

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
    },
  ],
  searchQuery = "",
  filterType = "all",
}: ModelComparisonGridProps) => {
  const { t } = useTranslation();
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedAndFilteredData = [...data]
    .filter((row) =>
      row.model.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((row) => {
      if (filterType === "all") return true;
      if (filterType === "top10") return row.rank <= 10;
      return row.type === filterType;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const modifier = sortDirection === "asc" ? 1 : -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * modifier;
      }
      return ((aValue as number) - (bValue as number)) * modifier;
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 ml-1" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1" />
    );
  };

  const HeaderCell = ({
    field,
    label,
    width,
  }: {
    field: SortField;
    label: string;
    width: string;
  }) => (
    <div
      className={cn(
        width,
        "flex items-center justify-end cursor-pointer hover:text-foreground transition-colors",
        field === "model" && "justify-start",
      )}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center">
        {label}
        <SortIcon field={field} />
      </div>
    </div>
  );

  return (
    <Card className="w-full h-[600px] bg-background overflow-hidden border">
      <div className="w-full h-full">
        <div className="flex w-full items-center border-b bg-muted/50 px-4 py-3 text-sm font-medium text-muted-foreground sticky top-0">
          <HeaderCell field="rank" label="#" width="w-16" />
          <HeaderCell field="model" label="Model" width="w-[300px]" />
          <HeaderCell field="average" label="Average" width="w-32" />
          <HeaderCell field="ifeval" label="IFEval" width="w-32" />
          <HeaderCell field="bbh" label="BBH" width="w-32" />
          <HeaderCell field="math" label="MATH" width="w-32" />
          <HeaderCell field="gpqa" label="GPQA" width="w-32" />
          <HeaderCell field="musr" label="MUSR" width="w-32" />
          <HeaderCell field="mmlu" label="MMLU-PRO" width="w-32" />
        </div>

        <ScrollArea className="h-[calc(600px-48px)]">
          {sortedAndFilteredData.length > 0 ? (
            sortedAndFilteredData.map((row) => (
              <div
                key={row.rank}
                className="flex w-full items-center border-b hover:bg-muted/50 transition-colors px-4 py-4 group relative overflow-hidden"
              >
                {/* Rank Background Gradient */}
                {row.rank <= 3 && (
                  <div
                    className={cn(
                      "absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity",
                      row.rank === 1 &&
                        "bg-gradient-to-r from-yellow-500 to-transparent",
                      row.rank === 2 &&
                        "bg-gradient-to-r from-zinc-500 to-transparent",
                      row.rank === 3 &&
                        "bg-gradient-to-r from-amber-500 to-transparent",
                    )}
                  />
                )}
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
                      <Sparkles className="h-4 w-4 text-amber-500" />
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
                <div className="w-32 text-right">
                  <span className="bg-green-500/10 text-green-700 dark:text-green-500 px-2.5 py-1.5 rounded-md font-medium">
                    {row.average.toFixed(2)}%
                  </span>
                </div>
                <div className="w-32 text-right font-medium">
                  {row.ifeval.toFixed(2)}%
                </div>
                <div className="w-32 text-right font-medium">
                  {row.bbh.toFixed(2)}%
                </div>
                <div className="w-32 text-right font-medium">
                  {row.math.toFixed(2)}%
                </div>
                <div className="w-32 text-right font-medium">
                  {row.gpqa.toFixed(2)}%
                </div>
                <div className="w-32 text-right font-medium">
                  {row.musr.toFixed(2)}%
                </div>
                <div className="w-32 text-right font-medium">
                  {row.mmlu.toFixed(2)}%
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
