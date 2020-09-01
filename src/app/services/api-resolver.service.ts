import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Shop } from '../Models/Shop.model';
import { ApiService } from './api.service';
import { APISHOP } from '../Models/Shop.model';
import { ActivatedRouteSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiResolver {

  constructor(private _service : ApiService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<APISHOP> {
    return this._service.getallshop(route.url.toString());

    //getOne(route.params['id']);
  }

}
