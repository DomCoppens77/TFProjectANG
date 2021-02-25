import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurrxService } from 'src/app/services/currx.service';
import { APICURRX, CurrX } from 'src/app/Models/currx.model';
import { APICURR } from 'src/app/Models/currency.model';
import { Router } from '@angular/router';

import { ConfirmedValidator, ConfirmedValidatorDiff } from '../../../shared/confirmed.validator';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-currxadd',
  templateUrl: './currxadd.component.html',
  styleUrls: ['./currxadd.component.scss']
})
export class CurrxaddComponent implements OnInit {

  fg : FormGroup;
  admin : boolean;
  ngModelDateT = new Date();
  ngModelDateF = new Date();
  LstCurrs : APICURR      = new APICURR();

  constructor(private _builder : FormBuilder, private _service : CurrxService, private _rout : Router) { }

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this._service.listCurrencies().subscribe(data => this.LstCurrs = data);
    this.fg = this._builder.group({
      currF : ['EUR', Validators.required],
      currT : ['EUR', Validators.required],
      dateF : [this.ngModelDateF, Validators.required],
      dateT : [this.ngModelDateT, Validators.required],
      rate  : [1, Validators.required],
    }, { 
      validator: [ConfirmedValidatorDiff('currF', 'currT')]

    });
  }

  onSubmit() {
    const cx = new CurrX();
    cx.currFrom = this.fg.value['currF'];
    cx.currTo = this.fg.value['currT'];
    cx.dateFrom = this.fg.value['dateF'];
    cx.dateTo = this.fg.value['dateT'];
    cx.rate = this.fg.value['rate'];
    this._service.save(cx);
    this._rout.navigate(['/CurrxList']);
  }

  back2list() {
    this._rout.navigate(['/CurrxList']);
    
    }

}
