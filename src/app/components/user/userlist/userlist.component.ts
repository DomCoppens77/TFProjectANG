import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { User2Service } from 'src/app/services/user2.service';
import { APIUSER } from 'src/app/Models/User.full2.model';
import { ConfirmboxComponent } from 'src/app/shared/confirmbox/confirmbox.component';
import { Subscription } from 'rxjs';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  sub : Subscription;
  listeUsers : APIUSER = new APIUSER();
  admin : boolean;
  spinner = true;

  constructor(private _service : User2Service, private _dialog : NbDialogService, private _router : Router) { }

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.sub = this._service.userSubject.subscribe(data => {this.listeUsers = data; this.spinner = false;});
    this._service.getAll();
  }

  delete(id : number, nom : string) {
    this.spinner = true;

      let ref = this._dialog.open(ConfirmboxComponent, {
        context : {
          name : nom,
          count : 0,
        },
        closeOnBackdropClick : false
      });
      ref.onClose.subscribe(data => {
        if(data) {this._service.delete(id);}
        });
      
      this.spinner = false;
  }

  reactpopup(id : number, nom : string) {
    this.spinner = true;

      let ref = this._dialog.open(ConfirmboxComponent, {
        context : {
          name : nom,
          count : -2,
        },
        closeOnBackdropClick : false
      });
      ref.onClose.subscribe(data => {
        if(data) {this._service.reactivate(id);}
        });
      
      this.spinner = false;
  }

  update(id : number) {
    this._router.navigate(['/UserUpd', id]);
  }

  add() {
    this._router.navigate(['/UserAdd']);
  }

  reactivate(id : number) {
    this._service.reactivate(id);
  }

}
