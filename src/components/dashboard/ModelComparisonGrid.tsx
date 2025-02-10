import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Star, Sparkles, HelpCircle, ArrowUpDown } from "lucide-react";
import { ScoreSubmissionDialog } from "./ScoreSubmissionDialog";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

type ModelData = Database["public"]["Tables"]["models"]["Row"];
type SortField = keyof Omit<ModelData, "created_at" | "id">;
type SortDirection = "asc" | "desc";

interface ModelComparisonGridProps {
  searchQuery?: string;
}

import { LoadingGrid } from "./LoadingGrid";
import { ErrorState } from "./ErrorState";

const ModelComparisonGrid = ({
  searchQuery = "",
}: ModelComparisonGridProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modelData, setModelData] = useState<ModelData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("models")
          .select("*")
          .order(sortField, { ascending: sortDirection === "asc" });

        if (error) throw error;
        setModelData(data || []);
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
  }, [sortField, sortDirection, toast]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredData = modelData.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Korean LLM Leaderboard
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
              name: "kmmlu",
              label: "KMMLU",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "gsm8k",
              label: "GSM8K",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "gsm8k_ko",
              label: "GSM8K-KO",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "ifeval",
              label: "IFEval",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "haerae",
              label: "HAERAE",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "kobest",
              label: "KoBEST",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "mmlu",
              label: "MMLU",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "mmlu_pro",
              label: "MMLU-PRO",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "bbh",
              label: "BBH",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "csatqa",
              label: "CSATQA",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "gpqa",
              label: "GPQA",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
            {
              name: "arc_c",
              label: "ARC-C",
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
          ]}
          onSubmit={async (data) => {
            try {
              const { error } = await supabase.from("models").insert([
                {
                  name: data.name,
                  kmmlu: parseFloat(data.kmmlu),
                  gsm8k: parseFloat(data.gsm8k),
                  gsm8k_ko: parseFloat(data.gsm8k_ko),
                  ifeval: parseFloat(data.ifeval),
                  haerae: parseFloat(data.haerae),
                  kobest: parseFloat(data.kobest),
                  mmlu: parseFloat(data.mmlu),
                  mmlu_pro: parseFloat(data.mmlu_pro),
                  bbh: parseFloat(data.bbh),
                  csatqa: parseFloat(data.csatqa),
                  gpqa: parseFloat(data.gpqa),
                  arc_c: parseFloat(data.arc_c),
                  average: (
                    (parseFloat(data.kmmlu) +
                      parseFloat(data.gsm8k) +
                      parseFloat(data.gsm8k_ko) +
                      parseFloat(data.ifeval) +
                      parseFloat(data.haerae) +
                      parseFloat(data.kobest) +
                      parseFloat(data.mmlu) +
                      parseFloat(data.mmlu_pro) +
                      parseFloat(data.bbh) +
                      parseFloat(data.csatqa) +
                      parseFloat(data.gpqa) +
                      parseFloat(data.arc_c)) /
                    12
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
                field="average"
                label="Avg"
                tooltip="Overall average score across all benchmarks"
              />
              <HeaderCell
                field="kmmlu"
                label="KMMLU"
                tooltip="Korean Massive Multitask Language Understanding"
              />
              <HeaderCell
                field="gsm8k"
                label="GSM8K"
                tooltip="Grade School Math 8K"
              />
              <HeaderCell
                field="gsm8k_ko"
                label="GSM8K-KO"
                tooltip="Korean Grade School Math"
              />
              <HeaderCell
                field="ifeval"
                label="IFEval"
                tooltip="Korean Instruction Following Evaluation"
              />
              <HeaderCell
                field="haerae"
                label="HAERAE"
                tooltip="Korean Language Understanding"
              />
              <HeaderCell
                field="kobest"
                label="KoBEST"
                tooltip="Korean Benchmark of Evaluation for Standardized Tasks"
              />
              <HeaderCell
                field="mmlu"
                label="MMLU"
                tooltip="Massive Multitask Language Understanding"
              />
              <HeaderCell
                field="mmlu_pro"
                label="MMLU-PRO"
                tooltip="Professional Knowledge Evaluation"
              />
              <HeaderCell field="bbh" label="BBH" tooltip="Big Bench Hard" />
              <HeaderCell
                field="csatqa"
                label="CSATQA"
                tooltip="Korean College Scholastic Ability Test QA"
              />
              <HeaderCell
                field="gpqa"
                label="GPQA"
                tooltip="General Purpose Question Answering"
              />
              <HeaderCell
                field="arc_c"
                label="ARC-C"
                tooltip="AI2 Reasoning Challenge (Challenge Set)"
              />
            </div>

            {/* Content */}
            {isLoading ? (
              <LoadingGrid columns={12} rows={8} />
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
                  <div className="w-24 px-4 py-3 text-right">
                    <span className="bg-green-500/10 text-green-700 dark:text-green-500 px-2 py-0.5 rounded-md font-medium text-xs">
                      {row.average.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.kmmlu.toFixed(1)}%
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.gsm8k.toFixed(1)}%
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.gsm8k_ko.toFixed(1)}%
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.ifeval.toFixed(1)}%
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.haerae.toFixed(1)}%
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.kobest.toFixed(1)}%
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.mmlu.toFixed(1)}%
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.mmlu_pro.toFixed(1)}%
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.bbh.toFixed(1)}%
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.csatqa.toFixed(1)}%
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.gpqa.toFixed(1)}%
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.arc_c.toFixed(1)}%
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

export default ModelComparisonGrid;
