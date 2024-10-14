import { SignForm } from '@/components/shared/user/SignForm';
import { Container } from '@/components/shared/Container';
export function SignUpPage() {
  return (
    <Container className="max-w-[384px]">
      <SignForm type="sign-up" />
    </Container>
  );
}
