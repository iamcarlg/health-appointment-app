import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Hospital } from '../interfaces/hospital';
import { Patient } from '../interfaces/patient';
import { Appointment } from '../interfaces/appointment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Get all the patiens
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
  }

  // Get a patient by id
  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patients/${id}`);
  }

  // Add new patient to the list
  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, patient);
  }

  // Update existing patient
  updatePatient(id: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/patients/${id}`, patient);
  }

  // Delete a patient
  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/patients/${id}`);
  }
  
  // Get all hospitals
  getHospitals(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(`${this.apiUrl}/hospitals`);
  }

  // Add new Hospital to the list
  addHospital(hospital: Hospital) : Observable<Hospital> {
    return this.http.post<Hospital>(`${this.apiUrl}/hospitals`, hospital);
  }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Add a new user
  addUser(user : User): Observable <User> {
    return this.http.post <User> (`${this.apiUrl}/users`, user);
  }

  // Get all appointments
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments`);
  }

  // getUserById(id: number): Observable<User> {}

  // getHospitalById(id: number): Observable<Hospital> {}

  // getPatientById(id: number): Observable<Patients> {}

  // getAppointmentById(id: number): Observable<Appointments> {}
}
