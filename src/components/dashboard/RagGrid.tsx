import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Star, Sparkles, HelpCircle, ArrowUpDown } from "lucide-react";
import { ScoreSubmissionDialog } from "./ScoreSubmissionDialog";
import { useTranslation } from "react-i18next";
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

interface RagData {
  id: number;
  rank: number;
  service: string;
  generator: string;
  parser: string;
  semantic: string;
  lexical: string;
  web: string;
  rerank: string;
  fusion: string;
  finance: number;
  public: number;
  medical: number;
  law: number;
  commerce: number;
  total: number;
}

type SortField = keyof Omit<RagData, "id">;
type SortDirection = "asc" | "desc";

interface RagGridProps {
  searchQuery?: string;
}

import { LoadingGrid } from "./LoadingGrid";
import { ErrorState } from "./ErrorState";

const RagGrid = ({ searchQuery = "" }: RagGridProps) => {
  const { t } = useTranslation();
  const [sortField, setSortField] = useState<SortField>("total");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modelData, setModelData] = useState<RagData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("rag")
          .select("*")
          .order("total", { ascending: false });

        if (error) throw error;

        // Transform the data to match our RagData interface and assign ranks
        const transformedData = data.map((item, index) => ({
          id: item.id,
          rank: index + 1,
          service: item.service,
          generator: item.generator,
          parser: item.parser,
          semantic: item.semantic,
          lexical: item.lexical,
          web: item.web,
          rerank: item.rerank,
          fusion: item.fusion,
          finance: item.finance,
          public: item.public,
          medical: item.medical,
          law: item.law,
          commerce: item.commerce,
          total: item.total,
        }));

        setModelData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load RAG evaluation data");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load RAG evaluation data. Please try again.",
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
      setSortDirection(field === "rank" ? "asc" : "desc");
    }
  };

  const filteredData = modelData
    .filter(
      (row) =>
        row.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.parser.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const modifier = sortDirection === "asc" ? 1 : -1;
      if (sortField === "rank") {
        return (a.rank - b.rank) * modifier;
      } else if (
        ["finance", "public", "medical", "law", "commerce", "total"].includes(
          sortField,
        )
      ) {
        return (a[sortField] - b[sortField]) * modifier;
      }
      return a[sortField].localeCompare(b[sortField]) * modifier;
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
        "flex items-center gap-2 px-2 py-3 cursor-pointer hover:bg-muted/50 transition-colors border-r border-border/50",
        field === "service" || field === "rank"
          ? "justify-start"
          : "justify-end",
      )}
      onClick={() => handleSort(field)}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
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
            {t("rag_title")}
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="w-[400px] p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">{t("rag_title")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("rag_desc")}
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
            { name: "service", label: t("rag_service"), required: true },
            { name: "generator", label: t("rag_generator"), required: true },
            { name: "parser", label: t("rag_parser"), required: true },
            { name: "semantic", label: t("rag_semantic"), required: true },
            { name: "lexical", label: t("rag_lexical"), required: true },
            { name: "web", label: t("rag_web"), required: true },
            { name: "rerank", label: t("rag_rerank"), required: true },
            { name: "fusion", label: t("rag_fusion"), required: true },
            {
              name: "finance",
              label: t("rag_finance"),
              type: "number",
              min: 0,
              max: 60,
              required: true,
            },
            {
              name: "public",
              label: t("rag_public"),
              type: "number",
              min: 0,
              max: 60,
              required: true,
            },
            {
              name: "medical",
              label: t("rag_medical"),
              type: "number",
              min: 0,
              max: 60,
              required: true,
            },
            {
              name: "law",
              label: t("rag_law"),
              type: "number",
              min: 0,
              max: 60,
              required: true,
            },
            {
              name: "commerce",
              label: t("rag_commerce"),
              type: "number",
              min: 0,
              max: 60,
              required: true,
            },
          ]}
          onSubmit={async (data) => {
            try {
              const total =
                parseFloat(data.finance) +
                parseFloat(data.public) +
                parseFloat(data.medical) +
                parseFloat(data.law) +
                parseFloat(data.commerce);

              const { error } = await supabase.from("rag").insert([
                {
                  service: data.service,
                  generator: data.generator,
                  parser: data.parser,
                  semantic: data.semantic,
                  lexical: data.lexical,
                  web: data.web,
                  rerank: data.rerank,
                  fusion: data.fusion,
                  finance: parseFloat(data.finance),
                  public: parseFloat(data.public),
                  medical: parseFloat(data.medical),
                  law: parseFloat(data.law),
                  commerce: parseFloat(data.commerce),
                  total,
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
              <HeaderCell field="rank" label="#" width="w-12" />
              <HeaderCell
                field="service"
                label={t("rag_service")}
                tooltip={t("rag_service_tooltip")}
                width="w-[180px]"
              />
              <HeaderCell
                field="generator"
                label={t("rag_generator")}
                tooltip={t("rag_generator_tooltip")}
                width="w-[100px]"
              />
              <HeaderCell
                field="parser"
                label={t("rag_parser")}
                tooltip={t("rag_parser_tooltip")}
                width="w-[100px]"
              />
              <HeaderCell
                field="semantic"
                label={t("rag_semantic")}
                tooltip={t("rag_semantic_tooltip")}
                width="w-[100px]"
              />
              <HeaderCell
                field="lexical"
                label={t("rag_lexical")}
                tooltip={t("rag_lexical_tooltip")}
                width="w-[100px]"
              />
              <HeaderCell
                field="web"
                label={t("rag_web")}
                tooltip={t("rag_web_tooltip")}
                width="w-[100px]"
              />
              <HeaderCell
                field="rerank"
                label={t("rag_rerank")}
                tooltip={t("rag_rerank_tooltip")}
                width="w-[100px]"
              />
              <HeaderCell
                field="fusion"
                label={t("rag_fusion")}
                tooltip={t("rag_fusion_tooltip")}
                width="w-[100px]"
              />
              <HeaderCell
                field="finance"
                label={t("rag_finance")}
                tooltip={t("rag_finance_tooltip")}
                width="w-24"
              />
              <HeaderCell
                field="public"
                label={t("rag_public")}
                tooltip={t("rag_public_tooltip")}
                width="w-24"
              />
              <HeaderCell
                field="medical"
                label={t("rag_medical")}
                tooltip={t("rag_medical_tooltip")}
                width="w-24"
              />
              <HeaderCell
                field="law"
                label={t("rag_law")}
                tooltip={t("rag_law_tooltip")}
                width="w-24"
              />
              <HeaderCell
                field="commerce"
                label={t("rag_commerce")}
                tooltip={t("rag_commerce_tooltip")}
                width="w-24"
              />
              <HeaderCell
                field="total"
                label={t("rag_total")}
                tooltip={t("rag_total_tooltip")}
                width="w-24"
              />
            </div>

            {/* Content */}
            {isLoading ? (
              <LoadingGrid columns={14} rows={8} />
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
                  <div className="w-12 px-2 py-3 flex items-center justify-start">
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
                  <div className="w-[180px] px-2 py-3 font-medium text-primary group-hover:text-primary/80 transition-colors text-xs truncate">
                    {row.service}
                  </div>
                  <div className="w-[100px] px-2 py-3 text-xs text-muted-foreground truncate">
                    {row.generator}
                  </div>
                  <div className="w-[100px] px-2 py-3 text-xs text-muted-foreground truncate">
                    {row.parser}
                  </div>
                  <div className="w-[100px] px-2 py-3 text-xs text-muted-foreground truncate">
                    {row.semantic}
                  </div>
                  <div className="w-[100px] px-2 py-3 text-xs text-muted-foreground truncate">
                    {row.lexical}
                  </div>
                  <div className="w-[100px] px-2 py-3 text-xs text-muted-foreground truncate">
                    {row.web}
                  </div>
                  <div className="w-[100px] px-2 py-3 text-xs text-muted-foreground truncate">
                    {row.rerank}
                  </div>
                  <div className="w-[100px] px-2 py-3 text-xs text-muted-foreground truncate">
                    {row.fusion}
                  </div>
                  <div className="w-24 px-2 py-3 text-right font-medium text-xs">
                    {row.finance.toFixed(1)}
                  </div>
                  <div className="w-24 px-2 py-3 text-right font-medium text-xs">
                    {row.public.toFixed(1)}
                  </div>
                  <div className="w-24 px-2 py-3 text-right font-medium text-xs">
                    {row.medical.toFixed(1)}
                  </div>
                  <div className="w-24 px-2 py-3 text-right font-medium text-xs">
                    {row.law.toFixed(1)}
                  </div>
                  <div className="w-24 px-2 py-3 text-right font-medium text-xs">
                    {row.commerce.toFixed(1)}
                  </div>
                  <div className="w-24 px-2 py-3 text-right">
                    <span className="bg-green-500/10 text-green-700 dark:text-green-500 px-1 py-0.5 rounded-md font-medium text-xs">
                      {row.total.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-[600px] text-muted-foreground">
                {t("no_results")}
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default RagGrid;
