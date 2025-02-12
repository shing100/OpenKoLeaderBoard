import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

export const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => {
  return (
    <div className="text-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-destructive"
        >
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
        </svg>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-destructive">업로드 실패</p>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button variant="outline" size="sm" onClick={onRetry}>
          다시 시도
        </Button>
      </div>
    </div>
  );
};
