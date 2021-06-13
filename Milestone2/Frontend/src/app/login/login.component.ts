import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private authentication: AuthenticationService, private userService: UsersService) {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void { }

  login(): void {
    let email = this.form.controls['email'].value;
    let password = this.form.controls['password'].value;
    
    this.authentication.login(email, password).subscribe((res: any) => {
      if (res.user && res.token) {
        console.log(res.token)
        console.log(res.user)
        localStorage.setItem('token', res.token)
        localStorage.setItem('currentUser', JSON.stringify(res.user));
      }

      this.userService.getUserTypes().subscribe((res: any) => {
        console.log(res)
        let user_types = res.user_types;
        user_types.forEach((user_type: any) => {
          switch (user_type.type) {
            case "admin":
              localStorage.setItem('admin_id', user_type._id);
              break;
            case "promoter":
              localStorage.setItem('promoter_id', user_type._id);
              break;
            case "user":
              localStorage.setItem('user_id', user_type._id);
              break;
          }
        });
        this.router.navigate(['/home']);
      })
    });
  }

}
