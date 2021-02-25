import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopService   } from 'src/app/services/shop.service';
import { Shop } from 'src/app/Models/Shop.model';
import { APICTRY } from 'src/app/Models/country.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-shopadd',
  templateUrl: './shopadd.component.html',
  styleUrls: ['./shopadd.component.scss']
})
export class ShopaddComponent implements OnInit {
  
  fg : FormGroup;

  constructor(private _builder : FormBuilder, private _service : ShopService, private _rout : Router) { }

  CKclosed: boolean;
  CKStatus: string;
  LstCtry : APICTRY = new APICTRY();
  admin : boolean;
  spinner = true;
    
  ngOnInit(): void {
    
    this.admin = CheckAdmin();

    this._service.listCountries().subscribe(data => {
      this.LstCtry = data;
      this.spinner = false;
    });
    
    this.CKclosed = false;
    
    this.fg = this._builder.group({
      Name     : ['', Validators.required],
      Address1 : [''],
      Address2 : [''],
      ZIP      : [''],
      City     : [''],
      Country  : ['BE',Validators.required],
      Phone    : [''],
      Email    : ['', Validators.email || ValidityState],
      WebSite  : [''],
      Local    : [''],
      Closed   : [this.CKclosed,Validators.required]
    });
    this.toggle(this.CKclosed);
  }

  get f(){
    return this.fg.controls;
  }

  onSubmit() {
    const ss = new Shop();
    ss.name =   this.fg.value['Name'];
    ss.address1 = this.fg.value['Address1'];
    ss.address2 = this.fg.value['Address2'];
    ss.zip = this.fg.value['ZIP'];
    ss.city = this.fg.value['City'];
    ss.country = this.fg.value['Country'];
    ss.phone = this.fg.value['Phone'];
    ss.email = this.fg.value['Email'];
    ss.webSite = this.fg.value['WebSite'];
    ss.localisationURL = this.fg.value['Local'];
    ss.closed = this.CKclosed;

    this._service.save(ss);
    this._rout.navigate(['/ShopList']);
  }

  toggle(checked: boolean) {
    this.CKclosed = checked;

    if (this.CKclosed) this.CKStatus = "danger";
    else this.CKStatus = "success";
 
  }
  back2list() {
    this._rout.navigate(['/ShopList']);
    }
}
