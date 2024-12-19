import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Trophy,
  Star,
  Sparkles,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  HelpCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SortField = keyof Omit<ModelData, "type">;
type SortDirection = "asc" | "desc";

interface ModelData {
  rank: number;
  type: "gpt" | "llama" | "mistral";
  model: string;
  average?: number;
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

const LoadingRow = () => (
  <div className="flex w-full items-center border-b px-6 py-4">
    <div className="w-20 flex items-center justify-center">
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
    <div className="w-[400px]">
      <Skeleton className="h-6 w-48" />
    </div>
    <div className="w-40 text-right">
      <Skeleton className="h-8 w-20 ml-auto" />
    </div>
    <div className="w-40 text-right">
      <Skeleton className="h-6 w-16 ml-auto" />
    </div>
    <div className="w-40 text-right">
      <Skeleton className="h-6 w-16 ml-auto" />
    </div>
    <div className="w-40 text-right">
      <Skeleton className="h-6 w-16 ml-auto" />
    </div>
    <div className="w-40 text-right">
      <Skeleton className="h-6 w-16 ml-auto" />
    </div>
    <div className="w-40 text-right">
      <Skeleton className="h-6 w-16 ml-auto" />
    </div>
    <div className="w-40 text-right">
      <Skeleton className="h-6 w-16 ml-auto" />
    </div>
  </div>
);

const ModelComparisonGrid = ({
  data = [
    {
      rank: 1,
      type: "llama",
      model: "beomi/KoAlpaca-Polyglot-12.8B",
      ifeval: 68.42,
      bbh: 45.31,
      math: 28.75,
      gpqa: 42.16,
      musr: 52.83,
      mmlu: 58.92,
    },
    {
      rank: 2,
      type: "mistral",
      model: "nlpai-lab/kullm-polyglot-12.8b-v2",
      ifeval: 65.73,
      bbh: 43.82,
      math: 26.91,
      gpqa: 40.53,
      musr: 50.12,
      mmlu: 56.84,
    },
    {
      rank: 3,
      type: "gpt",
      model: "EleutherAI/polyglot-ko-12.8b",
      ifeval: 63.91,
      bbh: 42.15,
      math: 25.63,
      gpqa: 38.92,
      musr: 48.75,
      mmlu: 54.21,
    },
    {
      rank: 4,
      type: "llama",
      model: "hyunseoki/ko-en-llama2-13b",
      ifeval: 61.45,
      bbh: 40.83,
      math: 24.12,
      gpqa: 37.25,
      musr: 46.93,
      mmlu: 52.64,
    },
  ],
  searchQuery = "",
  filterType = "all",
}: ModelComparisonGridProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modelData, setModelData] = useState<ModelData[]>(data);

  // Calculate averages and update data
  const processedData = useMemo(() => {
    return modelData.map((row) => {
      const scores = [
        row.ifeval,
        row.bbh,
        row.math,
        row.gpqa,
        row.musr,
        row.mmlu,
      ];
      const average = scores.reduce((a, b) => a + b, 0) / scores.length;
      return { ...row, average };
    });
  }, [modelData]);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchQuery, filterType]);

  const handleSort = (field: SortField) => {
    try {
      setIsLoading(true);
      if (sortField === field) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
      // Simulate sorting delay
      setTimeout(() => setIsLoading(false), 300);
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Sorting Error",
        description: "Failed to sort the data. Please try again.",
      });
    }
  };

  const sortedAndFilteredData = [...processedData]
    .filter((row) =>
      row.model.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((row) => {
      if (filterType === "all") return true;
      if (filterType === "top10") return row.rank <= 10;
      return row.type === filterType;
    })
    .sort((a, b) => {
      try {
        const aValue = a[sortField];
        const bValue = b[sortField];
        const modifier = sortDirection === "asc" ? 1 : -1;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue) * modifier;
        }
        return ((aValue as number) - (bValue as number)) * modifier;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Sorting Error",
          description: "Failed to sort the data. Please try again.",
        });
        return 0;
      }
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

  if (error) {
    return (
      <div className="flex items-center justify-center h-[800px] bg-background border rounded-lg">
        <div className="text-center space-y-4">
          <p className="text-destructive font-medium">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Model Leaderboard
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="w-[400px] p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">
                    Korean LLM Benchmark Dashboard
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A comprehensive dashboard for comparing and analyzing
                    Korean-focused Large Language Models across various
                    benchmarks.
                  </p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Key Benchmarks:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• IFEval: Korean instruction following evaluation</li>
                      <li>• BBH: Basic reasoning and problem-solving</li>
                      <li>• MATH: Mathematical problem solving capability</li>
                      <li>• GPQA: General purpose question answering</li>
                      <li>• MUSR: Multi-turn conversation and summarization</li>
                      <li>• MMLU-PRO: Professional knowledge evaluation</li>
                    </ul>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Card className="w-full h-[calc(100vh-220px)] min-h-[600px] bg-background overflow-hidden border">
        <div className="w-full h-full relative">
          <div className="flex w-full items-center border-b bg-muted/50 px-6 py-3 text-sm font-medium text-muted-foreground sticky top-0">
            <HeaderCell field="rank" label="#" width="w-20" />
            <HeaderCell field="model" label="Model" width="w-[400px]" />
            <HeaderCell field="average" label="Average" width="w-40" />
            <HeaderCell field="ifeval" label="IFEval" width="w-40" />
            <HeaderCell field="bbh" label="BBH" width="w-40" />
            <HeaderCell field="math" label="MATH" width="w-40" />
            <HeaderCell field="gpqa" label="GPQA" width="w-40" />
            <HeaderCell field="musr" label="MUSR" width="w-40" />
            <HeaderCell field="mmlu" label="MMLU-PRO" width="w-40" />
          </div>

          <ScrollArea className="h-[752px]">
            {isLoading ? (
              <div className="space-y-1">
                {[...Array(8)].map((_, i) => (
                  <LoadingRow key={i} />
                ))}
              </div>
            ) : sortedAndFilteredData.length > 0 ? (
              sortedAndFilteredData.map((row) => (
                <div
                  key={row.rank}
                  className="flex w-full items-center border-b hover:bg-muted/50 transition-colors px-6 py-4 group relative overflow-hidden"
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
                  <div className="w-20 flex items-center justify-center">
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
                  <div className="w-[400px] font-medium text-primary group-hover:text-primary/80 transition-colors">
                    {row.model}
                  </div>
                  <div className="w-40 text-right">
                    <span className="bg-green-500/10 text-green-700 dark:text-green-500 px-2.5 py-1.5 rounded-md font-medium">
                      {row.average.toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-40 text-right font-medium">
                    {row.ifeval.toFixed(2)}%
                  </div>
                  <div className="w-40 text-right font-medium">
                    {row.bbh.toFixed(2)}%
                  </div>
                  <div className="w-40 text-right font-medium">
                    {row.math.toFixed(2)}%
                  </div>
                  <div className="w-40 text-right font-medium">
                    {row.gpqa.toFixed(2)}%
                  </div>
                  <div className="w-40 text-right font-medium">
                    {row.musr.toFixed(2)}%
                  </div>
                  <div className="w-40 text-right font-medium">
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
    </div>
  );
};

export default ModelComparisonGrid;
