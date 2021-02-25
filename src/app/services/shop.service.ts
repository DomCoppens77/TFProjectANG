import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Shop, APISHOP, APISHOPCNT } from '../Models/Shop.model';
import { APICTRY  } from '../Models/country.model';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './User.service';


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  url = environment.APIURL + "/shop";

  shops : APISHOP = null;
  shopSubject : Subject<APISHOP> = new Subject<APISHOP>();

  constructor(
    private _client : HttpClient,
    private _router : Router,
    private _service : UserService,
  ) 
  {}

  /* Affect Header to latest TOKEN*/
  emitShops() {
    this.shopSubject.next(this.shops);
  }
  getall() {
    this._client.get<APISHOP>(this.url +"/getall" ,this._service.getHeader()).subscribe({
      next : (data : APISHOP) => {
          this.shops = data;
          this.emitShops();
      }
    });
  }

  /*
  getall() : Observable<APISHOP>{
    return this._client.get<APISHOP>(this.url +"/getall" ,this._service.getHeader());
  }
  */

  getOne(id : number) : Observable<APISHOP> {
    return this._client.get<APISHOP>(this.url+"/get/"+id , this._service.getHeader());
  }

  save(s : Shop){
    this._client.post<Shop>(this.url + "/add/", s,this._service.getHeader()).subscribe({
      next : () => this.getall(),
      error : error => console.log(error)
    });
  }

  update(s : Shop) {
    this._client.put<Shop>(this.url+"/upd/"+ s.id, s, this._service.getHeader()).subscribe({
      next : () => this.getall(),
      error : error => console.log(error)
    });
  }
  
  delete(id: number) {
    this._client.delete<number>(this.url+"/del/"+id, this._service.getHeader()).subscribe({
      next : () => this.getall(),
      error : error => console.log(error)
    });
  }
  

  listCountries() : Observable<APICTRY>{
    return this._client.get<APICTRY>(environment.APIURL + "/country/getall" , this._service.getHeader());
  }

  Count(id: number) : Promise<number> {
    let counter : number = 0;
    return new Promise((resolve, reject) => {
      this._client.get<APISHOPCNT>(this.url+"/used/"+id, this._service.getHeader()).subscribe({
        next : data => {
          counter = data.results[0];
          resolve(counter);
        },
        error : error =>  {
          console.log(error);
          reject(error);
        }
      });
    })
  }

}