interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  message?: string;
}

export const LoadingSpinner = ({
  size = "large",
  message,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="text-center space-y-4">
      <div
        className={`${sizeClasses[size]} rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto`}
      />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};
