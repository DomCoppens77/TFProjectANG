import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MusicFormatService } from 'src/app/services/music-format.service';
import { APIMUSICFRMT, MusicFormat } from 'src/app/Models/musicformat.model';
import { Router } from '@angular/router';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-musicformatadd',
  templateUrl: './musicformatadd.component.html',
  styleUrls: ['./musicformatadd.component.scss']
})
export class MusicformataddComponent implements OnInit {

  fg : FormGroup;
  admin : boolean;
  spinner : false;

  constructor(private _builder : FormBuilder, private _service : MusicFormatService, private _rout : Router) { }

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.fg = this._builder.group({
      name   : ['', Validators.required],
    });   
  }
    onSubmit() {
      const c = new MusicFormat();
      c.name =  this.fg.value['name'];
      this._service.save(c);
      this._rout.navigate(['/MusicFormatList'])
    }
  
    back2list() {
      this._rout.navigate(['/MusicFormatList'])
    }

}
