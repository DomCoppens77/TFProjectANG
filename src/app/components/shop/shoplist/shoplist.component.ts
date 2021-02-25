import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { APISHOP } from 'src/app/Models/Shop.model';
import { ShopService } from 'src/app/services/shop.service';
import { ConfirmboxComponent } from 'src/app/shared/confirmbox/confirmbox.component';
import { Subscription } from 'rxjs';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-shoplist',
  templateUrl: './shoplist.component.html',
  styleUrls: ['./shoplist.component.scss']
})
export class ShoplistComponent implements OnInit {
  
  sub : Subscription;
  listeShop : APISHOP = new APISHOP();
  admin : boolean;
  spinner = true;

  constructor(private _service : ShopService, private _dialog : NbDialogService, private _router : Router ) { }

  ngOnInit(): void {
    this.admin = CheckAdmin();

    this.sub = this._service.shopSubject.subscribe(data => {this.listeShop = data; this.spinner = false;});
    this._service.getall();
  }



  delete(id : number, nom : string) {
    this._service.Count(id).then(scnt => {
      this.spinner = true;
      let ref = this._dialog.open(ConfirmboxComponent, {
        context : {
          name : nom,
          count : scnt,
        },
        closeOnBackdropClick : false
      });
  
      ref.onClose.subscribe(data => {
        if(data) this._service.delete(id);
      });
      this.spinner = false;
    }).catch(error => {
      console.log("Erreur detecté! (DELETE SHOP LIST)");
    });
  }

  goDetail(id : number){
    this._router.navigate(['/ShopDet', id]);
  }

  update(id : number) {
    this._router.navigate(['/ShopUpd', id]);
  }

  add() {
    this._router.navigate(['/ShopAdd']);
  }

}
