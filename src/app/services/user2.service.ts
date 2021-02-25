import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { APIUSER, User } from '../models/User.full.model';
import { UserService } from './User.service';

@Injectable({
  providedIn: 'root'
})
export class User2Service {

  url = environment.APIURL + "/user";
  users : APIUSER = null;
  userSubject = new Subject<APIUSER>();
  
  admin : boolean = false;

  headers_options = {
    headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('APITOKEN'))
  };

  constructor(private _client : HttpClient,
    private _router : Router,
    private _service : UserService) { }

    emitUsers() {
      this.userSubject.next(this.users);
    }

    getAll(){

      this._client.get<APIUSER>(this.url +"/getall" ,this._service.getHeader()).subscribe({
        next : (data : APIUSER) => {
            this.users = data;
            this.emitUsers();
            this._service.emitAvatar();
        }
      });

    }
  
    getOne(id : number) : Observable<APIUSER> {
      return this._client.get<APIUSER>(this.url+"/get/"+id , this._service.getHeader());
    }

    save(u : User){
      this._client.post<User>(this.url + "/add/", u,this._service.getHeader()).subscribe({
        next : () => this.getAll(),
        error : error => console.log(error)
      });
    }
  
    update(u : User) {
      this._client.put<User>(this.url+"/upd/"+ u.id, u, this._service.getHeader()).subscribe({
        next : () => this.getAll(),
        error : error => console.log(error)
      });
    }
    
    delete(id: number) {
      this._client.delete<number>(this.url+"/del/"+id, this._service.getHeader()).subscribe({
        next : () => this.getAll(),
        error : error => console.log(error)
      });
    }
    
    // http://localhost:59006/api/User/ReactivateUser/3

    reactivate(id: number)  {
      // Put (POST) !!! so need a BODY even empty
      this._client.put<any>(this.url+"/reactivateuser/"+id,{}, this._service.getHeader()).subscribe({
        next : () => this.getAll(),
        error : error => console.log(error)
      });
    }    

}
