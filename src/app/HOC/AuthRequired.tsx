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
  sendErrorMessage = true,
}: AuthRequiredProps) {
  const token = localStorage.getItem('token');

  const { isError, isLoading } = useGetCurrentUserQuery(token!, {
    skip: !token,
  });

  if (isError) {
    if (sendErrorMessage) {
      toast(errorMessage);
    }
    return <Navigate to="/" replace={true} />;
  } else if (isLoading) {
    return showSpinner ? <Spinner size={spinnerSize} /> : null;
  } else {
    return children;
  }
}
