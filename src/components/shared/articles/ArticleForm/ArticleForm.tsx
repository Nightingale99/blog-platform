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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useCreateArticleMutation,
  useGetOneArticleQuery,
  useUpdateArticleMutation,
} from '../articlesAPI';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';
import { articleFormSchema, ArticleFormValues } from './article-form-schema';
import { Spinner } from '@/components/ui/spinner';

interface ArticleFormProps {
  className?: string;
  mode: 'create' | 'edit';
}

export function ArticleForm({ className, mode = 'create' }: ArticleFormProps) {
  const [createArticle] = useCreateArticleMutation();

  const [updateArticle] = useUpdateArticleMutation();

  const location = useLocation();

  const token = localStorage.getItem('token');

  const { data: currentArticle, isLoading } = useGetOneArticleQuery(
    { slug: location.pathname.split('/')[2], token: token },
    { skip: mode === 'create' },
  );

  const [tags, setTags] = useState<string[]>(['']);

  const navigate = useNavigate();

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      tagList: currentArticle?.article?.tagList || [''],
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
            slug: currentArticle!.article.slug,
            body: data,
            token: token,
          });
    if ('data' in response) {
      toast(mode === 'create' ? 'Статья успешно создана' : 'Статья обновлена');
      navigate('/');
    } else {
      toast('Произошла ошибка при создании или редактировании статьи');
    }
  }

  useEffect(() => {
    if (currentArticle) {
      setTags(
        Array.from(
          { length: currentArticle?.article?.tagList.length || 0 },
          () => '',
        ),
      );
      form.setValue('tagList', currentArticle?.article?.tagList || ['']);
      form.setValue('title', currentArticle?.article?.title || '');
      form.setValue('description', currentArticle?.article?.description || '');
      form.setValue('body', currentArticle?.article?.body || '');
    }
  }, [currentArticle, form]);

  if (mode === 'edit' && isLoading) {
    return <Spinner size="large" />;
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
