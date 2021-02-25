import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APICTRY } from 'src/app/Models/country.model';
import { NbDialogService } from '@nebular/theme';
import { CountryService} from 'src/app/services/country.service';
import { ConfirmboxComponent } from 'src/app/shared/confirmbox/confirmbox.component';
import {CheckAdmin} from '../../../shared/CheckAdmin'

@Component({
  selector: 'app-countrydet',
  templateUrl: './countrydet.component.html',
  styleUrls: ['./countrydet.component.scss']
})
export class CountrydetComponent implements OnInit {

  admin : boolean;
  CKIsEU: boolean;
  CKStatus: string;
  model : APICTRY = new APICTRY();

  constructor(private _router : ActivatedRoute, private _rout : Router, private _service : CountryService, private _dialog : NbDialogService) { }

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.model = this._router.snapshot.data['model'];
    this.toggle(Boolean(this.model.results[0].isEU));
  }

  toggle(checked: boolean) {
    this.CKIsEU = checked;

    if (this.CKIsEU) this.CKStatus = "success";
    else this.CKStatus = "danger";
  }
  
  update(ctry : string) {
    this._rout.navigate(['/CountryUpd', ctry]);
  }

  delete(ctry : string, nom : string) {
    this._service.Count(ctry).then(scnt => {
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
          this._rout.navigate(['/CountryList']);
        }
      });
    }).catch(error => {
      console.log("Erreur detecté!");
      
    });
  }

  back2list() {
    this._rout.navigate(['/CountryList'])
  }
}