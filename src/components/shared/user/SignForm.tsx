import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { InputWithLabel } from '@/components/ui/input-with-label';
import { cn } from '@/lib/utils.ts';
import { Link } from 'react-router-dom';

interface SignFormProps {
  className?: string;
  type: 'sign-in' | 'sign-up';
}

export function SignForm({ className, type }: SignFormProps) {
  return (
    <div className={cn('py-12 px-8 bg-foreground rounded-md', className)}>
      <h3 className="text-center text-xl mb-5">
        {type === 'sign-in' ? 'Вход' : 'Регистрация'}
      </h3>
      <form className="flex flex-col text-[14px]">
        {type === 'sign-up' && (
          <InputWithLabel
            className="mb-[14px]"
            label="Ник"
            id="email"
            type="email"
            placeholder="Ник"
          />
        )}
        <InputWithLabel
          className="mb-[14px]"
          label="Почта"
          id="email"
          type="email"
          placeholder="Почта"
        />
        <InputWithLabel
          label="Пароль"
          id="password"
          type="password"
          placeholder="Пароль"
        />
        {type === 'sign-up' && (
          <>
            <InputWithLabel
              className="mt-[14px]"
              label="Повторите пароль"
              id="password"
              type="password"
              placeholder="Повторите пароль"
            />
            <label
              className="flex items-start mt-5 border-t-[1px] pt-2"
              htmlFor="agreement"
            >
              <Checkbox className="mt-1" id="agreement" />
              <span className="ml-2">
                Согласен со всякими штуками там ага угу и еще на кредиты
              </span>
            </label>
          </>
        )}
        <Button className="w-full mb-2 mt-[21px]" variant="default">
          {type === 'sign-in' ? 'Войти' : 'Зарегистрироваться'}
        </Button>
        <span className="text-center text-[12px] text-secondary">
          {type === 'sign-in' ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <Link
            to={type === 'sign-in' ? '/sign-up' : '/sign-in'}
            className="text-primary hover:underline"
          >
            {type === 'sign-in' ? 'Регистрация' : 'Войти'}.
          </Link>
        </span>
      </form>
    </div>
  );
}
