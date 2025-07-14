import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-appointments',
  imports: [CommonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit{
  appointments : any [] = [];

  constructor (private apiService : ApiService){}

  ngOnInit(): void {
    this.apiService.getAppointments().subscribe({
      next : (data) => {
        this.appointments = data;
      },
      error : (error) => {
        console.log('error : ', error);
      }
    })
  }
}
