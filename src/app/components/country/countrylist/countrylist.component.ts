import { Component, OnInit } from '@angular/core';
import { APICTRY } from 'src/app/Models/country.model';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { CountryService } from 'src/app/services/country.service';
import { ConfirmboxComponent } from 'src/app/shared/confirmbox/confirmbox.component';
import { Subscription } from 'rxjs';
import {CheckAdmin} from '../../../shared/CheckAdmin'

@Component({
  selector: 'app-countrylist',
  templateUrl: './countrylist.component.html',
  styleUrls: ['./countrylist.component.scss']
})
export class CountrylistComponent implements OnInit {

  admin : boolean;
  sub : Subscription;
  lstCtry : APICTRY = new APICTRY();
  spinner = true;

  constructor(private _service : CountryService, private _dialog : NbDialogService, private _router : Router) {}

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.sub = this._service.ctryListSubject.subscribe(data => {this.lstCtry = data; this.spinner = false;});
    this._service.getall();
  }

  delete(ctry : string, nom : string) {
    this._service.Count(ctry).then(scnt => {
      //console.log("CeQueJeRecup" + scnt);
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
          this._service.delete(ctry);
        }
      });
    }).catch(error => {
      console.log("Erreur detecté!");
      
    });
  }

  goDetail(ctry : string)
  {
    this._router.navigate(['/CountryDet', ctry]);
  }

  update(ctry : string) {
    this._router.navigate(['/CountryUpd', ctry]);
  }

  add() {
    this._router.navigate(['/CountryAdd']);
  }

}
