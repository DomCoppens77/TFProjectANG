import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIMUSICTYPE, MusicType } from 'src/app/Models/musictype.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicTypeService } from 'src/app/services/music-type.service';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-musictypeupd',
  templateUrl: './musictypeupd.component.html',
  styleUrls: ['./musictypeupd.component.scss']
})
export class MusictypeupdComponent implements OnInit {

  fg : FormGroup;
  admin : boolean;
  model : APIMUSICTYPE = new APIMUSICTYPE();
  spinner = true;

  constructor(private _builder : FormBuilder,private _router : ActivatedRoute, private _rout : Router, private _service : MusicTypeService) { }

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.model = this._router.snapshot.data['model'];
    this.fg = this._builder.group({
      name    : [this.model.results[0].name, Validators.required],
    });  
    this.spinner = false;
    
  }
  
  onSubmit()  {
    const c = new MusicType();
    c.id = this.model.results[0].id;
    c.name =   this.fg.value['name'];
    this._service.update(c);
    this._rout.navigate(['/MusicTypeList'])
  }

  back2list() {
    this._rout.navigate(['/MusicTypeList'])
  }

}
