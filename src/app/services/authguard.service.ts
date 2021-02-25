import { Injectable } from '@angular/core';
import { UserService } from './User.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private _service : UserService, private _router : Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |Observable<boolean>  {
    this._service.CheckConnected(true);
    
    return this._service.isConnected.pipe(
      tap(r => {
        if(!r)
        {
          this._router.navigate(["/login"]).then();
        }
      })
    );

  }
}
