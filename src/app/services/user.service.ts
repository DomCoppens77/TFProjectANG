import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { APIUSERBOOL } from '../models/User.bool.model';
import { Login, resetpasswd } from '../Models/User.Login.model';
import { APITOKEN } from 'src/app/Models/User.TokenObj.model';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { NbMenuItem } from '@nebular/theme';
import { APIUSER} from '../Models/User.full2.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.APIURL + "/user";

    //userSubject = new Subject<APIUSER[]>();

  connected = new BehaviorSubject<boolean>(null); 

  // menuItems = new BehaviorSubject<NbMenuItem[]>(null);
  //menuItems : NbMenuItem[];

  public items : NbMenuItem[];

  user : APIUSER = null;
  avatarSubject : Subject<APIUSER> = new Subject<APIUSER>();

  hideLinks : boolean = false;
  hideLinksadm : boolean = false;
  admin : boolean = false;
  minutes_test_token = 5;

  constructor(
    private _client : HttpClient,
    private _router : Router,
    ) {}
  
  headers_options = {
    //headers: new HttpHeaders().set("Authorization", "Bearer " + this._cookie.get("APITOKEN"))
    headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('APITOKEN'))
  };

  emitAvatar() {
    if (localStorage.getItem("APITOKEN") != null)
    {
      //this._client.get<APIUSER>(this.url+"/get/"+ localStorage.getItem("APITKID") , this.headers_options).subscribe(data => {
      this._client.get<APIUSER>(this.url+"/get/"+ JSON.parse(window.atob(localStorage.getItem("APITOKEN").split('.')[1])).nameid , this.headers_options).subscribe(data => {
        if (data !=null)
        {
        this.user = data;
        this.avatarSubject.next(this.user);
        }
      });
    }
  }

  Login(l : Login){
    this.removeLocalStore();
    return new Promise((resolve, reject) => {
      this._client.post<APITOKEN>(this.url+"/login", l).subscribe(
      {
        next :data  => {
          this.saveToken(data.results[0].bearerJWT,data.results[0].expirationDateTime,data.results[0].id);
          //localStorage.setItem('APISTA',JSON.parse(window.atob(data.results[0].bearerJWT.split('.')[1])).role);

          this.connected.next(true);
          //this.MenuChange; // remove 1010/09/25 21PM was making error (Avatar) because launch twice at login 

          resolve();
        },
        error : error =>  { reject(error);  }
      });
    });
  }

  getHeader()
  {
    this.checkTokenDate(this.minutes_test_token);
    return this.headers_options = {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('APITOKEN'))
    };
  }

  removeLocalStore()
  {
    localStorage.removeItem('APITOKEN');
    localStorage.removeItem('APITKTIME');
    // localStorage.removeItem('APITKID');
    // localStorage.removeItem('MusicCurrentPage'); ??
  }

  saveToken(token : string, datetoken: Date, id : number )
  {
    localStorage.setItem('APITOKEN',token.toString());
    localStorage.setItem('APITKTIME',datetoken.toString());
   // localStorage.setItem('APITKID',id.toString());
  }

  get MenuChange() : NbMenuItem[]
  {
    this.hideLinks = !this.connected.getValue();
    this.hideLinksadm = true;
    
    if (localStorage.getItem("APITOKEN") != null)
    {
      this.hideLinksadm = !(JSON.parse(window.atob(localStorage.getItem("APITOKEN").split('.')[1])).role === '0');
    }

    // console.log('Enter Menu Change'+ this.hideLinks + this.hideLinksadm);

    this.items = [
      { link : '/home', title : "Home", icon : 'home', home : true},
      { link : '/login', title : "Login", icon : 'book-outline', hidden : !this.hideLinks},
      { link : '/logout', title : "Log Out", icon : 'book-open-outline', hidden : this.hideLinks},
      { link : '/GenList', title : "Objects List", icon : "search-outline", hidden : this.hideLinks},
      { title : 'Graphics', icon: 'activity-outline', expanded : true,hidden : this.hideLinks , children: [
        { link : '/graph2disp', title : "Yearly Purchases", icon : "pie-chart-outline"},
        { link : '/graph2dispmulti', title : "Yearly Purchases/Cat", icon : "pie-chart-outline"},
      ]},
      { title : 'Parameters', icon: 'settings-2-outline', expanded : false, hidden : this.hideLinks , children: [
        { link : '/CountryList', title : "Countries List", icon : 'globe-outline'},
        { link : '/ShopList', title : "Shop List", icon : 'compass-outline'},
        { link : '/CurrencyList', title : "Currencies List", icon : 'home'},
        { link : '/CurrxList', title : "Currency XChange List", icon : 'calendar-outline'},
        { title : 'Music', icon: 'music-outline', expanded : false, hidden : this.hideLinks , children: [
        { link : '/MusicTypeList', title : "Music Types List", icon : 'headphones-outline'},
        { link : '/MusicFormatList', title : "Music Formats List", icon : 'speaker-outline'},
        ]},
      ]},
      { title : 'Admin Panel', icon: 'book', expanded : false, hidden : this.hideLinksadm , children: [
        { link : '/UserList', title : "Users List", icon : 'people-outline'},
      ]},
    ];

    this.emitAvatar();
    return this.items;

    /*
    this.menuItems.next(this.items);
    return this.menuItems.getValue();
    */
  }

  get isConnected() : Observable<boolean>
  {
    return this.connected;
  }

   get isConnectedNow() : boolean
   {
     return this.connected.getValue();
   }

  CheckConnected(test : boolean) : void{
      this.connected.next(this.checkTokenDate(this.minutes_test_token)); // put 110
  }

  checkTokenDate(minRest : number) : boolean
  {
    let nowDate = new Date();
    let newDate = new Date(localStorage.getItem('APITKTIME'));

    let date1 = new Date(newDate).getTime();
    let date2 = new Date(nowDate).getTime();
    let time = date1 - date2;  //msec
    let hoursDiff = time / (60 * 1000);

    //console.log('hoursdiff'+hoursDiff);

    if ((hoursDiff - minRest) > 0) 
    {
      if ((hoursDiff - minRest) < 5) 
      {
        this.renewToken();
        return true;
      }
      else return true;
    }
    else
    {
      this.logOut();
      return false;
    }
  }

  // CHANGEPASSWD // PUT
    
  resetPasswd(rpw : resetpasswd)
  {
    // this._client.put<User>(this.url+"/resetpasswd/", rpw).subscribe({
    //   next : () => {
    //     this._router.navigate(['/login']);
    //   }
    // });

    return new Promise((resolve, reject) => {
      this._client.put<APIUSERBOOL>(this.url+"/resetpasswd/", rpw).subscribe(
        {
          next : data  => {
            resolve(data.results.valueOf());
          },
          error : error =>  {
            reject(error);
          }
        });
      });
  }

  renewToken()
  {
    //console.log("renewvraiment");
    
    // dont call the method but call (to avoid infnite loop)
    this._client.get<APITOKEN>(this.url+"/RenewToken",this.headers_options).subscribe(
      {
        next :data  => {
          this.saveToken(data.results[0].bearerJWT,data.results[0].expirationDateTime,data.results[0].id);
      //    console.log("newtoken GEN");
      //    console.log((new Date(new Date(localStorage.getItem('APITKTIME'))).getTime() - new Date(new Date()).getTime()) / (60 * 1000) );
        },
        error : error => { 
          console.log(error)
          this.logOut();
        }
    });
  }

  logOut()
  {
    this.connected.next(false);
    this.removeLocalStore();
    sessionStorage.clear();

    //this.user = null;
    //this.avatarSubject.next(this.user);

    this.MenuChange;
  }
}