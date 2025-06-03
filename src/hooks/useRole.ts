// hooks/useRole.ts
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import type { UserRole } from '../types/types';


const useRole = () => {
  const userRole = useSelector((state: RootState) => state.auth.user?.role) as UserRole | undefined;

  const hasRole = (requiredRole: UserRole | UserRole[]): boolean => {
    if (!userRole) return false;

    return Array.isArray(requiredRole)
      ? requiredRole.includes(userRole)
      : userRole === requiredRole;
  };

  return { hasRole, role: userRole };
};

export default useRole;
