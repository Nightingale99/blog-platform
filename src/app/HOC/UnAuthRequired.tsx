import { useGetCurrentUserQuery } from '@/components/shared/user/usersAPI';
import { Spinner } from '@/components/ui/spinner';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

export interface AuthRequiredProps {
  children: React.ReactNode;
  errorMessage: string;
  spinnerSize?: 'small' | 'medium' | 'large';
  showSpinner?: boolean;
}

export function UnAuthRequired({
  children,
  errorMessage,
  spinnerSize = 'large',
  showSpinner = true,
}: AuthRequiredProps) {
  const token = localStorage.getItem('token');

  const { isSuccess, isLoading } = useGetCurrentUserQuery(token!);

  if (isSuccess) {
    toast(errorMessage);
    return <Navigate to="/" replace={true} />;
  } else if (isLoading) {
    return showSpinner ? <Spinner size={spinnerSize} /> : null;
  } else {
    return children;
  }
}
