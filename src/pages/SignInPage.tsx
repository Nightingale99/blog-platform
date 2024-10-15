import { Container } from '@/components/shared/Container';
// import { useSignInMutation } from '@/components/shared/user/usersAPI';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/shared/user/Form';
import { InputWithLabel } from '@/components/ui/input-with-label';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export type SignInFormInputs = {
  email: string;
  password: string;
};

// const messages = {
//   required: 'Это поле обязательно для заполнения',
//   maxLength: 'Максимальная длина 25 символов',
//   minLength: 'Минимальная длина 3 символа',
//   pattern: 'Неверный формат',
//   min: 'Минимальное значение 0',
//   max: 'Максимальное значение 100',
// };

export function SignInPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormInputs>();
  // const [signin, { isLoading, isError, isSuccess, data }] = useSignInMutation();
  const onSubmit: SubmitHandler<SignInFormInputs> = (data) => {
    console.log(data);
  };
  return (
    <Container className="max-w-[384px]">
      <Form onSubmit={handleSubmit(onSubmit)} title="Вход">
        <InputWithLabel
          className="mb-[14px]"
          label="Почта"
          id="email"
          type="email"
          placeholder="Почта"
          register={register('email')}
          errors={errors.email}
        />
        <InputWithLabel
          label="Пароль"
          id="password"
          type="password"
          placeholder="Пароль"
          register={register('password')}
          errors={errors.password}
        />
        <Button className="w-full mb-2 mt-[21px]" variant="default">
          Войти
        </Button>
        <span className="text-center text-[12px] text-secondary">
          Нет аккаунта?{' '}
          <Link to="/sign-up" className="text-primary hover:underline">
            Регистрация.
          </Link>
        </span>
      </Form>
    </Container>
  );
}
