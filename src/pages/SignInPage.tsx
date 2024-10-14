import { Container } from '@/components/shared/Container';
import { SignForm } from '@/components/shared/user/SignForm';

export function SignInPage() {
  return (
    <Container className="max-w-[384px]">
      <SignForm type="sign-in" />
    </Container>
  );
}
