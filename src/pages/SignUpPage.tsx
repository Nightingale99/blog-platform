import { Container } from '@/components/shared/Container';
import { SignUpForm } from '@/components/shared/user/SignUpForm/SignUpForm';

export function SignUpPage() {
  return (
    <Container className="max-w-[384px]">
      <SignUpForm />
    </Container>
  );
}
