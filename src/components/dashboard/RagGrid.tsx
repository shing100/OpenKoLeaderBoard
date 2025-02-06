import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Star, Sparkles, HelpCircle, ArrowUpDown } from "lucide-react";
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

const LoadingRow = () => (
  <div className="flex w-full items-center border-b px-4 py-3">
    <div className="w-16 flex items-center justify-start">
      <Skeleton className="h-6 w-6 rounded-full" />
    </div>
    <div className="w-[150px]">
      <Skeleton className="h-5 w-40" />
    </div>
    {Array(7)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="w-24 text-right">
          <Skeleton className="h-5 w-16 ml-auto" />
        </div>
      ))}
  </div>
);

const RagGrid = ({ searchQuery = "" }: RagGridProps) => {
  const { t } = useTranslation();
  const [sortField, setSortField] = useState<SortField>("total");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [modelData, setModelData] = useState<RagData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.from("rag").select("*");

        if (error) throw error;

        // Sort data by total score in descending order and assign ranks
        const sortedData = [...data].sort((a, b) => b.total - a.total);

        // Transform the data to match our RagData interface
        const transformedData = sortedData.map((item, index) => ({
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
      setSortDirection("desc");
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
        return (b[sortField] - a[sortField]) * modifier;
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
        "flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors border-r border-border/50",
        field === "service" ||
          field === "generator" ||
          field === "parser" ||
          field === "semantic"
          ? "justify-start"
          : "justify-end",
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
            {t("rag_title")}
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="w-[400px] p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">RAG Evaluation Metrics</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("rag_desc")}
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
              <HeaderCell
                field="service"
                label={t("rag_service")}
                tooltip={t("rag_service_tooltip")}
                width="w-[120px]"
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
                width="w-[250px]"
              />
              <HeaderCell
                field="lexical"
                label={t("rag_lexical")}
                tooltip={t("rag_lexical_tooltip")}
                width="w-[120px]"
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
                width="w-20"
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-[120px] px-4 py-3 font-medium text-primary group-hover:text-primary/80 transition-colors text-xs truncate">
                          {row.service}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{row.service}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-[100px] px-4 py-3 font-medium text-xs truncate">
                          {row.generator}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{row.generator}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-[100px] px-4 py-3 font-medium text-xs truncate">
                          {row.parser}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{row.parser}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-[250px] px-4 py-3 font-medium text-xs truncate">
                          {row.semantic}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{row.semantic}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-[120px] px-4 py-3 font-medium text-xs truncate">
                          {row.lexical || "N/A"}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{row.lexical || "N/A"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-[100px] px-4 py-3 font-medium text-xs truncate">
                          {row.web || "N/A"}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{row.web || "N/A"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-[100px] px-4 py-3 font-medium text-xs truncate">
                          {row.rerank || "N/A"}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{row.rerank || "N/A"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-[100px] px-4 py-3 font-medium text-xs truncate">
                          {row.fusion || "N/A"}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{row.fusion || "N/A"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.finance}
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.public}
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.medical}
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.law}
                  </div>
                  <div className="w-24 px-4 py-3 text-right font-medium text-xs">
                    {row.commerce}
                  </div>
                  <div className="w-20 px-4 py-3 text-right">
                    <span className="bg-green-500/10 text-green-700 dark:text-green-500 px-2 py-0.5 rounded-md font-medium text-xs">
                      {row.total}
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
