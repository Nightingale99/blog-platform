import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSignInMutation } from './usersAPI';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';

interface SignInFormProps {
  className?: string;
}

export function SignInForm({ className }: SignInFormProps) {
  const [
    signin,
    {
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      isLoading: isLoadingInProcess,
    },
  ] = useSignInMutation();

  const formSchema = z.object({
    email: z.string().email({ message: 'Неверный формат почты' }),
    password: z
      .string()
      .min(6, { message: 'Минимальная длина пароля 6 символов' })
      .max(40, { message: 'Максимальная длина пароля 40 символов' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  if (isLoginSuccess) {
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
          signin({ user: data });
        })}
      >
        <h3 className="text-center text-xl mb-2">Вход</h3>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почта</FormLabel>
              <FormControl>
                <Input placeholder="Почта" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
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
        {isLoginError && (
          <p className="text-sm text-destructive">Неверная почта или пароль</p>
        )}
        <Button
          disabled={isLoadingInProcess}
          className="w-full"
          variant="default"
          type="submit"
        >
          Войти
        </Button>
        <span className="text-center text-[12px] text-secondary">
          Нет аккаунта?{' '}
          <Link to="/sign-up" className="text-primary hover:underline">
            Регистрация.
          </Link>
        </span>
      </form>
    </Form>
  );
}
