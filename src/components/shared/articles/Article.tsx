import { cn } from '@/lib/utils.ts';
import { Heart } from 'lucide-react';
import { TagsList } from './tags/TagsList';
import type { Article } from '@/types/articles';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cleanText } from './fns/cleanText';

interface ArticleProps {
  className?: string;
  article: Article;
  full?: boolean;
}

export function Article({ className, article, full = false }: ArticleProps) {
  const {
    slug,
    title,
    description,
    tagList,
    createdAt,
    favoritesCount,
    body,
    author,
  } = article;

  const { username, image } = author;

  return (
    <li
      className={cn(
        'p-4 bg-foreground w-[938px] shadow-lg rounded-md flex justify-between items-start',
        !full ? 'h-[141px]' : '',
        className,
      )}
    >
      <div className="flex-col space-y-1 max-w-[682px]">
        <div className="flex items-center mb-1">
          <Link to={`/articles/${slug}`}>
            <h3 className="text-xl text-primary mr-3 text-ellipsis line-clamp-1">
              {cleanText(title)}
            </h3>
          </Link>
          <Heart
            strokeWidth={1.2}
            width={20}
            height={20}
            className="min-w-5 min-h-5 mr-1"
          />
          <span>{favoritesCount}</span>
        </div>
        <TagsList tagList={tagList.map((tag) => cleanText(tag))} />
        <p className="text-[12px] text-ellipsis line-clamp-2 leading-6 text-secondary-foreground font-inter">
          {cleanText(description)}
        </p>
        {full && <p>{body}</p>}
      </div>
      <div className="flex flex-nowrap items-center">
        <div className="text-right">
          <h4>{username}</h4>
          <span className="text-secondary">
            {format(new Date(createdAt), 'd MMMM, yyyy', { locale: ru })}
          </span>
        </div>
        <img
          className="w-12 h-12 rounded-full ml-3"
          src={image}
          alt="profile picture"
        />
      </div>
    </li>
  );
}
