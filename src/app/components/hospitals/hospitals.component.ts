import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../interfaces/hospital';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hospitals',
  imports: [CommonModule, FormsModule],
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.css'
})
export class HospitalsComponent implements OnInit{

  hospitals : any [] = [];
  hospital : Hospital = {} as Hospital;

  constructor (private apiService: ApiService){};

  // Initialization of the data
  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(){
    this.apiService.getHospitals().subscribe({
      next : (data) => {
        this.hospitals = data;
      },
  
      error : (error) => {
        console.log(error);
  
      }
    })
  }

  onSubmit(){
    if(this.hospital.name == '' || this.hospital.address == '' || this.hospital.email == ''  || this.hospital.phone==''){
      alert('Veuillez remplir tous les champs du formulaires');
      this.loadData();
      this.hospitals = [];

    } else {
      this.apiService.addHospital(this.hospital).subscribe({
        next : (data) => {
          console.log('Hôpital ajouté avec succès:', data);
          this.hospitals.push(data);
          alert("L'hôpital a été ajouté !");
          this.hospital = {} as Hospital;
        },
        error : (error) => {
          console.log('error : ', error);
        }
      })
    }
    }
}
