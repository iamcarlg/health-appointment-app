import { Routes } from '@angular/router';
import { PatientsComponent } from './components/patients/patients.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
    {
        path : "patients",
        component : PatientsComponent,
    },
    {
        path : "appointments",
        component : AppointmentsComponent,
    },
    {
        path : "hospitals",
        component : HospitalsComponent,
    },
    {
        path : 'users',
        component : UsersComponent,
    }
];
