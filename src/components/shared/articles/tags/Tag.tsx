import { cn } from '@/lib/utils.ts';

interface TagProps {
  className?: string;
  tag: string;
}

export function Tag({ className, tag }: TagProps) {
  return (
    <li
      className={cn(
        'border border-secondary rounded-sm w-fit px-1 text-secondary',
        className,
      )}
    >
      {tag}
    </li>
  );
}
