import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { APICTRY, Country , APICTRYCNT} from '../Models/country.model';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './User.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  url = environment.APIURL + "/country";

  ctryList : APICTRY = null ;
  ctryListSubject : Subject<APICTRY> = new Subject<APICTRY>();

  constructor(
    private _client : HttpClient,
    private _router : Router,
    private _service : UserService) { }

    emitCountry(){
      this.ctryListSubject.next(this.ctryList);
    }

    getall(){
      this._client.get<APICTRY>(this.url +"/getall" , this._service.getHeader()).subscribe({
        next : (data : APICTRY) => {
            this.ctryList = data;
            this.emitCountry();
        }
      });
    }

    getOne(ctry : string) : Observable<APICTRY>{
      return this._client.get<APICTRY>(this.url +"/get/"+ ctry , this._service.getHeader());
    }

    save(c : Country){
      this._client.post<Country>(this.url + "/add/", c,this._service.getHeader()).subscribe({
        next : () => this.getall(),
        error : error => console.log(error)
      });
    }

    update(c : Country) {
      this._client.put<Country>(this.url+"/upd", c, this._service.getHeader()).subscribe({
        next : () => this.getall(),
        error : error => console.log(error)
      });
    }

    delete(ctry: string) {
      this._client.delete<number>(this.url+"/del/" + ctry, this._service.getHeader()).subscribe({
        next : () => this.getall(),
        error : error => console.log(error)
      });
    }

    /*
  getall() : Observable<APICTRY>{
    return this._client.get<APICTRY>(this.url +"/getall" , this._service.getHeader());
  }

  getOne(ctry : string) : Observable<APICTRY> {
    return this._client.get<APICTRY>(this.url+"/get/"+ ctry , this._service.getHeader());
  }


  save(c : Country){
    this._client.post<Country>(this.url + "/add/", c,this._service.getHeader()).subscribe({
      next : () => this._router.navigate(['/CountryList']),
      error : error => console.log(error)
    });
  }

  update(c : Country) {
    this._client.put<Country>(this.url+"/upd/"+ c.iso, c, this._service.getHeader()).subscribe({
      next : () => {
        this.getall();
        this._router.navigate(['/CountryList']);
      }
    });
  }

  delete(ctry: string) {
    this._client.delete<number>(this.url+"/del/" + ctry, this._service.getHeader()).subscribe({
      next : () => {
        this._router.navigate(['/CountryList']);
      },
      error : error => console.log(error)
    });
  }
*/

  Count(ctry:string) : Promise<number> {
    let counter : number = 0;

    return new Promise((resolve, reject) => {

      this._client.get<APICTRYCNT>(this.url+"/used/"+ctry, this._service.getHeader()).subscribe({
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
