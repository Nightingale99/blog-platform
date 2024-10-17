import { z } from 'zod';

export const articleFormSchema = z.object({
  title: z
    .string({ message: 'Вы должны ввести название статьи' })
    .min(3, {
      message: 'Название статьи должно быть не менее 3 символов в длину',
    })
    .max(100, {
      message: 'Название статьи должно быть не более 100 символов в длину',
    }),
  description: z
    .string({ message: 'Вы должны ввести краткое описание статьи' })
    .min(3, {
      message:
        'Краткое описание статьи должно быть не менее 3 символов в длину',
    })
    .max(200, {
      message:
        'Краткое описание статьи должно быть не более 200 символов в длину',
    }),
  body: z
    .string({ message: 'Вы должны ввести текст статьи' })
    .min(3, {
      message: 'Текст статьи должен быть не менее 3 символов в длину',
    })
    .max(5000, {
      message: 'Текст статьи должен быть не более 5000 символов в длину',
    }),
  tagList: z.array(
    z
      .string({ required_error: 'Нельзя отправить пустой тег' })
      .min(3, { message: 'Длина тега не может быть меньше 3 символов' })
      .max(40, { message: 'Длина тега не может быть больше 40 символов' }),
  ),
});
export type ArticleFormValues = z.infer<typeof articleFormSchema>;
