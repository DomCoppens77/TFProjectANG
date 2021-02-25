import { Component, OnInit } from '@angular/core';
import { Shop, APISHOP } from 'src/app/Models/Shop.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopService } from 'src/app/services/shop.service';
import { APICTRY } from 'src/app/Models/country.model';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-shopupd',
  templateUrl: './shopupd.component.html',
  styleUrls: ['./shopupd.component.scss']
})
export class ShopupdComponent implements OnInit {

  admin : boolean;
  model : APISHOP = new APISHOP();
  LstCtry : APICTRY = new APICTRY();
  CKclosed: boolean;
  CKStatus: string;
  fg : FormGroup;
  spinner = true;
  
  constructor(private _router : ActivatedRoute,private _builder : FormBuilder, private _service : ShopService, private _rout : Router) { }

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.model = this._router.snapshot.data['model'];

    this._service.listCountries().subscribe(data => {
      this.LstCtry = data; 
      this.spinner = false;
    });

    this.toggle(this.model.results[0].closed);

    this.fg = this._builder.group({
      Name : [this.model.results[0].name, Validators.required],
      Address1 : [this.model.results[0].address1],
      Address2 : [this.model.results[0].address2],
      ZIP : [this.model.results[0].zip],
      City : [this.model.results[0].city],
      Country : [this.model.results[0].country,Validators.required],
      Phone : [this.model.results[0].phone],
      Email : [this.model.results[0].email, Validators.email || ValidityState],
      WebSite : [this.model.results[0].webSite],
      Local : [this.model.results[0].localisationURL],
    });

  }

  onSubmit(){
    const ss = new Shop();
    ss.id = this.model.results[0].id;
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

    this._service.update(ss);
    this._rout.navigate(['/ShopList']);
  }

  toggle(checked: boolean) {
    this.CKclosed = checked;

    if (this.CKclosed) this.CKStatus = "danger";
    else this.CKStatus = "success";
  }
  get f(){
    return this.fg.controls;
  }

  back2list() {
    this._rout.navigate(['/ShopList']);
    }

}
