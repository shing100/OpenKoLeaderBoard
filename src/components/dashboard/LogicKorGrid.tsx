import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Star, Sparkles, HelpCircle, ArrowUpDown } from "lucide-react";
import { ScoreSubmissionDialog } from "./ScoreSubmissionDialog";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
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

type SortField = keyof Omit<ModelData, "id">;
type SortDirection = "asc" | "desc";

import { LoadingGrid } from "./LoadingGrid";
import { ErrorState } from "./ErrorState";

const LogicKorGrid = ({ searchQuery = "" }: LogicKorGridProps) => {
  const { t } = useTranslation();
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modelData, setModelData] = useState<ModelData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.from("logickor").select("*");

        if (error) throw error;

        // Sort data by average score in descending order
        const sortedData = data.sort((a, b) => b.average - a.average);

        // Transform the data to match our ModelData interface
        const transformedData = sortedData.map((item, index) => ({
          id: item.id,
          rank: index + 1,
          name: item.name,
          math: {
            singleton: item.math_singleton,
            multiturn: item.math_multiturn,
          },
          grammar: {
            singleton: item.grammar_singleton,
            multiturn: item.grammar_multiturn,
          },
          comprehension: {
            singleton: item.comprehension_singleton,
            multiturn: item.comprehension_multiturn,
          },
          writing: {
            singleton: item.writing_singleton,
            multiturn: item.writing_multiturn,
          },
          reasoning: {
            singleton: item.reasoning_singleton,
            multiturn: item.reasoning_multiturn,
          },
          coding: {
            singleton: item.coding_singleton,
            multiturn: item.coding_multiturn,
          },
          average: item.average,
        }));

        setModelData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load model data");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load model data. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredData = modelData
    .filter((row) => row.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const modifier = sortDirection === "asc" ? 1 : -1;
      if (sortField === "rank") {
        // For rank, lower number is better
        return (a.rank - b.rank) * modifier;
      } else if (
        sortField === "math" ||
        sortField === "grammar" ||
        sortField === "comprehension" ||
        sortField === "writing" ||
        sortField === "reasoning" ||
        sortField === "coding"
      ) {
        const aAvg = (a[sortField].singleton + a[sortField].multiturn) / 2;
        const bAvg = (b[sortField].singleton + b[sortField].multiturn) / 2;
        return (aAvg - bAvg) * modifier;
      } else if (sortField === "average") {
        // For average, higher is better
        return (b.average - a.average) * modifier;
      }
      return 0;
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
        <div className="flex items-center gap-4">
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
        <ScoreSubmissionDialog
          title={t("score_submission")}
          description={t("score_submission_desc")}
          fields={[
            { name: "name", label: t("model_name"), required: true },
            {
              name: "math_singleton",
              label: "Math (Singleton)",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "math_multiturn",
              label: "Math (Multiturn)",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "grammar_singleton",
              label: "Grammar (Singleton)",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "grammar_multiturn",
              label: "Grammar (Multiturn)",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "comprehension_singleton",
              label: "Comprehension (Singleton)",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "comprehension_multiturn",
              label: "Comprehension (Multiturn)",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "writing_singleton",
              label: "Writing (Singleton)",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "writing_multiturn",
              label: "Writing (Multiturn)",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "reasoning_singleton",
              label: "Reasoning (Singleton)",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "reasoning_multiturn",
              label: "Reasoning (Multiturn)",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "coding_singleton",
              label: "Coding (Singleton)",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "coding_multiturn",
              label: "Coding (Multiturn)",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
          ]}
          onSubmit={async (data) => {
            try {
              const { error } = await supabase.from("logickor").insert([
                {
                  name: data.name,
                  math_singleton: parseFloat(data.math_singleton),
                  math_multiturn: parseFloat(data.math_multiturn),
                  grammar_singleton: parseFloat(data.grammar_singleton),
                  grammar_multiturn: parseFloat(data.grammar_multiturn),
                  comprehension_singleton: parseFloat(
                    data.comprehension_singleton,
                  ),
                  comprehension_multiturn: parseFloat(
                    data.comprehension_multiturn,
                  ),
                  writing_singleton: parseFloat(data.writing_singleton),
                  writing_multiturn: parseFloat(data.writing_multiturn),
                  reasoning_singleton: parseFloat(data.reasoning_singleton),
                  reasoning_multiturn: parseFloat(data.reasoning_multiturn),
                  coding_singleton: parseFloat(data.coding_singleton),
                  coding_multiturn: parseFloat(data.coding_multiturn),
                  // Singleton average
                  average: (
                    ((parseFloat(data.math_singleton) +
                      parseFloat(data.grammar_singleton) +
                      parseFloat(data.comprehension_singleton) +
                      parseFloat(data.writing_singleton) +
                      parseFloat(data.reasoning_singleton) +
                      parseFloat(data.coding_singleton)) /
                      6 +
                      // Multiturn average
                      (parseFloat(data.math_multiturn) +
                        parseFloat(data.grammar_multiturn) +
                        parseFloat(data.comprehension_multiturn) +
                        parseFloat(data.writing_multiturn) +
                        parseFloat(data.reasoning_multiturn) +
                        parseFloat(data.coding_multiturn)) /
                        6) /
                    2
                  ).toFixed(1),
                },
              ]);
              if (error) throw error;
              toast({
                title: "Success",
                description: "Score submitted successfully",
              });
            } catch (error) {
              console.error("Error inserting data:", error);
              toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to submit score",
              });
            }
          }}
        />
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
                width="w-48"
              />
              <HeaderCell
                field="grammar"
                label="문법"
                tooltip="Korean grammar understanding and usage"
                width="w-48"
              />
              <HeaderCell
                field="comprehension"
                label="이해"
                tooltip="Text comprehension and analysis"
                width="w-48"
              />
              <HeaderCell
                field="writing"
                label="글쓰기"
                tooltip="Writing and composition skills"
                width="w-48"
              />
              <HeaderCell
                field="reasoning"
                label="추론"
                tooltip="Logical reasoning and deduction"
                width="w-48"
              />
              <HeaderCell
                field="coding"
                label="코딩"
                tooltip="Code understanding and generation"
                width="w-48"
              />
              <HeaderCell
                field="average"
                label="평균"
                tooltip="Average score across all categories"
                width="w-24"
              />
            </div>

            {/* Content */}
            {isLoading ? (
              <LoadingGrid columns={9} rows={8} />
            ) : error ? (
              <ErrorState message={error} onRetry={() => setError(null)} />
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
