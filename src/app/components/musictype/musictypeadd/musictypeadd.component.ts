import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MusicTypeService } from 'src/app/services/music-type.service';
import { APIMUSICTYPE, MusicType } from 'src/app/Models/musictype.model';
import { Router } from '@angular/router';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-musictypeadd',
  templateUrl: './musictypeadd.component.html',
  styleUrls: ['./musictypeadd.component.scss']
})
export class MusictypeaddComponent implements OnInit {

  fg : FormGroup;
  admin : boolean;
  spinner = true;

  constructor(private _builder : FormBuilder, private _service : MusicTypeService, private _rout : Router) { }

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.fg = this._builder.group({
      name   : ['', Validators.required],
    });   
    this.spinner = false;
  }
    onSubmit() {
      const c = new MusicType();
      c.name =  this.fg.value['name'];
      this._service.save(c);
      this._rout.navigate(['/MusicTypeList'])
    }
  
    back2list() {
      this._rout.navigate(['/MusicTypeList'])
    }
   
}
