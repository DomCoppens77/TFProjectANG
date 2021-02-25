import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { APIMUSICTYPE } from 'src/app/Models/musictype.model';
import { MusicTypeService } from 'src/app/services/music-type.service';
import { ConfirmboxComponent } from 'src/app/shared/confirmbox/confirmbox.component';
import { Subscription } from 'rxjs';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-musictypelist',
  templateUrl: './musictypelist.component.html',
  styleUrls: ['./musictypelist.component.scss']
})
export class MusictypelistComponent implements OnInit {

  sub : Subscription;
  listeMT : APIMUSICTYPE = new APIMUSICTYPE();
  admin : boolean;
  spinner = true;

  constructor(private _service : MusicTypeService, private _dialog : NbDialogService, private _router : Router) {}

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.sub = this._service.mtypeListSubject.subscribe(data => {this.listeMT = data; this.spinner = false;});
    this._service.getall();
  }
  
  delete(id : number, nom : string) {
    this.spinner = true;
    this._service.Count(id).then(scnt => {
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
      console.log("Erreur detecté!");
    });
  }

  update(id : number) {
    this._router.navigate(['/MusicTypeUpd', id]);
  }

  add() {
    this._router.navigate(['/MusicTypeAdd']);
  }

}
