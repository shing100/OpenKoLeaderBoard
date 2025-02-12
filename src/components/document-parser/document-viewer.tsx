import { Document, Page } from "react-pdf";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileUploader } from "./file-uploader";
import { LoadingSpinner } from "./loading-spinner";
import { ErrorDisplay } from "./error-display";

interface DocumentViewerProps {
  selectedFile: File | null;
  isUploading: boolean;
  uploadError: string | null;
  zoom: number;
  currentPage: number;
  rotation: number;
  onFileSelect: (file: File) => void;
  onLoadSuccess: ({ numPages }: { numPages: number }) => void;
  onErrorReset: () => void;
}

export const DocumentViewer = ({
  selectedFile,
  isUploading,
  uploadError,
  zoom,
  currentPage,
  rotation,
  onFileSelect,
  onLoadSuccess,
  onErrorReset,
}: DocumentViewerProps) => {
  return (
    <ScrollArea className="flex-1">
      <div className="p-6 min-h-full flex items-center justify-center bg-muted/30">
        {isUploading ? (
          <LoadingSpinner message="문서를 업로드하는 중..." />
        ) : uploadError ? (
          <ErrorDisplay error={uploadError} onRetry={onErrorReset} />
        ) : selectedFile ? (
          <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
            {selectedFile.type === "application/pdf" ? (
              <Document
                file={selectedFile}
                onLoadSuccess={onLoadSuccess}
                loading={<LoadingSpinner size="medium" />}
                error={
                  <div className="flex items-center justify-center h-[600px] text-destructive">
                    PDF 로드 실패
                  </div>
                }
                className="max-h-[calc(100vh-12rem)] overflow-auto"
              >
                <Page
                  pageNumber={currentPage}
                  scale={zoom / 100}
                  rotate={rotation}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="shadow-lg mx-auto"
                  loading={<LoadingSpinner size="medium" />}
                />
              </Document>
            ) : (
              <div className="relative w-full h-[calc(100vh-12rem)] bg-[#f0f0f0] flex items-center justify-center overflow-hidden">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected document"
                  className="max-w-full max-h-full object-contain transition-transform duration-200"
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    transformOrigin: "center center",
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <FileUploader onFileSelect={onFileSelect} />
        )}
      </div>
    </ScrollArea>
  );
};
