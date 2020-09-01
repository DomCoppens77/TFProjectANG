import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Shop } from '../Models/Shop.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  url : string = "http://localhost:59006/api/shop";

  shops : Shop[] = [];
  shopSubject : Subject<Shop[]> = new Subject<Shop[]>();

  constructor(
    private _client : HttpClient,
    private _router : Router
  ) { }

  emitShops() {
    this.shopSubject.next(this.shops.slice());
  }

  getAll() {
    console.log('getallici');
    
    this._client.get<Shop[]>(this.url+"/getall").subscribe(
      {
        next : data => {
          // console.log(data['results']);
          this.shops = data['results'];
          this.emitShops();
          // console.log(this.shops);
        },
        error : error => console.log(error)
      }
    );
  }

  getOne(id : number) : Observable<Shop> {
    return this._client.get<Shop>(this.url+"/"+id);
  }

}
