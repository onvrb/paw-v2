import { Component, Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Object = {};

  constructor(public authentication: AuthenticationService, private router: Router) {
    //this.user = authentication.getUser();
  }

  ngOnInit(): void { }

  logout(): void {
    this.authentication.logout();
    this.router.navigate(['/login']);
  }

}
