import { Component, OnInit } from '@angular/core';
import { APICURR } from 'src/app/Models/currency.model';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { CurrencyService } from 'src/app/services/currency.service';
import { ConfirmboxComponent } from 'src/app/shared/confirmbox/confirmbox.component';
import { Subscription } from 'rxjs';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-currencylist',
  templateUrl: './currencylist.component.html',
  styleUrls: ['./currencylist.component.scss']
})
export class CurrencylistComponent implements OnInit {

  sub : Subscription;
  listeCurr : APICURR = new APICURR();
  admin : boolean;
  spinner = true;

  constructor(private _service : CurrencyService, private _dialog : NbDialogService, private _router : Router) {}

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.sub = this._service.currListSubject.subscribe(data => {this.listeCurr = data; this.spinner = false;});
    this._service.getAll();
   
    //this._service.getall().subscribe(data => {this.listeCurr = data;
    //  this.spinner = false;});

  }

  delete(curr : string, nom : string) {
    this._service.Count(curr).then(scnt => {
      let ref = this._dialog.open(ConfirmboxComponent, {
        context : {
          name : nom,
          count : scnt,
        },
        closeOnBackdropClick : false
      });
  
      ref.onClose.subscribe(data => {
        if(data) this._service.delete(curr);
      });
    }).catch(error => {
      console.log("Erreur detecté!");
    });
  }

  update(curr : string) {
    this._router.navigate(['/CurrencyUpd', curr]);
  }

  add() {
    this._router.navigate(['/CurrencyAdd']);
  }
}
