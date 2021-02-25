import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Music, APIMUSIC, MusicAdd,APIBANDLST } from '../Models/music.model';
import { APIMUSICTYPE } from '../Models/musictype.model';
import { APIMUSICFRMT } from '../Models/musicformat.model';
import { APISHOP} from '../Models/Shop.model';
import { APICURR } from '../Models/currency.model';
import { APICTRY} from '../Models/country.model';

import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './User.service';
import { APIDISCOGS } from '../Models/discogs.model';

import { APIDEEZER} from '../Models/deezer.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  
  url = environment.APIURL + "/music";
  discogToken = environment.DISCOGSTOKEN;
  URL2USed = "";

  httpOptions : any = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*'
    })
  };

  music : APIMUSIC = null;
  musicSubject : Subject<APIMUSIC> = new Subject<APIMUSIC>();

  constructor(
    private _client : HttpClient,
    private _router : Router,
    private _service : UserService,
    ) { }

    emitMusics() {
      this.musicSubject.next(this.music);
    }

  getpage(id : number) {
    this._client.get<APIMUSIC>(this.url +"/getpage/"+id ,this._service.getHeader()).subscribe({
      next : (data : APIMUSIC) => {
          this.music = data;
          this.emitMusics();
      }
    });
  }

  getOne(id : number) : Observable<APIMUSIC> {
    return this._client.get<APIMUSIC>(this.url+"/get/"+id , this._service.getHeader());
  }

  save(m : MusicAdd, pageid : number){
    this._client.post<MusicAdd>(this.url + "/add/", m,this._service.getHeader()).subscribe({
      next : () => this.getpage(pageid),
      error : error => console.log(error)
    });
  }

  update(m : MusicAdd, pageid : number) {
    this._client.put<MusicAdd>(this.url+"/upd/"+ m.id, m, this._service.getHeader()).subscribe({
      next : () => this.getpage(pageid),
      error : error => console.log(error)
    });
  }

  delete(id: number, pageid :number) {
    this._client.delete<number>(this.url+"/del/"+id, this._service.getHeader()).subscribe({
      next : () => this.getpage(pageid),
      error : error => console.log(error)
    });
  }
  
  listBands() : Observable<APIBANDLST>{
    return this._client.get<APIBANDLST>(environment.APIURL + "/music/ListBands" , this._service.getHeader());
  }

  listMusicType() : Observable<APIMUSICTYPE>{
    return this._client.get<APIMUSICTYPE>(environment.APIURL + "/musictype/getall" , this._service.getHeader());
  }
  listMusicFormat() : Observable<APIMUSICFRMT>{
    return this._client.get<APIMUSICFRMT>(environment.APIURL + "/musicformat/getall" , this._service.getHeader());
  }
  listShops() : Observable<APISHOP>{
    return this._client.get<APISHOP>(environment.APIURL + "/shop/getall" , this._service.getHeader());
  }
  listCurrencies() : Observable<APICURR>{
    return this._client.get<APICURR>(environment.APIURL + "/currency/getall" , this._service.getHeader());
  }
  listCountries() : Observable<APICTRY>{
    return this._client.get<APICTRY>(environment.APIURL + "/country/getall" , this._service.getHeader());
  }

  findDiscogs(StrSearch : string) : Observable<APIDISCOGS>{
    this.URL2USed = "https://api.discogs.com/database/search?q={" + StrSearch + "}&token=" + this.discogToken;
    //console.log(this.URL2USed);
    return this._client.get<APIDISCOGS>(this.URL2USed);
  }

  findDeezer(StrSearch : string) : Observable<APIDEEZER>
  {
    
    this.URL2USed = "https://api.deezer.com/search?output=jsonp&callback=JSONP_CALLBACK&q=" + StrSearch;
    // this.URL2USed = "https://api.deezer.com/search?q=" + StrSearch;
    return this._client.get<APIDEEZER>(this.URL2USed);
  }

}
