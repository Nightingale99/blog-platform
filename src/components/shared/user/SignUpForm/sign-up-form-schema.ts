import { z } from 'zod';

export const signUpFormSchema = z
  .object({
    username: z
      .string({ message: 'Вы должны ввести никнейм' })
      .min(3, { message: 'Никнейм должен быть не менее 3 символов в длину' })
      .max(20, {
        message: 'Никнейм должен быть не более 20 символов в длину',
      }),
    email: z
      .string({ message: 'Вы должны ввести почту' })
      .email({ message: 'Неверный формат почты' }),
    password: z
      .string({ required_error: 'Вы должны ввести пароль' })
      .min(6, { message: 'Минимальная длина пароля 6 символов' })
      .max(40, { message: 'Максимальная длина пароля 40 символов' }),
    repeatPassword: z
      .string({ required_error: 'Вы должны повторно ввести пароль' })
      .min(6, { message: 'Минимальная длина пароля 6 символов' })
      .max(40, { message: 'Максимальная длина пароля 40 символов' }),
    agreement: z
      .boolean({
        required_error: 'Вы должны согласиться с условиями',
      })
      .refine((value) => value, {
        message: 'Вы должны согласиться с условиями',
      }),
  })
  .superRefine(({ repeatPassword, password }, ctx) => {
    if (repeatPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Пароли не совпадают',
        path: ['repeatPassword'],
      });
    }
  });
