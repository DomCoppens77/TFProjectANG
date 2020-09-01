import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';
import { ShopService } from 'src/app/services/shop.service';
import {ApiService} from 'src/app/services/api.service';
import { APISHOP } from 'src/app/Models/Shop.model';

@Component({
  selector: 'app-shoplist',
  templateUrl: './shoplist.component.html',
  styleUrls: ['./shoplist.component.scss']
})
export class ShoplistComponent implements OnInit {

  url :string = "http://localhost:59006/api/shop/getall";
  
  listeShop : APISHOP = new APISHOP();
  sub : Subscription;
  constructor(private _service : ApiService, private _dialog : NbDialogService, private _router : Router) { }

  ngOnInit(): void {
      console.log(this.listeShop);

        this._service.getallshop(this.url).subscribe(data => this.listeShop = data);
        console.log(this.listeShop);
        setTimeout(() => {console.log(this.listeShop);}, 500);

    // this.sub = this._service.shopSubject.subscribe((data : Shop[]) => this.listeShop = data);
    // this._service.getAll();
    // console.log('Avant');
    // console.log(this.listeShop);
    // console.log('Après');
    // setTimeout(() => {console.log(this.listeShop);}, 500);

  }

  // delete(id : number, nom : string) {
  //   let ref = this._dialog.open(ConfirmboxComponent, {
  //     context : {
  //       name : nom
  //     },
  //     closeOnBackdropClick : false
  //   });

}
