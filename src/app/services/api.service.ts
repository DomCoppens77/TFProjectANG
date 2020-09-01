import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APISHOP } from '../Models/Shop.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private _client : HttpClient) { }
  
  // should be a global variable assign at login
  t : string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InplY29vcEBnbWFpbC5jb20iLCJyb2xlIjoiMCIsIm5hbWVpZCI6IjEiLCJuYmYiOjE1OTg5NjU3MzEsImV4cCI6MTU5ODk3MjkzMSwiaWF0IjoxNTk4OTY1NzMxfQ.D7BTNLrz_uQ2SgffdNGmpuIpcXZyfwDQF6RlUZcgSxw";
  // check if time is running out
  // renew 
  // reafact variable

  headers_options = {
    headers: new HttpHeaders().set("Authorization", "Bearer " + this.t)
 };

  getallshop(url : string) : Observable<APISHOP>{
    //return this._client.get<APISHOP>(url,this.headers_object);
    return this._client.get<APISHOP>(url, this.headers_options);


    // get(url: string, options: { headers?: HttpHeaders | { [header: string]: string | string[]; }; 
    // observe: "events"; params?: HttpParams | { [param: string]: string | string[]; }; 
    // reportProgress?: boolean; responseType?: "json"; withCredentials?: boolean; })


  }
}
