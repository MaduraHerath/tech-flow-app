export interface User {
  id: number;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'manager';
    assignedProjects:string[];
  teams:string[];
}

export interface AuthPayload {
  sub: number;
  email: string;
  role: string;
  exp: number;
  assignedProjects:string[];
  teams:string[];
}

export interface AuthState {
  token: string | null;
  user: Omit<AuthPayload, 'exp' | 'sub'> & { id: number } | null;
}

interface Project {
  id:string,
  name:string,
  status:'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold';
  priority:'high' | 'meadium' | 'low',
  teamId:string,
  teamName:string,
  assignedTo:string,
  createdBy:string,
  dueDate:string,
  description:string

}

interface Team {
  id:string,
  name:string,
  memberes:string[]
}

