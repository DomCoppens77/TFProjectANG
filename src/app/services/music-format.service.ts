import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { APIMUSICFRMT, MusicFormat , APIMUSICFRMTCNT} from '../Models/musicformat.model';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './User.service';


@Injectable({
  providedIn: 'root'
})
export class MusicFormatService {

  url = environment.APIURL + "/MusicFormat";

  MFormatList : APIMUSICFRMT = null ;
  MFormatListSubject : Subject<APIMUSICFRMT> = new Subject<APIMUSICFRMT>();  

  constructor(
    private _client : HttpClient,
    private _router : Router,
    private _service : UserService,
    ) { }

    emitMFormat(){
      this.MFormatListSubject.next(this.MFormatList);
    }


  getall(){
    this._client.get<APIMUSICFRMT>(this.url +"/getall" , this._service.getHeader()).subscribe({
      next : (data : APIMUSICFRMT) => {
          this.MFormatList = data;
          this.emitMFormat();
      }
    });
  }
  getOne(id : number) : Observable<APIMUSICFRMT> {
    return this._client.get<APIMUSICFRMT>(this.url+"/get/"+ id , this._service.getHeader());
  }

  save(mf : MusicFormat){
    this._client.post<MusicFormat>(this.url + "/add/", mf,this._service.getHeader()).subscribe({
      next : () => this.getall(),
      error : error => console.log(error)
    });
  }

  update(mf : MusicFormat) {
    this._client.put<MusicFormat>(this.url+"/upd/"+ mf.id, mf, this._service.getHeader()).subscribe({
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
  save(mf : MusicFormat){
    this._client.post<MusicFormat>(this.url + "/add/", mf,this._service.getHeader()).subscribe({
      next : () => this._router.navigate(['/MusicFormatList']),
      error : error => console.log(error)
    });
  }

  update(mf : MusicFormat) {
    this._client.put<MusicFormat>(this.url+"/upd/"+ mf.id, mf, this._service.getHeader()).subscribe({
      next : () => {
        this.getall();
        this._router.navigate(['/MusicFormatList']);
      }
    });
  }

  delete(id: number) {
    this._client.delete<number>(this.url+"/del/" + id, this._service.getHeader()).subscribe({
      next : () => {
        this._router.navigate(['/MusicFormatList']);
      },
      error : error => console.log(error)
    });
  }
¨*/
  Count(id: number) : Promise<number> {
    let counter : number = 0;
    return new Promise((resolve, reject) => {
      this._client.get<APIMUSICFRMTCNT>(this.url+"/used/"+id, this._service.getHeader()).subscribe({
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
