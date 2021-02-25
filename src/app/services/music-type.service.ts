import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { APIMUSICTYPE, MusicType , APICAPIMUSICTYPECNT} from '../Models/musictype.model';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './User.service';

@Injectable({
  providedIn: 'root'
})
export class MusicTypeService {

  url = environment.APIURL + "/MusicType";
  mtypeList : APIMUSICTYPE = null ;
  mtypeListSubject : Subject<APIMUSICTYPE> = new Subject<APIMUSICTYPE>();

  constructor(
    private _client : HttpClient,
    private _router : Router,
    private _service : UserService,
    ) { }

 emitMtype() {
   this.mtypeListSubject.next(this.mtypeList);
  }

  getall(){
    this._client.get<APIMUSICTYPE>(this.url +"/getall" , this._service.getHeader()).subscribe({
      next : (data : APIMUSICTYPE) => {
          this.mtypeList = data;
          this.emitMtype();
      }
    });
  }

  getOne(id : number) : Observable<APIMUSICTYPE> {
    return this._client.get<APIMUSICTYPE>(this.url+"/get/"+ id , this._service.getHeader());
  }

  save(mt : MusicType){
    this._client.post<MusicType>(this.url + "/add/", mt,this._service.getHeader()).subscribe({
      next : () => this.getall(),
      error : error => console.log(error)
    });
  }

  update(mt : MusicType) {
    this._client.put<MusicType>(this.url+"/upd/"+ mt.id, mt, this._service.getHeader()).subscribe({
      next : () => this.getall(),
      error : error => console.log(error)
    });
  }

  delete(id: number) {
    this._client.delete<number>(this.url+"/del/" + id, this._service.getHeader()).subscribe({
      next : () => this.getall(),
      error : error => console.log(error)
    });
  }


/*
  getall() : Observable<APIMUSICTYPE>{
    return this._client.get<APIMUSICTYPE>(this.url +"/getall" , this._service.getHeader());
  }




  save(mt : MusicType){
    this._client.post<MusicType>(this.url + "/add/", mt,this._service.getHeader()).subscribe({
      next : () => this._router.navigate(['/MusicTypeList']),
      error : error => console.log(error)
    });
  }

  update(mt : MusicType) {
    this._client.put<MusicType>(this.url+"/upd/"+ mt.id, mt, this._service.getHeader()).subscribe({
      next : () => {
        this.getall();
        this._router.navigate(['/MusicTypeList']);
      }
    });
  }

  delete(id: number) {
    this._client.delete<number>(this.url+"/del/" + id, this._service.getHeader()).subscribe({
      next : () => {
        this._router.navigate(['/MusicTypeList']);
      },
      error : error => console.log(error)
    });
  }
*/

  Count(id: number) : Promise<number> {
    let counter : number = 0;

    return new Promise((resolve, reject) => {
      this._client.get<APICAPIMUSICTYPECNT>(this.url+"/used/"+id, this._service.getHeader()).subscribe({
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
