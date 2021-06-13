import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authentication: AuthenticationService) {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      type: ''
    })
  }

  ngOnInit(): void { }

  submit(): void {
    this.authentication.register(this.form).subscribe((res: any) => {
      this.router.navigate(['home']);
    })
  }
}
