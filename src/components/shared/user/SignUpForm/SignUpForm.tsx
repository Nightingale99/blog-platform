import { cn } from '@/lib/utils.ts';
import { z } from 'zod';
import { useSignUpMutation } from '../usersAPI';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import type { SignUpErrors } from '@/types/users';
import { signUpFormSchema } from './sign-up-form-schema';

interface SignUpFormProps {
  className?: string;
}

export function SignUpForm({ className }: SignUpFormProps) {
  const [
    signup,
    { isSuccess: isRegistrationSuccess, isError, isLoading, error },
  ] = useSignUpMutation();

  const serverErrorWords = {
    username: {
      'is invalid': 'Неверный формат никнейма.',
      'is already taken.': 'Никнейм уже занят',
    },
    email: {
      'is invalid': 'Неверный формат почты.',
      'is already taken.': 'Почта уже занята',
    },
  };

  const serverErrors: string[] | undefined =
    isError && 'status' in error
      ? Object.entries((error.data as SignUpErrors).errors).map(
          ([err, msg]) =>
            (
              serverErrorWords[err as keyof typeof serverErrorWords] as {
                [key: string]: string;
              }
            )[msg as string],
        )
      : undefined;

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });

  const navigate = useNavigate();

  if (isRegistrationSuccess) {
    navigate('/');
  }

  return (
    <Form {...form}>
      <form
        className={cn(
          'py-12 px-8 bg-foreground rounded-md flex flex-col gap-[12px]',
          className,
        )}
        onSubmit={form.handleSubmit((data) => {
          signup({ user: data });
        })}
      >
        <h3 className="text-center text-xl mb-2">Регистрация</h3>
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Никнейм</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Никнейм" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Электронная почта" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Пароль" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="repeatPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтверждение пароля</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Подтверждение пароля"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="agreement"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-5 border-t-[1px] pt-2">
              <div className="flex items-start gap-2">
                <FormControl>
                  <input
                    type="checkbox"
                    className="mt-1 checked:bg-primary w-4 h-4"
                    {...field}
                    value={field.value as unknown as string}
                  />
                </FormControl>
                <FormLabel className="text-black leading-6">
                  Согласен со всякими штуками там ага угу и еще на кредиты
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {isError && 'status' in error && error.status === 422 && (
          <p className="text-sm text-destructive p-0">
            {serverErrors!.map((e) => (
              <>
                <span>{e}</span>
                <br />
              </>
            ))}
          </p>
        )}

        <Button
          disabled={isLoading}
          type="submit"
          className="w-full mb-2 mt-[21px]"
          variant="default"
        >
          Зарегистрироваться
        </Button>
        <span className="text-center text-[12px] text-secondary">
          Уже есть аккаунт?{' '}
          <Link to="/sign-in" className="text-primary hover:underline">
            Войти.
          </Link>
        </span>
      </form>
    </Form>
  );
}
