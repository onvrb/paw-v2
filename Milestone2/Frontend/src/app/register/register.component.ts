import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      type: 'Admin'
    })
  }

  ngOnInit(): void { }

  submit(): void {
    this.http.post('http://localhost:3000/users/login', this.form.getRawValue(), { withCredentials: true })
      .subscribe(res => {
        this.router.navigate(['home']);
      })
  }
}
