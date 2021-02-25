import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login} from 'src/app/Models/User.Login.model';
import { UserService } from 'src/app/services/User.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fg : FormGroup;
  error_text = "";
  try = 0;
  
  constructor(private _service : UserService, 
    private _builder : FormBuilder,
    private _rout : Router,
    private _client : HttpClient,
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.fg = this._builder.group({
      Email : ['zecoop@gmail.com', [Validators.required, Validators.email]],
      Passwd : ['ABC123', Validators.required]
    })
  }

  get f(){
    return this.fg.controls;
  }

  onSubmit() {
    const log = new Login();
    log.email = this.fg.value['Email'];
    log.passwd = btoa(this.fg.value['Passwd']) ;
   
    this._service.Login(log)
    .then(() => {
      
         this._rout.navigate(['/GenList']);})
    .catch(() => { 
      this.try += 1;
      this.error_text="Wrong Login/password (" + this.try + ")";

      // maybe safe after several try the time and avoid login with the next 5 minutes
      // localstore will be too easy ? no ?
    });
  }
}
