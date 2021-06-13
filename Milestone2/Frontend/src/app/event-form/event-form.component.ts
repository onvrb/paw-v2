import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { LocationsService } from '../services/locations.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  locations: any;
  promoters: any;

  query: any = {};

  form: FormGroup;

  constructor(private locationsService: LocationsService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private eventsService: EventsService,
    private router: Router) {

    this.usersService.getUsersByType('promoter').subscribe((res: any) => {
      this.promoters = res.users;
    })

    this.locationsService.getLocations().subscribe((res: any) => {
      this.locations = res.locations;
    });

    this.form = this.formBuilder.group({
      name: '',
      description: '',
      date: '',
      time: '',
      location: '',
      promoters: '',
      poster: '',
      price: ''
    })
  }

  ngOnInit(): void { }

  submit(): void {
    console.log(this.form.getRawValue());
    this.eventsService.createEvent(this.form).subscribe((res: any) => {
      window.location.reload();
    })
  }

}
