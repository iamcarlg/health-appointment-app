export interface Hospital {
    id?: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    description?: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}