import type { User, AuthPayload } from "../types/types";

export const generateFakeJWT = (user: User): string => {
  const payload: AuthPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + 1000 * 60 * 15 // 15 min
      ,
      assignedProjects: user.assignedProjects,
      teams: user.teams
  };
  return btoa(JSON.stringify(payload));
};

export const decodeJWT = (token: string): AuthPayload => {
  return JSON.parse(atob(token));
};
