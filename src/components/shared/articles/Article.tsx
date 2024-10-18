import { cn } from '@/lib/utils.ts';
import { CircleAlert, Heart, Triangle } from 'lucide-react';
import { TagsList } from './tags/TagsList';
import type { Article } from '@/types/articles';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cleanText } from './fns/cleanText';
import Markdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { useGetCurrentUserQuery } from '../user/usersAPI';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import {
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnFavoriteArticleMutation,
} from './articlesAPI';
import { toast } from 'sonner';

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
    favorited,
  } = article;

  const { username, image } = author;
  const token = localStorage.getItem('token');
  const { isSuccess: isAuth, data: currentUser } = useGetCurrentUserQuery(
    token!,
  );

  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const [deleteArticle] = useDeleteArticleMutation();

  const [favoriteArticle] = useFavoriteArticleMutation();
  const [unFavoriteArticle] = useUnFavoriteArticleMutation();

  const navigate = useNavigate();

  const handleDeleteArticle = async () => {
    const response = await deleteArticle({ slug, token: token! });
    if ('data' in response) {
      toast('Статья успешно удалена');
      navigate('/');
    }
  };

  return (
    <li
      className={cn(
        'p-4 bg-foreground w-[938px] shadow-lg rounded-md flex justify-between items-start',
        !full ? 'min-h-full' : '',
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
          <Button
            disabled={!isAuth}
            onClick={() => {
              if (favorited) {
                unFavoriteArticle({ slug, token: token! });
              } else {
                favoriteArticle({ slug, token: token! });
              }
            }}
            className="w-0 h-0"
            variant="ghost"
          >
            <Heart
              strokeWidth={1.2}
              width={20}
              height={20}
              fill={`${favorited ? 'red' : '#fff'}`}
              stroke={`${favorited ? 'red' : '#000'}`}
              className="min-w-5 min-h-5 mr-1"
            />
          </Button>
          <span>{favoritesCount}</span>
        </div>
        <TagsList
          tagList={tagList ? tagList.map((tag) => cleanText(tag)) : []}
        />
        <p className="text-[12px] text-ellipsis line-clamp-2 leading-6 text-secondary-foreground font-inter min-h-20">
          {cleanText(description)}
        </p>
        {full && <Markdown className="w-[880px]">{body}</Markdown>}
      </div>
      <div>
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
        {isAuth && currentUser.user.username === author.username && (
          <div className="flex mt-8">
            <Popover open={popoverOpen}>
              <PopoverTrigger>
                <Button
                  onClick={() => setPopoverOpen((prev) => !prev)}
                  className="h-8 mr-2"
                  variant="destructive"
                >
                  Удалить
                </Button>
              </PopoverTrigger>
              <PopoverContent className="absolute py-3 left-[52px] top-[-37px] shadow-lg">
                <div className="flex flex-col gap-3">
                  <p className="flex items-start">
                    <Triangle
                      stroke="#D9D9D9"
                      fill="#fff"
                      width={12}
                      className="transform rotate-[-90deg] absolute left-[-11px]"
                    />
                    <CircleAlert
                      className="mr-1"
                      fill="#FAAD14"
                      stroke="#fff"
                    />
                    <span className="text-[14px]">
                      Вы уверены что хотите удалить статью?
                    </span>
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setPopoverOpen((prev) => !prev)}
                      variant="outline"
                      className="h-5 ml-auto"
                    >
                      Нет
                    </Button>

                    <Button onClick={handleDeleteArticle} className="h-5">
                      Да
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Link to={`/articles/${slug}/edit`} state={article}>
              <Button className="h-8 text-[14px]" variant="success">
                Изменить
              </Button>
            </Link>
          </div>
        )}
      </div>
    </li>
  );
}
