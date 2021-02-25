import { Injectable } from '@angular/core';
import { APICURRX } from 'src/app/Models/currx.model';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrxService } from './currx.service';

@Injectable({
  providedIn: 'root'
})
export class CurrxResolverService implements Resolve<APICURRX> {

  constructor( private _service : CurrxService) { }

  resolve(route : ActivatedRouteSnapshot) : Observable<APICURRX> {
    return this._service.getOne(route.params['id']);
  }
}

