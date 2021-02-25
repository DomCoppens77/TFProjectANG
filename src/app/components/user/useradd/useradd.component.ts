import { Component, OnInit, ViewChild  } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User2Service } from 'src/app/services/user2.service';
import { APIUSER,User } from 'src/app/models/User.full.model';
  
import { ConfirmedValidator, ConfirmedValidatorDiff } from '../../../shared/confirmed.validator';

import { NbPopoverDirective } from '@nebular/theme';

import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.scss']
})
export class UseraddComponent implements OnInit {

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

    fg : FormGroup;
  admin : boolean;
  model : APIUSER = new APIUSER();
  spinner = true;

  constructor(private _builder : FormBuilder,private _router : ActivatedRoute, private _rout : Router, private _service : User2Service) { }


  ngOnInit(): void {

    this.admin = CheckAdmin();
    this.fg = this._builder.group({
      fname      : ['', Validators.required],
      lname      : ['', Validators.required],
      email      : ['', [Validators.required,Validators.email]],
      passwd     : ['', Validators.required],
      passwd2    : ['', Validators.required],
      secretans  : ['', Validators.required],
      secretans2 : ['', Validators.required],
    }, { 
      validator: [ConfirmedValidator('passwd', 'passwd2')
      , ConfirmedValidator('secretans', 'secretans2')]
      
    }
    );  
    this.spinner = false;
  }


  // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")

  get f(){

    return this.fg.controls;

  }

  onSubmit()  {

    if (this.fg.value['passwd'] == this.fg.value['passwd2'] && this.fg.value['passwd'] !="" )
    {
      if (this.fg.value['secretans'] == this.fg.value['secretans2']  && this.fg.value['secretans'] !="")
      {
        if (this.fg.value['secretans'] != this.fg.value['passwd'])
        {        
          const u = new User();
          u.firstName = this.fg.value['fname']; 
          u.lastName = this.fg.value['lname'];
          u.email =  this.fg.value['email'];
          u.passwd = btoa(this.fg.value['passwd']);
          u.secretAnswer = btoa(this.fg.value['secretans']);
          u.avatar = "";
          
          //console.log(u);
          
          this._service.save(u);
          this._rout.navigate(['/UserList'])
        }
        else{console.log("Answer=password");}
      }
      else 
      {
        console.log("answer not the same");
     }
    }
    else 
    {
      console.log("passwd not not the same");
    }
  }

  back2list() {
    this._rout.navigate(['/UserList'])
  }

}
