import { useGetCurrentUserQuery } from '@/components/shared/user/usersAPI';
import { Spinner } from '@/components/ui/spinner';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthRequiredProps } from './UnAuthRequired';

export function AuthRequired({
  children,
  errorMessage,
  showSpinner,
  spinnerSize = 'large',
}: AuthRequiredProps) {
  const token = localStorage.getItem('token');

  const { isSuccess, isLoading } = useGetCurrentUserQuery(token!);

  if (isLoading) {
    return showSpinner ? <Spinner size={spinnerSize} /> : null;
  } else if (!isSuccess) {
    toast(errorMessage);
    return <Navigate to="/" replace={true} />;
  } else {
    return children;
  }
}
