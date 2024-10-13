import { cn } from '@/lib/utils.ts';

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn('mx-auto max-w-fit-content', className)}>{children}</div>
  );
}
