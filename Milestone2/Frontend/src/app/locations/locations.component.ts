import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  locations: any;

  constructor(private http: HttpClient, private router: Router, private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.http.get('http://localhost:4200/api/locations')
      .subscribe((res: any) => {
        this.locations = res.locations;
      })
  }
}
