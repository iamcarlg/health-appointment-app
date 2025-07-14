export interface Appointment {
    id: number;
    patientId: number;
    hospitalId: number;
    packageId?: number;
    appointmentDate: string;
    appointmentTime: string;
    status: 'SCHEDULED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    notes?: string;
    doctorName?: string;
    roomNumber?: string;
    createdAt?: string;
    updatedAt?: string;
}
