import { Component, OnInit } from '@angular/core';
import { APICURRX } from 'src/app/Models/currx.model';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { CurrxService } from 'src/app/services/currx.service';
import { ConfirmboxComponent } from 'src/app/shared/confirmbox/confirmbox.component';
import { Subscription } from 'rxjs';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-currxlist',
  templateUrl: './currxlist.component.html',
  styleUrls: ['./currxlist.component.scss']
})
export class CurrxlistComponent implements OnInit {
 
  sub : Subscription;
  listeCurrX : APICURRX = new APICURRX();
  admin : boolean;
  spinner = true;

  constructor(private _service : CurrxService, private _dialog : NbDialogService, private _router : Router) {}

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.sub = this._service.currXListSubject.subscribe(data => {this.listeCurrX = data; this.spinner = false;});
    this._service.getAll();
  }

  delete(id : number, nom : string) {
    let ref = this._dialog.open(ConfirmboxComponent, {
      context : {
        name : nom,
        count : 0,
      },
      closeOnBackdropClick : false
    });

    ref.onClose.subscribe(data => {
      if(data) this._service.delete(id);
    });
  }

  update(id : number) {
    this._router.navigate(['/CurrxUpd', id]);
  }

  add() {
    this._router.navigate(['/CurrxAdd']);
  }
}
