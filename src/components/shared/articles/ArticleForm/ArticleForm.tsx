import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from '../articlesAPI';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { articleFormSchema, ArticleFormValues } from './article-form-schema';
import { Article } from '@/types/articles';

interface ArticleFormProps {
  className?: string;
  mode: 'create' | 'edit';
  articleData?: {
    article: Article;
    isLoading: boolean;
  };
}

export function ArticleForm({
  className,
  mode = 'create',
  articleData,
}: ArticleFormProps) {
  const [createArticle] = useCreateArticleMutation();

  const [updateArticle] = useUpdateArticleMutation();

  const [tags, setTags] = useState<string[]>(
    articleData?.article?.tagList || [],
  );

  const navigate = useNavigate();

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: articleData?.article?.title || '',
      description: articleData?.article?.description || '',
      body: articleData?.article?.body || '',
      tagList: articleData?.article?.tagList || [''],
    },
  });

  async function onFormSubmit(data: ArticleFormValues) {
    const token = localStorage.getItem('token');
    if (!token) {
      toast('Необходимо авторизоваться');
      return;
    }
    const response =
      mode === 'create'
        ? await createArticle({ body: data, token: token })
        : await updateArticle({
            slug: articleData!.article.slug,
            body: data,
            token: token,
          });
    if ('data' in response) {
      toast(mode === 'create' ? 'Статья успешно создана' : 'Статья обновлена');
      if (mode === 'edit') {
        navigate(`/articles/${articleData!.article.slug}`);
      } else {
        navigate(
          `/articles/${(response.data! as { article: Article }).article.slug}`,
        );
      }
    } else {
      toast('Произошла ошибка при создании или редактировании статьи');
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn(
          'py-12 px-8 bg-foreground rounded-md flex flex-col gap-[12px]',
          className,
        )}
        onSubmit={form.handleSubmit(onFormSubmit)}
      >
        <h3 className="text-center text-xl mb-2">
          {mode === 'create' ? 'Создать новую статью' : 'Редактировать статью'}
        </h3>
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название статьи</FormLabel>
              <FormControl>
                <Input placeholder="Название" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Короткое описание</FormLabel>
              <FormControl>
                <Input placeholder="Описание" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="body"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Текст</FormLabel>
              <FormControl>
                <Textarea placeholder="Текст вашей статьи" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h5>Теги</h5>
        {!tags.length && (
          <Button
            className="w-[300px]"
            onClick={() => setTags((prev) => [...prev, ''])}
            variant="tag"
          >
            Добавить тег
          </Button>
        )}
        {tags.map((_, ind) => (
          <FormField
            name={`tagList.${ind}`}
            control={form.control}
            key={ind}
            render={({ field }) => (
              <div className="flex gap-4">
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-[300px]"
                      placeholder="Тег"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <Button
                  variant="tag"
                  className="text-destructive border-destructive"
                  onClick={() => {
                    setTags((prev) => prev.filter((_, i) => i !== ind));
                    form.reset({
                      ...form.getValues(),
                      tagList: form
                        .getValues()
                        .tagList.filter((_, i) => i !== ind),
                    });
                  }}
                >
                  Удалить
                </Button>
                {ind + 1 === tags.length && (
                  <Button
                    onClick={() => {
                      setTags((prev) => [...prev, '']);
                    }}
                    variant="tag"
                  >
                    Добавить тег
                  </Button>
                )}
              </div>
            )}
          />
        ))}
        <Button className="w-80" variant="default" type="submit">
          Отправить
        </Button>
      </form>
    </Form>
  );
}
