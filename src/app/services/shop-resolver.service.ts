import { Injectable } from '@angular/core';
import { APISHOP } from '../models/Shop.model';

import { ShopService } from './shop.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopResolverService implements Resolve<APISHOP> {

  constructor(private _service : ShopService) { }
  resolve(route : ActivatedRouteSnapshot) : Observable<APISHOP> {
    return this._service.getOne(route.params['id']);
  }
}
