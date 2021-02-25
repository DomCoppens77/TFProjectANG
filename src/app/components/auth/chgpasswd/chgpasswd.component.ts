import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/User.service';
import { Router } from '@angular/router';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-chgpasswd',
  templateUrl: './chgpasswd.component.html',
  styleUrls: ['./chgpasswd.component.scss']
})
export class ChgpasswdComponent implements OnInit {

  fg : FormGroup;
  admin : boolean;

  constructor(private _builder : FormBuilder, private _service : UserService, private _rout : Router) { }
    
  ngOnInit(): void {
    
    this.admin = CheckAdmin();
    this.fg = this._builder.group({
      
      Email     : ['', Validators.email || ValidityState],
      oldpasswd : ['', Validators.required],
      passwd    : ['', Validators.required],
    });

  }

  onSubmit() {

  }

}
