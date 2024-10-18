import { z } from 'zod';

export const profileFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Никнейм должен быть не менее 3 символов в длину' })
      .max(20, {
        message: 'Никнейм должен быть не более 20 символов в длину',
      }),
    email: z.string().email({ message: 'Неверная почта' }),
    bio: z
      .string({})
      .min(3, {
        message: 'Новый пароль должен быть не менее 6 символов в длину',
      })
      .max(40, {
        message: 'Новый пароль должен быть не более 40 символов в длину',
      }),
    image: z.string().url({ message: 'Неверная ссылка' }),
  })
  .partial();
