import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
import { APICTRY, Country } from 'src/app/Models/country.model';
import { Router } from '@angular/router';
import {CheckAdmin} from '../../../shared/CheckAdmin'

@Component({
  selector: 'app-countryadd',
  templateUrl: './countryadd.component.html',
  styleUrls: ['./countryadd.component.scss']
})
export class CountryaddComponent implements OnInit {

  fg : FormGroup;
  admin : boolean;
  CKIsEU: boolean;
  CKStatus: string;

  constructor(private _builder : FormBuilder, private _service : CountryService, private _rout : Router) { }

  ngOnInit(): void {
    this.admin = CheckAdmin();

    this.CKIsEU = false;

    this.fg = this._builder.group({
      iso     : ['', Validators.required],
      ctry    : ['', Validators.required],
      IsEU   : [this.CKIsEU,Validators.required]
    });   

    this.toggle(this.CKIsEU);
  }

  get f(){
    return this.fg.controls;
  }
  
  onSubmit() {
    const c = new Country();
    c.iso =   this.fg.value['iso'];
    c.ctry =  this.fg.value['ctry'];
    c.isEU = this.CKIsEU;

   this._service.save(c);
   this._rout.navigate(['/CountryList'])
  }

  toggle(checked: boolean) {
    this.CKIsEU = checked;

    if (this.CKIsEU) this.CKStatus = "success";
    else this.CKStatus = "danger";
 
  }
  back2list() {
    this._rout.navigate(['/CountryList'])
  }

}
