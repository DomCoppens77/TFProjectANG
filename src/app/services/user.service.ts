import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { Login } from '../models/User.Login.model';
import { TokenObj } from 'src/app/Models/User.TokenObj.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  url : string = "http://localhost:59006/api/user";

  users : User[] = [];
  userSubject : Subject<User[]> = new Subject<User[]>();

  Token : TokenObj;
  TokenSubject : Subject<TokenObj> = new Subject<TokenObj>();

  constructor(
    private _client : HttpClient,
    private _router : Router
  ) { }

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  
  getAll() {
    this._client.get<User[]>(this.url+"/getall").subscribe(
      {
        next : data => {
          this.users = data;
          this.emitUsers();
        },
        error : error => console.log(error)
      }
    );
  }

  getOne(id : number) : Observable<User> {
    return this._client.get<User>(this.url+"/get/"+id);
  }

  save(c : User){
    this._client.post<User>(this.url+"/add/", c).subscribe({
      // next : () => this._router.navigate(['/liste']),
      error : error => console.log(error)
    });
  }

  delete(id: number) {
    this._client.delete<number>(this.url+"/del/"+id).subscribe({
      next : () => {
        this.getAll();
      },
      error : error => console.log(error)
    })
  }

  update(c : User) {
    this._client.put<User>(this.url+"/upd/"+c.Id, c).subscribe({
      next : () => {
        this.getAll();
        // this._router.navigate(['/liste']);
      }
    })
  }

  Login(l : Login){
    console.log("Loginserv");
    
    this._client.post<Login>(this.url+"/login/", l).subscribe(
      {
        next : data => {
          console.log(data['results']);
          this.Token = data['results'];
          console.log(this.Token.bearerJWT);
          // next : () => this._router.navigate(['/liste']),
        },
        error : error => console.log(error)
    });
  }

  // EMAILISUSED // POST
  // CHANGEPASSWD // PUT
  // RENEWTOKEN // POST

}
