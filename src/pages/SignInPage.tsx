import { Container } from '@/components/shared/Container';
import { SignInForm } from '@/components/shared/user/SignInForm/SignInForm';

export function SignInPage() {
  return (
    <Container className="max-w-[384px]">
      <SignInForm />
    </Container>
  );
}
