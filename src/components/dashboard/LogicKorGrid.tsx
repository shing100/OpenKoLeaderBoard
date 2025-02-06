import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Star, Sparkles, HelpCircle, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricData {
  singleton: number;
  multiturn: number;
}

interface ModelData {
  id: number;
  rank: number;
  name: string;
  math: MetricData;
  grammar: MetricData;
  comprehension: MetricData;
  writing: MetricData;
  reasoning: MetricData;
  coding: MetricData;
  average: number;
}

interface LogicKorGridProps {
  searchQuery?: string;
}

const SAMPLE_DATA: ModelData[] = [
  {
    id: 1,
    rank: 1,
    name: "EXAONE-3.0-7.8B-Instruct",
    math: { singleton: 7.0, multiturn: 6.57 },
    grammar: { singleton: 8.57, multiturn: 7.43 },
    comprehension: { singleton: 9.86, multiturn: 10.0 },
    writing: { singleton: 9.71, multiturn: 9.71 },
    reasoning: { singleton: 9.14, multiturn: 7.14 },
    coding: { singleton: 9.29, multiturn: 9.14 },
    average: 8.63,
  },
  {
    id: 2,
    rank: 2,
    name: "EXAONE-3.5-2.4B-Instruct",
    math: 8.43,
    grammar: 6.43,
    comprehension: 9.71,
    writing: 9.86,
    reasoning: 8.57,
    coding: 9.43,
    singleton: 7.5,
    multiturn: 8.2,
    average: 7.85,
  },
  // Add more sample data as needed
];

type SortField = keyof Omit<ModelData, "id">;
type SortDirection = "asc" | "desc";

const LoadingRow = () => (
  <div className="flex w-full items-center border-b px-4 py-3">
    <div className="w-16 flex items-center justify-start">
      <Skeleton className="h-6 w-6 rounded-full" />
    </div>
    <div className="w-[300px]">
      <Skeleton className="h-5 w-40" />
    </div>
    {Array(8)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="w-24 text-right">
          <Skeleton className="h-5 w-16 ml-auto" />
        </div>
      ))}
  </div>
);

const LogicKorGrid = ({ searchQuery = "" }: LogicKorGridProps) => {
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isLoading] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredData = SAMPLE_DATA.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()),
  ).sort((a, b) => {
    const modifier = sortDirection === "asc" ? 1 : -1;
    return (a[sortField] - b[sortField]) * modifier;
  });

  const HeaderCell = ({
    field,
    label,
    tooltip,
    width = "w-24",
  }: {
    field: SortField;
    label: string;
    tooltip?: string;
    width?: string;
  }) => (
    <div
      className={cn(
        width,
        "flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors border-r border-border/50",
        field === "name" || field === "rank" ? "justify-start" : "justify-end",
      )}
      onClick={() => handleSort(field)}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">
                {label}
              </span>
              <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
            </div>
          </TooltipTrigger>
          {tooltip && (
            <TooltipContent>
              <p className="text-sm">{tooltip}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight">
            LogicKor Leaderboard
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="w-[400px] p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">LogicKor Benchmark</h3>
                  <p className="text-sm text-muted-foreground">
                    A comprehensive evaluation of Korean language models across
                    various logical reasoning tasks including mathematics,
                    grammar, comprehension, writing, reasoning, and coding.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Card className="w-full h-[calc(100vh-220px)] min-h-[600px] bg-background overflow-hidden border">
        <ScrollArea className="h-full">
          <div className="min-w-max">
            {/* Header */}
            <div className="flex w-full border-b bg-card sticky top-0 shadow-md z-10">
              <HeaderCell field="rank" label="#" width="w-16" />
              <HeaderCell field="name" label="Model" width="w-[300px]" />
              <HeaderCell
                field="math"
                label="수학"
                tooltip="Mathematical problem-solving capability"
              />
              <HeaderCell
                field="grammar"
                label="문법"
                tooltip="Korean grammar understanding and usage"
              />
              <HeaderCell
                field="comprehension"
                label="이해"
                tooltip="Text comprehension and analysis"
              />
              <HeaderCell
                field="writing"
                label="글쓰기"
                tooltip="Writing and composition skills"
              />
              <HeaderCell
                field="reasoning"
                label="추론"
                tooltip="Logical reasoning and deduction"
              />
              <HeaderCell
                field="coding"
                label="코딩"
                tooltip="Code understanding and generation"
              />
              <HeaderCell
                field="singleton"
                label="싱글턴"
                tooltip="Single-turn reasoning performance"
              />
              <HeaderCell
                field="multiturn"
                label="멀티턴"
                tooltip="Multi-turn reasoning performance"
              />
              <HeaderCell
                field="average"
                label="평균"
                tooltip="Average score across all categories"
              />
            </div>

            {/* Content */}
            {isLoading ? (
              <div className="space-y-1">
                {[...Array(8)].map((_, i) => (
                  <LoadingRow key={i} />
                ))}
              </div>
            ) : filteredData.length > 0 ? (
              filteredData.map((row) => (
                <div
                  key={row.id}
                  className="flex w-full items-center border-b hover:bg-muted/50 transition-colors group relative"
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
                  <div className="w-16 px-4 py-3 flex items-center justify-start">
                    {row.rank === 1 ? (
                      <div className="h-6 w-6 rounded-full bg-yellow-500/10 flex items-center justify-center">
                        <Trophy className="h-3 w-3 text-yellow-500" />
                      </div>
                    ) : row.rank === 2 ? (
                      <div className="h-6 w-6 rounded-full bg-zinc-500/10 flex items-center justify-center">
                        <Star className="h-3 w-3 text-zinc-500" />
                      </div>
                    ) : row.rank === 3 ? (
                      <div className="h-6 w-6 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-amber-500" />
                      </div>
                    ) : (
                      <span className="text-muted-foreground font-medium text-xs">
                        {row.rank}
                      </span>
                    )}
                  </div>
                  <div className="w-[300px] px-4 py-3 font-medium text-primary group-hover:text-primary/80 transition-colors text-xs truncate">
                    {row.name}
                  </div>
                  <div className="w-48 px-4 py-3 text-right font-medium text-xs grid grid-cols-2 gap-2">
                    <div className="text-muted-foreground">
                      S: {row.math.singleton.toFixed(2)}
                    </div>
                    <div className="text-muted-foreground">
                      M: {row.math.multiturn.toFixed(2)}
                    </div>
                  </div>
                  <div className="w-48 px-4 py-3 text-right font-medium text-xs grid grid-cols-2 gap-2">
                    <div className="text-muted-foreground">
                      S: {row.grammar.singleton.toFixed(2)}
                    </div>
                    <div className="text-muted-foreground">
                      M: {row.grammar.multiturn.toFixed(2)}
                    </div>
                  </div>
                  <div className="w-48 px-4 py-3 text-right font-medium text-xs grid grid-cols-2 gap-2">
                    <div className="text-muted-foreground">
                      S: {row.comprehension.singleton.toFixed(2)}
                    </div>
                    <div className="text-muted-foreground">
                      M: {row.comprehension.multiturn.toFixed(2)}
                    </div>
                  </div>
                  <div className="w-48 px-4 py-3 text-right font-medium text-xs grid grid-cols-2 gap-2">
                    <div className="text-muted-foreground">
                      S: {row.writing.singleton.toFixed(2)}
                    </div>
                    <div className="text-muted-foreground">
                      M: {row.writing.multiturn.toFixed(2)}
                    </div>
                  </div>
                  <div className="w-48 px-4 py-3 text-right font-medium text-xs grid grid-cols-2 gap-2">
                    <div className="text-muted-foreground">
                      S: {row.reasoning.singleton.toFixed(2)}
                    </div>
                    <div className="text-muted-foreground">
                      M: {row.reasoning.multiturn.toFixed(2)}
                    </div>
                  </div>
                  <div className="w-48 px-4 py-3 text-right font-medium text-xs grid grid-cols-2 gap-2">
                    <div className="text-muted-foreground">
                      S: {row.coding.singleton.toFixed(2)}
                    </div>
                    <div className="text-muted-foreground">
                      M: {row.coding.multiturn.toFixed(2)}
                    </div>
                  </div>
                  <div className="w-24 px-4 py-3 text-right">
                    <span className="bg-green-500/10 text-green-700 dark:text-green-500 px-2 py-0.5 rounded-md font-medium text-xs">
                      {row.average.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-[600px] text-muted-foreground">
                No models found
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default LogicKorGrid;
