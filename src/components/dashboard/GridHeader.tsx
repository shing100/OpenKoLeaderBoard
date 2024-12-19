import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowUpIcon, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

interface GridHeaderProps {
  columns?: Column[];
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (column: string) => void;
}

const GridHeader = ({
  columns = [
    { key: "model", label: "Model Name", sortable: true, width: "w-[200px]" },
    { key: "accuracy", label: "Accuracy", sortable: true, width: "w-[150px]" },
    { key: "latency", label: "Latency", sortable: true, width: "w-[150px]" },
    {
      key: "memory",
      label: "Memory Usage",
      sortable: true,
      width: "w-[150px]",
    },
    { key: "params", label: "Parameters", sortable: true, width: "w-[150px]" },
  ],
  sortColumn = "",
  sortDirection = "asc",
  onSort = () => {},
}: GridHeaderProps) => {
  return (
    <div className="flex w-full items-center bg-muted/50 border-b h-[40px]">
      {columns.map((column) => (
        <div
          key={column.key}
          className={cn(
            "px-4 py-2 text-sm font-medium text-muted-foreground",
            column.width,
            column.sortable && "cursor-pointer hover:text-foreground",
          )}
          onClick={() => column.sortable && onSort(column.key)}
        >
          <div className="flex items-center space-x-2">
            <span>{column.label}</span>
            {column.sortable && (
              <div className="flex flex-col">
                {sortColumn === column.key ? (
                  sortDirection === "asc" ? (
                    <ArrowUpIcon className="h-3 w-3" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3" />
                  )
                ) : (
                  <ArrowUpDown className="h-3 w-3 text-muted-foreground/50" />
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridHeader;
