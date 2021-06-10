import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, activatedRoute: ActivatedRoute) {
    console.log(activatedRoute.snapshot.paramMap.get('message'))
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
    this.message = activatedRoute.snapshot.paramMap.get('message')?.toString();
  }

  ngOnInit(): void { }

  login(): void {
    this.http.post('http://localhost:4200/api/users/login', this.form.getRawValue())
      .subscribe(
        res => {
          this.router.navigate(['home']);
        },
        error => {
          this.router.navigate(['login'])
        })
  }

}
