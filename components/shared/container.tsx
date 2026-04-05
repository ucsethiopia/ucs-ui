import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14", className)}>
      {children}
    </Tag>
  );
}
