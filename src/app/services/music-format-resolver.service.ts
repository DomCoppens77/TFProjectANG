import { Injectable } from '@angular/core';
import { APIMUSICFRMT } from 'src/app/Models/musicformat.model';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MusicFormatService } from './music-format.service';

@Injectable({
  providedIn: 'root'
})
export class MusicFormatResolverService implements Resolve<APIMUSICFRMT> {

  constructor( private _service : MusicFormatService) { }

  resolve(route : ActivatedRouteSnapshot) : Observable<APIMUSICFRMT> {
    return this._service.getOne(route.params['id']);
  }
}
