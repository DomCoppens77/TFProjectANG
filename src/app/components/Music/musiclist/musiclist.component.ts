import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MusicService } from 'src/app/services/music.service';
import { APIMUSIC } from 'src/app/Models/music.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { ConfirmboxComponent } from 'src/app/shared/confirmbox/confirmbox.component';
import { Subscription } from 'rxjs';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-musiclist',
  templateUrl: './musiclist.component.html',
  styleUrls: ['./musiclist.component.scss']
})
export class MusiclistComponent implements OnInit {

  sub : Subscription;
  listeMusic : APIMUSIC = new APIMUSIC();
  admin : boolean;
  page : number;
  fg : FormGroup;
  currpage = 1;
  maxpages = 1;
  border = 0;
  spinner = true;
  theme = false;
  classt = "lineGrey";
  
  constructor(private _builder : FormBuilder, private _service : MusicService, private _router : Router, private _dialog : NbDialogService) { }

  ngOnInit(): void {

    this.admin = CheckAdmin();
    //console.log("admin" + this.admin);

    if (localStorage.getItem('MusicCurrentPage') != null )
     this.currpage = Number(localStorage.getItem('MusicCurrentPage'));

     this.sub = this._service.musicSubject.subscribe(data => {this.listeMusic = data; 
      this.maxpages = this.listeMusic.results[0].maxPages;
      this.spinner = false;
     });
     this._service.getpage(this.currpage);

/*
    this._service.getpage(this.currpage).subscribe(data => { this.listeMusic = data;
      this.maxpages = this.listeMusic.results[0].maxPages;
     this.spinner = false;
    });
*/
    this.fg = this._builder.group({ page : [this.currpage, Validators.required ] });
  }

  goDetail(id : number, currp : number)
  {
    sessionStorage.setItem('DetFromWhere','');
    localStorage.setItem('MusicCurrentPage',currp.toString());
    this._router.navigate(['/MusicDet/'+id]);
  }

  goNext(page : number) {
    this.fg.value['page'] = page;
    if (page <= this.listeMusic.results[0].maxPages) this.savePageAndGo(page);
  }

  goPrev(page : number) {
    this.fg.value['page'] = page;
    if (page > 0) this.savePageAndGo(page);
  }

  go2page()
  {
    let page2go = Number(this.fg.value['page']);
    if (page2go > 0 && page2go <= this.listeMusic.results[0].maxPages)  this.savePageAndGo(page2go);
  }

  goBack()
  {
    this._router.navigate(['/GenList']);
  }

  add(currp : number) {
    this._router.navigate(['/MusicAdd']);
  }

  update(id : number)
  {
    this._router.navigate(['/MusicUpd', id]);
  }

  delete(id : number, nom : string) {
      let ref = this._dialog.open(ConfirmboxComponent, {
        context : {
          name : nom,
          count : 0
        },
        closeOnBackdropClick : false
      });
  
      ref.onClose.subscribe(data => {
        if(data) this._service.delete(id,this.currpage);
        });
  }

  savePageAndGo(page2save : number)
  {
    if (page2save > 0 && page2save <= this.listeMusic.results[0].maxPages)
    {
      localStorage.setItem('MusicCurrentPage',page2save.toString());
      this.currpage = page2save;
      this._service.getpage(this.currpage);
/*
      this.spinner = true;
      this._service.getpage(page2save).subscribe(data => { this.listeMusic = data;
      this.spinner = false;
      
      });
*/      
    }
  }

}
