import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Appointment } from '../../interfaces/appointment';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-appointments',
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit{
  appointments : any [] = [];
  appointment : Appointment = {} as Appointment;

  isEditAppointment = false;
  appointmentId : number | null = null;

  constructor (private apiService : ApiService){}

  ngOnInit(): void {
    this.loadData();
  }
  
  // Load All the appointments on load
  loadData(){
    this.apiService.getAppointments().subscribe({
      next : (data) => {
        this.appointments = data;
      },
      error : (error) => {
        console.log('error : ', error);
      }
    })
  }

  // When a user submit a new appointment or edit a specific appointment
  onSubmit(){
    if(this.isEditAppointment && this.appointmentId){
      this.apiService.getAppointmentById(this.appointmentId).subscribe({
        next : (data) => {
          console.log('The appointment is successufully updated ! ', data);
          alert('A appointment is updated !');
          this.loadData();
          this.resetForm();
        },
        error : (error) => {
          console.log('Error : ', error);
        }
      })
    }else {
      this.apiService.addAppointment(this.appointment).subscribe({
        next : (data) => {
          console.log('A new appointment is added ! ', data);
          alert('A new appointment is added !');
          this.appointments.push(data);
          this.loadData();
          this.resetForm();
        },
        error : (error) => {
          console.log('error', error);
        }
      })
    }
  }

  onEdit(id : number){
    this.apiService.updateAppointment(id, this.appointment).subscribe({
      next : (data) => {
        this.isEditAppointment = true;
        this.appointment = data;
        this.appointmentId = id;
      },
      error : (err) => {
        console.log('Error : ', err);
      }
    })
  }
  onDelete(id : number){
    this.apiService.deleteAppointment(id).subscribe({
      next : () => {
        alert('A appointment is deleted !');
        this.appointments = this.appointments.filter(appoint => appoint.id != id);
        this.loadData();
      },
      error : (err) => {
        console.log('Error : ', err);
      }
    })
  }

  // Reset All data on the form
  resetForm(){
    this.appointment = {} as Appointment;
  }
}
