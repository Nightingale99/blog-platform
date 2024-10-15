import { Form } from '@/components/shared/user/Form';
import { Container } from '@/components/shared/Container';
import { InputWithLabel } from '@/components/ui/input-with-label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { useSignUpMutation } from '@/components/shared/user/usersAPI';
import { useRef } from 'react';

export type SignUpFormInputs = {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
};
export const messages = {
  required: 'Это поле обязательно для заполнения',
  maxLength: 'Максимальная длина 20 символов',
  minLength: 'Минимальная длина 3 символа',
  pattern: 'Неверный формат',
  min: 'Минимальное значение 0',
  max: 'Максимальное значение 100',
};

export function SignUpPage() {
  // const [signup, { isLoading, isError, isSuccess, data, error }] =
  //   useSignUpMutation();

  const agreementRef = useRef<HTMLButtonElement>(null);
  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    console.log({ user: data });
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<SignUpFormInputs>();

  return (
    <Container className="max-w-[384px]">
      <Form onSubmit={handleSubmit(onSubmit)} title="Регистрация">
        <InputWithLabel
          className="mb-[14px]"
          label="Ник"
          id="username"
          type="text"
          placeholder="Ник"
          register={register('username', {
            required: true,
            maxLength: { value: 20, message: messages.maxLength },
            minLength: { value: 3, message: messages.minLength },
          })}
          errors={errors.username}
        />

        <InputWithLabel
          className="mb-[14px]"
          label="Почта"
          id="email"
          type="email"
          placeholder="Почта"
          register={register('email', {
            required: true,
            pattern: { value: /^\S+@\S+$/i, message: messages.pattern },
          })}
          errors={errors.email}
        />
        <InputWithLabel
          label="Пароль"
          id="password"
          type="password"
          placeholder="Пароль"
          register={register('password', {
            required: true,
            maxLength: { value: 40, message: messages.maxLength },
            minLength: { value: 6, message: messages.minLength },
          })}
          errors={errors.password}
        />
        <InputWithLabel
          className="mt-[14px]"
          label="Повторите пароль"
          id="password-repeat"
          type="password"
          placeholder="Повторите пароль"
          register={register('passwordRepeat', {
            required: true,
            validate(value) {
              return (
                value === getValues('password') || 'Пароли должны совпадать'
              );
            },
          })}
          errors={errors.passwordRepeat}
        />
        <label
          className="flex items-start mt-5 border-t-[1px] pt-2"
          htmlFor="agreement"
        >
          <Checkbox className="mt-1" id="agreement" ref={agreementRef} />
          <span className="ml-2">
            Согласен со всякими штуками там ага угу и еще на кредиты
          </span>
        </label>

        <Button
          disabled={
            agreementRef.current
              ? Boolean(agreementRef.current!['ariaChecked'])
              : false
          }
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
      </Form>
    </Container>
  );
}
