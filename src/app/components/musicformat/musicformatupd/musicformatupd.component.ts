import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIMUSICFRMT, MusicFormat } from 'src/app/Models/musicformat.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicFormatService } from 'src/app/services/music-format.service';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-musicformatupd',
  templateUrl: './musicformatupd.component.html',
  styleUrls: ['./musicformatupd.component.scss']
})
export class MusicformatupdComponent implements OnInit {

  fg : FormGroup;
  admin : boolean;
  model : APIMUSICFRMT = new APIMUSICFRMT();

  constructor(private _builder : FormBuilder,private _router : ActivatedRoute, private _rout : Router, private _service : MusicFormatService) { }

  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.model = this._router.snapshot.data['model'];
    this.fg = this._builder.group({
      name    : [this.model.results[0].name, Validators.required],
    });  
    
  }
  
  onSubmit()  {
    const c = new MusicFormat();
    c.id = this.model.results[0].id;
    c.name =   this.fg.value['name'];
    this._service.update(c);
    this._rout.navigate(['/MusicFormatList'])
  }

  back2list() {
    this._rout.navigate(['/MusicFormatList'])
  }


}
