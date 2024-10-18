import { z } from 'zod';

export const signInFormSchema = z.object({
  email: z.string().email({ message: 'Неверный формат почты' }),
  password: z
    .string()
    .min(6, { message: 'Минимальная длина пароля 6 символов' })
    .max(40, { message: 'Максимальная длина пароля 40 символов' }),
});
