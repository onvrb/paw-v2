import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  @Input() event: any;
  name: string = '';
  description: string = '';
  location: string = '';
  poster: string = '';

  constructor() { }

  ngOnInit(): void {
    this.name = this.event.name;
    this.description = this.event.description;
    this.location = this.event.location.name;
    this.poster = this.event.poster;
  }

}
