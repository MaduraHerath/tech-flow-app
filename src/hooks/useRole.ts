// hooks/useRole.ts
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

const useRole = () => {
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  const hasRole = (requiredRole: string | string[]): boolean => {
    if (!userRole) return false;

    return Array.isArray(requiredRole)
      ? requiredRole.includes(userRole)
      : userRole === requiredRole;
  };

  return { hasRole };
};

export default useRole;
