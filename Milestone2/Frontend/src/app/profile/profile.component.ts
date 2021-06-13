import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  name: string;
  email: string;
  covid: string;
  password: string;
  type: string;
  constructor() { 
    let user = JSON.parse(localStorage.getItem('currentUser') || 'N/A');
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.covid = user.covid;
    this.password = user.password;
    this.type = user.type.type;
}

  ngOnInit(): void {
  }

}
