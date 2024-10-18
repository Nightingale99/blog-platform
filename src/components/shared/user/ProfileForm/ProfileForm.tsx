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
import { cn } from '@/lib/utils.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateUserMutation } from '../usersAPI';
import { toast } from 'sonner';
import { SignUpErrors } from '@/types/users';
import { profileFormSchema } from './profile-form-schema';

interface ProfileFormProps {
  className?: string;
}

export function ProfileForm({ className }: ProfileFormProps) {
  const [updateUser, { isLoading, error, isError }] = useUpdateUserMutation();

  const serverErrorWords = {
    username: 'Никнейм уже занят',
    email: 'Почта уже занята',
  };

  const serverErrors: string[] | undefined =
    isError && 'status' in error
      ? Object.keys((error.data as SignUpErrors).errors).map(
          (err) => serverErrorWords[err as keyof typeof serverErrorWords],
        )
      : undefined;

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
  });

  function onFormSubmit(data: z.infer<typeof profileFormSchema>) {
    const token = localStorage.getItem('token');
    if (!token) {
      toast('Необходимо авторизоваться');
      return;
    }
    updateUser({ user: { ...data }, token: token });
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        className={cn(
          'py-12 px-8 bg-foreground rounded-md flex flex-col gap-[12px]',
          className,
        )}
        onSubmit={form.handleSubmit((data) => {
          onFormSubmit(data);
        })}
      >
        <h3 className="text-center text-xl mb-2">Редактирование профиля</h3>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Никнейм</FormLabel>
              <FormControl>
                <Input placeholder="Никнейм" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input placeholder="Электронная почта" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Обо мне</FormLabel>
              <FormControl>
                <Input placeholder="Обо мне" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Аватар (url)</FormLabel>
              <FormControl>
                <Input placeholder="Ссылка на аватар" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isError && 'status' in error && error.status === 422 && (
          <p className="text-sm text-destructive">
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
          className="w-full mt-5"
          variant="default"
          type="submit"
        >
          Сохранить
        </Button>
      </form>
    </Form>
  );
}
