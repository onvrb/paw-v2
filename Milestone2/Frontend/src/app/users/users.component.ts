import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;

  constructor(private http: HttpClient, private router: Router, private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.http.get('http://localhost:4200/api/users')
      .subscribe((res: any) => {
        this.users = res.users;
      })
  }
}
