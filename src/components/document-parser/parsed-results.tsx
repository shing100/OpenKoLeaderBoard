import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingSpinner } from "./loading-spinner";

interface ParsedResultsProps {
  isUploading: boolean;
  uploadError: string | null;
  selectedFile: File | null;
}

export const ParsedResults = ({
  isUploading,
  uploadError,
  selectedFile,
}: ParsedResultsProps) => {
  return (
    <div className="flex flex-col">
      <div className="border-b p-3 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <h2 className="font-semibold">파싱 결과</h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        {isUploading ? (
          <div className="h-full flex items-center justify-center mt-32">
            <LoadingSpinner message="문서 처리 중..." size="small" />
          </div>
        ) : uploadError ? (
          <div className="h-full flex items-center justify-center text-muted-foreground mt-32">
            문서 처리 실패
          </div>
        ) : selectedFile ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">파일 정보</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">파일명:</span>
                  <span className="ml-2">{selectedFile.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">크기:</span>
                  <span className="ml-2">
                    {Math.round(selectedFile.size / 1024)} KB
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">타입:</span>
                  <span className="ml-2">{selectedFile.type}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">파싱 결과</h3>
              <div className="space-y-2">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm">
                    {JSON.stringify({ text: "Sample parsed content" }, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground mt-32">
            문서를 업로드하면 파싱 결과가 여기에 표시됩니다
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
