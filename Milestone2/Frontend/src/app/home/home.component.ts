import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string;

  constructor() {
    let user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.name = user.name;
  }

  ngOnInit(): void {
  }

}
