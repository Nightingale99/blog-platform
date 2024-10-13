import { cn } from '@/lib/utils.ts';
import { Tag } from './Tag';
import type { Tags } from '@/types/articles';

interface TagsListProps {
  className?: string;
  tagList: Tags;
}

export function TagsList({ className, tagList }: TagsListProps) {
  if (!tagList?.length) {
    return null;
  }
  return (
    <ul className={cn('flex gap-2 overflow-auto', className)}>
      {tagList.map((tag, ind) => tag.trim() && <Tag key={ind} tag={tag} />)}
    </ul>
  );
}
