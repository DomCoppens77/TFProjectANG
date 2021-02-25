import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { APICURRX, CurrX,APICURRXCNT} from '../Models/currx.model';
import { APICURR } from '../Models/currency.model';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './User.service';


@Injectable({
  providedIn: 'root'
})
export class CurrxService {

  url = environment.APIURL + "/CurrXChg";
  
  currXList : APICURRX = null ;
  currXListSubject : Subject<APICURRX> = new Subject<APICURRX>();  

  constructor(
    private _client : HttpClient,
    private _router : Router, 
    private _service : UserService) { }

  emitCurrX(){
    this.currXListSubject.next(this.currXList);
  }

  getAll(){
    return this._client.get<APICURRX>(this.url +"/getall" , this._service.getHeader()).subscribe({
      next : (data : APICURRX) => {
          this.currXList = data;
          this.emitCurrX();
      }
    });      
  }

  getOne(id : number) : Observable<APICURRX> {
    return this._client.get<APICURRX>(this.url+"/get/"+ id , this._service.getHeader());
  }

  save(cx : CurrX){
    this._client.post<CurrX>(this.url + "/add/", cx,this._service.getHeader()).subscribe({
      next : () => this._router.navigate(['/CurrxList']),
      error : error => console.log(error)
    });
  }

  update(cx : CurrX) {
    this._client.put<CurrX>(this.url+"/upd/"+ cx.id, cx, this._service.getHeader()).subscribe({
      next : () => this.getAll(),
      error : error => console.log(error)
    });
  }

  delete(id: number) {
    this._client.delete<number>(this.url+"/del/" + id, this._service.getHeader()).subscribe({
      next : () => this.getAll(),
      error : error => console.log(error)
    });
  }

  ChkDateF(cx : CurrX) : Promise<number>  {
    let isinrange : number;
    return new Promise((resolve, reject) => {
      this._client.post<APICURRX>(this.url+"/ChkCurrXDtF/", this._service.getHeader()).subscribe({
        next : data => {
          //console.log('EnVrai' + data.results[0]);
          resolve(isinrange);
        },
        error : error =>  {
          console.log(error)
          reject(error);
        }
      });
    })
  }

  ChkDateT(cx : CurrX) : Promise<number> {
    let counter : number = 0;
    return new Promise((resolve, reject) => {
      this._client.post<APICURRXCNT>(this.url+"/ChkCurrXDtT/", this._service.getHeader()).subscribe({
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

  ChkDateOverlap(cx : CurrX) : boolean {

    let scnt : number = 0;
    let scnt2 : number = 0;
    let dateOk : boolean = false;

    this.ChkDateF(cx).then(scnt => {
      console.log(scnt)
    });
    this.ChkDateT(cx).then(scnt2 => {
      console.log(scnt2)
    });

    if (scnt == 0 && scnt2 == 0) dateOk = true;
    console.log(dateOk);
    return dateOk ;
  }

  listCurrencies() : Observable<APICURR>{
    return this._client.get<APICURR>(environment.APIURL + "/currency/getall" , this._service.getHeader());
  }

}
