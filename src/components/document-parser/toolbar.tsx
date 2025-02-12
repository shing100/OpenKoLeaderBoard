import { Button } from "@/components/ui/button";
import {
  Minus,
  Plus,
  RotateCcw,
  Share,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

interface ToolbarProps {
  zoom: number;
  currentPage: number;
  numPages: number | null;
  selectedFile: File | null;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onDownload: () => void;
}

export const Toolbar = ({
  zoom,
  currentPage,
  numPages,
  selectedFile,
  onZoomIn,
  onZoomOut,
  onRotate,
  onPreviousPage,
  onNextPage,
  onDownload,
}: ToolbarProps) => {
  return (
    <div className="flex items-center justify-between border-b p-3 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          disabled={zoom <= 50}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-sm">{zoom}%</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
          disabled={zoom >= 200}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onRotate}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPreviousPage}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} / {numPages || 1}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNextPage}
          disabled={!numPages || currentPage >= numPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Share className="h-4 w-4" />
        </Button>
        {selectedFile && (
          <Button variant="ghost" size="icon" onClick={onDownload}>
            <Download className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
