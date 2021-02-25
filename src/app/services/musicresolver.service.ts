import { Injectable, resolveForwardRef } from '@angular/core';
import { APIMUSIC } from '../models/music.model';

import { MusicService } from './music.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicResolverService implements Resolve<APIMUSIC>{

  constructor(private _service : MusicService) { }
  resolve(route : ActivatedRouteSnapshot) : Observable<APIMUSIC> {
    return this._service.getOne(route.params['id']);
  }
}
