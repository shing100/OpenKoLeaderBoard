import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FileJson, FileText } from "lucide-react";

interface ExportPanelProps {
  isOpen?: boolean;
  onExport?: (format: string) => void;
}

const ExportPanel = ({
  isOpen = true,
  onExport = () => {},
}: ExportPanelProps) => {
  return (
    <Card className="w-[300px] h-[200px] bg-background p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Export Report</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Format</label>
          <Select defaultValue="csv">
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>CSV</span>
                </div>
              </SelectItem>
              <SelectItem value="json">
                <div className="flex items-center space-x-2">
                  <FileJson className="h-4 w-4" />
                  <span>JSON</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full" onClick={() => onExport("csv")}>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>
    </Card>
  );
};

export default ExportPanel;
