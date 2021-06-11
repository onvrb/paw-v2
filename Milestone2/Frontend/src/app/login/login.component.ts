import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private authentication: AuthenticationService) {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void { }

  login(): void {
    let email = this.form.controls['email'].value;
    let password = this.form.controls['password'].value;
    console.log('going')
    this.authentication.login(email, password).subscribe((res: any) => {
      console.log(res);
      if (res.user && res.token) {
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.router.navigate(['/home']);
      }
    });
  }

}
