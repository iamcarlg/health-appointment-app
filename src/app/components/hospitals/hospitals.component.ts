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
  hospitalId : number | null = null;
  isEditing = false;

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

    if(this.isEditing && this.hospitalId){
      this.apiService.updateHospital(this.hospitalId, this.hospital).subscribe({
        next : (data) => {
          console.log('Hospital updated !', data);
          this.resetForm();
        }
      })
    } else {
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

  onEdit(id: number){
    this.apiService.getHospitalById(id).subscribe({
      next : (data) => {
        this.hospital = data;
        this.isEditing = true;
        this.hospitalId = id;
      },
      error : (error) => {
        console.log('error : ', error);
      }
    })
  }

  onDelete(id : number){
    this.apiService.deleteHospital(id).subscribe({
      next : () => {
        this.hospitals = this.hospitals.filter(hospital => hospital.id != id);
      }
    })
  }

  resetForm(){
    this.hospital = {} as Hospital;
  }
}
