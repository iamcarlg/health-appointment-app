import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Patient } from '../../interfaces/patient';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients',
  imports: [CommonModule, FormsModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit{
  patientList: Patient[] = [];
  patient: Patient = {} as Patient;
  isEditing: boolean = false;
  editingPatientId: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    debugger;
    this.loadPatients();
  }

  loadPatients() {
    this.apiService.getPatients().subscribe({
      next : (data) => {
        this.patientList = data;
        console.log("PatientS List : ", this.patient);
      },
      error : (error) => {
        console.log("Error : ", error);
      }
    });
  }

  onSubmit() {
    if (this.isEditing && this.editingPatientId) {
      // Update existing patient
      this.apiService.updatePatient(this.editingPatientId, this.patient).subscribe({
        next: (data) => {
          console.log("Patient updated successfully");
          this.resetForm();
          this.loadPatients();
        },
        error: (error) => {
          console.log("Error updating patient: ", error);
        }
      });
    } else {
      // Add new patient
      this.apiService.addPatient(this.patient).subscribe({
        next: (data) => {
          console.log("Patient added successfully");
          this.resetForm();
          this.loadPatients();
        },
        error: (error) => {
          console.log("Error adding patient: ", error);
        }
      });
    }
  }

  onEdit(id: number) {
    this.apiService.getPatientById(id).subscribe({
      next: (data) => {
        this.patient = data;
        this.isEditing = true;
        this.editingPatientId = id;
      },
      error: (error) => {
        console.log('error : ', error);
      }
    });
  }

  onDelete(id: number){
    this.apiService.deletePatient(id).subscribe({
      next : (data) => {
        this.patientList = this.patientList.filter(patient => patient.id !== id);
      },
      error : (error) => {
        console.log('error : ', error);
      }
    })
  }

  resetForm() {
    this.patient = {} as Patient;
    this.isEditing = false;
    this.editingPatientId = null;
  }
}
