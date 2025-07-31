'use client';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import Loader from './Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): React.ReactNode => {
  const isAuthenticated = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/auth/login');
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
