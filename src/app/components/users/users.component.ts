import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users : any [] = [];
  user: User = {} as User;

  constructor (private apiService : ApiService){};

  // Users initialization
  ngOnInit(): void {
    this.loadUsers();

  }

  // Load all the users
  loadUsers(){
    debugger;
    this.apiService.getUsers().subscribe({
      next : (data) => {
        console.log('Users : ', data);
        this.users = data;
      },
      error : (error) => {
        console.log('error : ', error);
      }
    })
  }

  // Add users to the list via the form
  onSubmit(){
    if(this.user.firstName != '' || this.user.lastName != '' || this.user.email != '' || this.user.phone != ''){        
      this.apiService.addUser(this.user).subscribe({
        next : (data) => {
          console.log('Utilisateur ajouté !', data);
          this.users.push(data);
          alert('Utilisateur ajouté !');
          this.user = {} as User;
        }
      })
    }
    else{
      this.user = {} as User;
      alert('Veuillez remplir tous les champs !');
      this.loadUsers();
    }
  }
}
