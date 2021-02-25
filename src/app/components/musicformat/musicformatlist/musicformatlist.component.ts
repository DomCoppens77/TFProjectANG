import { Component, OnInit } from '@angular/core';
import { APIMUSICFRMT } from 'src/app/Models/musicformat.model';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { MusicFormatService } from 'src/app/services/music-format.service';
import { ConfirmboxComponent } from 'src/app/shared/confirmbox/confirmbox.component';
import { Subscription } from 'rxjs';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-musicformatlist',
  templateUrl: './musicformatlist.component.html',
  styleUrls: ['./musicformatlist.component.scss']
})
export class MusicformatlistComponent implements OnInit {

  sub : Subscription;
  listeMF : APIMUSICFRMT = new APIMUSICFRMT();
  admin : boolean;
  spinner = true;

  constructor(private _service : MusicFormatService, private _dialog : NbDialogService, private _router : Router) {}

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.sub = this._service.MFormatListSubject.subscribe(data => {this.listeMF = data; this.spinner = false;});
    this._service.getall();
    //this._service.getall().subscribe(data => this.listeMF = data);
  }
 
  delete(id : number, nom : string) {
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
    }).catch(error => {
      console.log("Erreur detecté!");
      
    });
  }

  update(id : number) {
    this._router.navigate(['/MusicFormatUpd', id]);
  }

  add() {
    this._router.navigate(['/MusicFormatAdd']);
  }

}
