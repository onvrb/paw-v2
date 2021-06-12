import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  constructor() { 
    let user = JSON.parse(localStorage.getItem('currentUser') || 'N/A');
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
}

  ngOnInit(): void {
  }

}
