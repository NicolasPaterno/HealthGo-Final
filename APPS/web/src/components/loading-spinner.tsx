import { LoaderCircle } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ size = "md", className = "", fullScreen = false }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  const spinner = (
    <LoaderCircle className={`${sizeClasses[size]} animate-spin text-primary ${className}`} />
  );

  if (fullScreen) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        {spinner}
      </div>
    );
  }

  return spinner;
}