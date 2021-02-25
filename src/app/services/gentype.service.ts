import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { APIGENMOD, APIGENYTP, APIOBJECT } from '../Models/generaltype.model';
import { APIBANDLST } from '../Models/music.model';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './User.service';

@Injectable({
  providedIn: 'root'
})
export class GentypeService {

  url = environment.APIURL + "/GeneralType";

  constructor(
    private _client : HttpClient,
    private _router : Router, 
    private _service : UserService) { }

  getall() : Observable<APIGENMOD>{
    return this._client.get<APIGENMOD>(this.url +"/getall" , this._service.getHeader());
  }
  
  getyp() : Promise<APIGENYTP> {
    return new Promise((resolve, reject) => {
      return this._client.get<APIGENYTP>(this.url +"/GetYP" , this._service.getHeader()).subscribe({
        next : data => { resolve(data); },
        error : error => { reject(error); } });
    });
  }

  searchODesc(page : number, search : string) : Observable<APIOBJECT>{
    // http://localhost:59006/api/GeneralType/SearchODesc?page=1&search=biohaza
    return this._client.get<APIOBJECT>(this.url +"/SearchODesc?page=" + page + "&search=" + search , this._service.getHeader());
  }

  searchOEAN(page : number, search : string) : Observable<APIOBJECT>{
    return this._client.get<APIOBJECT>(this.url +"/SearchOEAN?page=" + page + "&search=" + search , this._service.getHeader());
  }
  
  listBands() : Observable<APIBANDLST>{
    return this._client.get<APIBANDLST>(environment.APIURL + "/music/ListBands" , this._service.getHeader());
  }

}
