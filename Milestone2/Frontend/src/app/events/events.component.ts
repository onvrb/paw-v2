import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  query: string = '';
  events: any;

  constructor(
    private eventService: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.query = params;
    })

    this.eventService.getEvents(this.query).subscribe((res: any) => {
      this.events = res.events;
      console.log(this.events)
    })
  }

}
