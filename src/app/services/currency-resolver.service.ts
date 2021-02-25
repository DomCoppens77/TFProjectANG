import { Injectable } from '@angular/core';
import { APICURR } from 'src/app/Models/currency.model';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrencyService } from './currency.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyResolverService implements Resolve<APICURR> {

    constructor( private _service : CurrencyService) { }
  
    resolve(route : ActivatedRouteSnapshot) : Observable<APICURR> {
      return this._service.getOne(route.params['curr']);
    }
}
