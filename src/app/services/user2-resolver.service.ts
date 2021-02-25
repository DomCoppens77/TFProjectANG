import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { APIUSER } from '../models/User.full.model';
import { User2Service } from './user2.service';

@Injectable({
  providedIn: 'root'
})

export class User2ResolverService  implements Resolve<APIUSER>   {

  constructor( private _service : User2Service  ) { }
  
  resolve(route : ActivatedRouteSnapshot) : Observable<APIUSER>{
    return this._service.getOne(route.params['id']); 
  }
}
