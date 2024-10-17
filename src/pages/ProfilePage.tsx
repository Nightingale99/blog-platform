import { Container } from '@/components/shared/Container';
import { ProfileForm } from '@/components/shared/user/ProfileForm';

export function ProfilePage() {
  return (
    <Container className="max-w-[384px]">
      <ProfileForm />
    </Container>
  );
}
