import { Component, OnInit, PipeTransform } from '@angular/core';
import { Shop, APISHOP } from 'src/app/Models/Shop.model';
import { ActivatedRoute,Router } from '@angular/router';

import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { NbDialogService } from '@nebular/theme';
import { ConfirmboxComponent } from 'src/app/shared/confirmbox/confirmbox.component';
import { ShopService } from 'src/app/services/shop.service';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-shopdet',
  templateUrl: './shopdet.component.html',
  styleUrls: ['./shopdet.component.scss']
})
export class ShopdetComponent implements OnInit {

  admin :boolean;
  model : APISHOP = new APISHOP();
  CKclosed: boolean;
  CKStatus: string;
  spinner = true;
  safeURL : SafeResourceUrl;

  constructor(private _router : ActivatedRoute, private _rout : Router, private _sanit : DomSanitizer,
    private _dialog : NbDialogService,
    private _service : ShopService
    ) { }

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.model = this._router.snapshot.data['model'];
    this.toggle(this.model.results[0].closed);
    this.spinner = false;
    this.safeURL = this.transform(this.model.results[0].localisationURL);
  }

  toggle(checked: boolean) {
    this.CKclosed = checked;

    if (this.CKclosed) this.CKStatus = "danger";
    else this.CKStatus = "success";
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
        if(data) 
        {
          this._service.delete(id);
          this._rout.navigate(['/ShopList'])
        }
      });
      this.spinner = false;
    }).catch(error => {
      console.log("Erreur detecté! (DELETE SHOP LIST)");
    });
  }

  update(id : number) {
    this._rout.navigate(['/ShopUpd', id]);
  }
  
  back2list() {
  this._rout.navigate(['/ShopList'])
  }

  transform(url) {
    return this._sanit.bypassSecurityTrustResourceUrl(url);
  }

}
