import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { APIBANDLST } from '../Models/music.model';
import { GentypeService } from './gentype.service';

APIBANDLST

@Injectable({
  providedIn: 'root'
})
export class LstbandResolverService implements Resolve<APIBANDLST> {

  constructor(private _service : GentypeService ) { }
  resolve(route : ActivatedRouteSnapshot) : Observable<APIBANDLST>{
    return this._service.listBands();
  }
}
