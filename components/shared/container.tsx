import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  variant?: "default" | "narrow" | "wide";
}

const variantClasses = {
  default: "max-w-[1440px]",
  narrow: "max-w-[1080px]",
  wide: "max-w-[1600px]",
} as const;

export function Container({
  children,
  className,
  as: Tag = "div",
  variant = "default",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto px-4 sm:px-6 lg:px-8 xl:px-14", variantClasses[variant], className)}>
      {children}
    </Tag>
  );
}
