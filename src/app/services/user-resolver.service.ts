import { Injectable } from '@angular/core';


import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserResolverService /* implements Resolve<APIUSER> */  {

  constructor(/* private _service : UserService */ ) { }
/*  
  resolve(route : ActivatedRouteSnapshot) : Observable<APIUSER>{
    return this._service.getOne(route.params['id']); 
  }
*/

}