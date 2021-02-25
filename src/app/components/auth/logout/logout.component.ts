import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/User.service';
import { ConfirmboxComponent } from 'src/app/shared/confirmbox/confirmbox.component';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
 
  spinner = false;
  constructor(private _service : UserService, private _route : Router, 
    private _dialog: NbDialogService ) { }

  ngOnInit(): void {
    this.spinner = true;
    let ref = this._dialog.open(ConfirmboxComponent, {
      context : {
        name : '',
        count : -1,
      },
      closeOnBackdropClick : false
    });
  
    ref.onClose.subscribe(data => {
      if(data) 
      {
        this._service.logOut();
        this._route.navigate(['/login']);
      }
      else 
      {
        this._route.navigate(['/GenList']);
      }
    });
    this.spinner = false;
  };
}


