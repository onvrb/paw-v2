import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  today: string;

  constructor() {
    this.today = new Date().toDateString();
  }

  ngOnInit(): void {
  }

}
