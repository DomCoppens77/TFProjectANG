import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { APICURR, Currency , APICURRCNT} from '../Models/currency.model';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './User.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  url = environment.APIURL + "/currency";

  currList : APICURR = null ;
  currListSubject : Subject<APICURR> = new Subject<APICURR>();

  constructor(
    private _client : HttpClient,
    private _router : Router,
    private _service : UserService) { }

  emitCurr(){
    this.currListSubject.next(this.currList);
  }

  getAll(){
    this._client.get<APICURR>(this.url +"/getall" , this._service.getHeader()).subscribe({
      next : (data : APICURR) => {
          this.currList = data;
          this.emitCurr();
      }
    });      
  }

  getOne(curr : string) : Observable<APICURR> {
    return this._client.get<APICURR>(this.url+"/get/"+ curr , this._service.getHeader());
  }

  save(c : Currency){
    this._client.post<Currency>(this.url + "/add", c,this._service.getHeader()).subscribe({
      next : () => this.getAll(),
      error : error => console.log(error)
    });
  }
  update(c : Currency) {
    this._client.put<Currency>(this.url+"/upd", c, this._service.getHeader()).subscribe({
      next : () => this.getAll(),
      error : error => console.log(error)
    });
  }

  delete(curr: string) {
    this._client.delete<number>(this.url+"/del/" + curr, this._service.getHeader()).subscribe({
      next : () => this.getAll(),
      error : error => console.log(error)
    });
  }

  Count(curr:string) : Promise<number> {
    let counter : number = 0;

    return new Promise((resolve, reject) => {

      this._client.get<APICURRCNT>(this.url+"/used/"+curr, this._service.getHeader()).subscribe({
        next : data => {
          counter = data.results[0];
          resolve(counter);
        },
        error : error =>  {
          console.log(error)
          reject(error);
        }
      });
    })
  }

}
