import { Injectable } from '@angular/core';
import { APICTRY } from 'src/app/Models/country.model';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CountryService } from './country.service';

@Injectable({
  providedIn: 'root'
})
export class CountryResolverService implements Resolve<APICTRY> {

  constructor( private _service : CountryService) { }

  resolve(route : ActivatedRouteSnapshot) : Observable<APICTRY> {
    return this._service.getOne(route.params['ctry']);
  }
}
