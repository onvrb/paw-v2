import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { TicketsService } from '../services/tickets.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  form!: FormGroup;
  constructor(private ticketsService: TicketsService,
    private formBuilder: FormBuilder,
    private router: Router) {
      this.form = this.formBuilder.group({
        user: '',
        event: '',
        price: ''
      })
     }
 
  ngOnInit(): void {
  }

  submit(): void {
    console.log(this.form.getRawValue());
    this.ticketsService.createTicket(this.form).subscribe((res: any) => {
      window.location.reload();
    })
  }

}
