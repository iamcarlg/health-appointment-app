export interface User {
    id?: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'DOCTOR' | 'NURSE' | 'RECEPTIONIST';
    phone?: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
  }