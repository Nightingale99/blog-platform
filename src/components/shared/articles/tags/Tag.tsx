import { cn } from '@/lib/utils.ts';

interface TagProps {
  className?: string;
  tag: string;
}

export function Tag({ className, tag }: TagProps) {
  return (
    <li
      className={cn(
        'border border-secondary rounded-sm min-w-fit px-1 text-secondary text-ellipsis line-clamp-1',
        className,
      )}
    >
      {tag}
    </li>
  );
}
