import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurrxService } from 'src/app/services/currx.service';
import { APICURRX, CurrX } from 'src/app/Models/currx.model';
import { APICURR } from 'src/app/Models/currency.model';
import { Router, ActivatedRoute } from '@angular/router';
import { format, formatDistance, parseISO } from 'date-fns';

import { ConfirmedValidator, ConfirmedValidatorDiff } from '../../../shared/confirmed.validator';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-currxupd',
  templateUrl: './currxupd.component.html',
  styleUrls: ['./currxupd.component.scss']
})
export class CurrxupdComponent implements OnInit {

  fg : FormGroup;
  admin : boolean;
  ngModelDateT = new Date();
  ngModelDateF = new Date();
  model : APICURRX = new APICURRX();
  LstCurrs : APICURR      = new APICURR();
  spinner = true;

  constructor(private _builder : FormBuilder,private _router : ActivatedRoute, private _rout : Router, private _service : CurrxService)
   { }

  ngOnInit(): void {
    this.admin = CheckAdmin();

    this._service.listCurrencies().subscribe(data => { this.LstCurrs = data;
      this.spinner = false;
    });

    this.model = this._router.snapshot.data['model'];
    this.fg = this._builder.group({
      currF : [this.model.results[0].currFrom, Validators.required],
      currT : [this.model.results[0].currTo, Validators.required],
      dateF : [parseISO(this.model.results[0].dateFrom.toString()), Validators.required],
      dateT : [parseISO(this.model.results[0].dateTo.toString()), Validators.required],
      rate  : [this.model.results[0].rate, Validators.required],
    }, { 
      validator: [ConfirmedValidatorDiff('currF', 'currT')]
    });
  }

  onSubmit() {
    const cx = new CurrX();
    cx.id = this.model.results[0].id;
    cx.currFrom = this.fg.value['currF'];
    cx.currTo = this.fg.value['currT'];
    cx.dateFrom = this.fg.value['dateF'];
    cx.dateTo = this.fg.value['dateT'];
    cx.rate = Number(this.fg.value['rate']);
    this._service.update(cx);
    this._rout.navigate(['/CurrxList']);
  }

  back2list() {
    this._rout.navigate(['/CurrxList']);
    }

}
