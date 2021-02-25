import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APICURR, Currency } from 'src/app/Models/currency.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from 'src/app/services/currency.service';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-currencyupd',
  templateUrl: './currencyupd.component.html',
  styleUrls: ['./currencyupd.component.scss']
})
export class CurrencyupdComponent implements OnInit {

  fg : FormGroup;
  admin : boolean;
  model : APICURR = new APICURR();
  spinner = false;

  constructor(private _builder : FormBuilder,private _router : ActivatedRoute, private _rout : Router, private _service : CurrencyService) { }

  ngOnInit(): void {

    this.admin = CheckAdmin();
    this.model = this._router.snapshot.data['model'];

    this.fg = this._builder.group({
      desc    : [this.model.results[0].desc, Validators.required],
    });  
      this.spinner = false;
  }

  onSubmit()  {
    const c = new Currency();
    c.curr =   this.model.results[0].curr;
    c.desc =  this.fg.value['desc'];
    this._service.update(c);
    this._rout.navigate(['/CurrencyList'])
  }

  back2list() {
    this._rout.navigate(['/CurrencyList'])
  }

}
