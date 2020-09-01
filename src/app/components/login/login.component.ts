import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login} from 'src/app/Models/User.Login.model';

import { UserService } from 'src/app/services/User.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  fg : FormGroup;
  model : Login;

  constructor(private _service : UserService, 
    private _builder : FormBuilder,
    private _router : ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.fg = this._builder.group({
      Email : ['', [Validators.required, Validators.email]],
      Passwd : ['', Validators.required]
    })
  }

  onSubmit() {
    const log = new Login();
    log.Email = this.fg.value['Email'];
    log.passwd = btoa(this.fg.value['Passwd']) ;

    console.log(log.passwd);
    
    this._service.Login(log);
  }

}
