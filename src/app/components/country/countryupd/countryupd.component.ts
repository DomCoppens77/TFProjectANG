import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APICTRY, Country } from 'src/app/Models/country.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
import {CheckAdmin} from '../../../shared/CheckAdmin'

@Component({
  selector: 'app-countryupd',
  templateUrl: './countryupd.component.html',
  styleUrls: ['./countryupd.component.scss']
})
export class CountryupdComponent implements OnInit {

  fg : FormGroup;
  admin : boolean;
  CKIsEU: boolean;
  CKStatus: string;
  model : APICTRY = new APICTRY();

  constructor(private _builder : FormBuilder,private _router : ActivatedRoute, private _rout : Router, private _service : CountryService) { }

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.model = this._router.snapshot.data['model'];
    this.CKIsEU = Boolean(this.model.results[0].isEU);
    this.fg = this._builder.group({
      ctry    : [this.model.results[0].ctry, Validators.required],
      IsEU   : [this.CKIsEU]
    });  
    this.toggle(this.CKIsEU);
  }

  toggle(checked: boolean) {
    this.CKIsEU = checked;
    if (this.CKIsEU) this.CKStatus = "success";
    else this.CKStatus = "danger";
  }
  
  get f(){
    return this.fg.controls;
  }

  onSubmit()  {
    const c = new Country();
    c.iso =   this.model.results[0].iso;
    c.ctry =  this.fg.value['ctry'];
    c.isEU = this.CKIsEU;
    this._service.update(c);
    this._rout.navigate(['/CountryList'])
  }

  back2list() {
    this._rout.navigate(['/CountryList'])
  }
}
