import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurrencyService } from 'src/app/services/currency.service';
import { APICURR, Currency } from 'src/app/Models/currency.model';
import { Router } from '@angular/router';
import {CheckAdmin} from '../../../shared/CheckAdmin'

@Component({
  selector: 'app-currencyadd',
  templateUrl: './currencyadd.component.html',
  styleUrls: ['./currencyadd.component.scss']
})
export class CurrencyaddComponent implements OnInit {

  fg : FormGroup;
  admin : boolean;
  spinner = true;

  constructor(private _builder : FormBuilder, private _service : CurrencyService, private _rout : Router) { }

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.fg = this._builder.group({
      curr    : ['', Validators.required],
      desc    : [''],
    });   
    this.spinner = false;
  }
  onSubmit() {
    const c = new Currency();
    c.curr = this.fg.value['curr'];
    c.desc = this.fg.value['desc'];
    this._service.save(c);
    this._rout.navigate(['/CurrencyList'])
  }

  back2list() {
    this._rout.navigate(['/CurrencyList'])
  }

}
