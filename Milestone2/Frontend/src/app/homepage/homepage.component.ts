import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  today: string = new Date().toDateString();
  today_date: string = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDay();

  constructor() { }

  ngOnInit(): void { }

}
