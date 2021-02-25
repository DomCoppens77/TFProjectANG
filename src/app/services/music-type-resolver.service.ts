import { Injectable } from '@angular/core';
import { APIMUSICTYPE } from 'src/app/Models/musictype.model';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MusicTypeService } from './music-type.service';

@Injectable({
  providedIn: 'root'
})
export class MusicTypeResolverService implements Resolve<APIMUSICTYPE> {

  constructor( private _service : MusicTypeService) { }

  resolve(route : ActivatedRouteSnapshot) : Observable<APIMUSICTYPE> {
    return this._service.getOne(route.params['id']);
  }
}
