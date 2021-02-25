import { Component, OnInit } from '@angular/core';
import { APIMUSIC2 } from 'src/app/Models/music.model';
import { ActivatedRoute,Router } from '@angular/router';
import { MusicService} from '../../../services/music.service';
import { APIDISCOGS } from '../../../Models/discogs.model';
import { HttpHeaders } from '@angular/common/http';
import { APIDEEZER} from '../../../Models/deezer.model';
import { NbDialogService } from '@nebular/theme';
import { ConfirmboxComponent } from 'src/app/shared/confirmbox/confirmbox.component';
import {CheckAdmin} from '../../../shared/CheckAdmin'



@Component({
  selector: 'app-musicdet',
  templateUrl: './musicdet.component.html',
  styleUrls: ['./musicdet.component.scss']
})
export class MusicdetComponent implements OnInit {
  
  admin :boolean;
  spinner = true;
  model : APIMUSIC2 = new APIMUSIC2();
  discogsM : APIDISCOGS = new APIDISCOGS();
  deezerM  : APIDEEZER = new APIDEEZER();

  deezerURI = "https://connect.deezer.com/oauth/auth.php?app_id=435322&redirect_uri=http://localhost:4200&perms=basic_access,email";
  
  currentPage = 1;

  constructor(private _router : ActivatedRoute, private _rout : Router,
    private _service : MusicService, private _dialog : NbDialogService) { }

  ngOnInit(): void {
    this.admin = CheckAdmin();
    
    this.model = this._router.snapshot.data['model'];
    this.discogsM = null;
    this.deezerM = null;

    this._service.findDiscogs(this.model.results[0].band + ' ' + this.model.results[0].title.split('(')[0] + ' ' + this.model.results[0].serialNbr)
    .subscribe(data => { 
      this.discogsM = data;
     
      if (this.discogsM.results == null || this.discogsM.results[0] == null)
       {
         //console.log(2);
         //console.log(this.model.results[0].band + ' ' + this.model.results[0].title.split('(')[0]);
         //console.log(this.model.results[0].band + ' ' + this.model.results[0].title.split('(')[0] + ' ' + this.model.results[0].serialNbr);
         
         this._service.findDiscogs(this.model.results[0].band + ' ' + this.model.results[0].title.split('(')[0]).subscribe(
           data => {
              this.discogsM = data;
              this.spinner = false;
         });
        }
      this.spinner = false;
    });

/*
    this._service.findDeezer(this.model.results[0].title.split('(')[0] + ' ' + this.model.results[0].band).subscribe(
      data => {
      this.deezerM = data;

      console.log(this.deezerM);
      
    });
  */  
  }

  update(id : number)
  {
    this._rout.navigate(['/MusicUpd', id]);
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
      if(data) {

        if (sessionStorage.getItem('DetFromWhere') == '1' || sessionStorage.getItem('DetFromWhere') == '2'
        || sessionStorage.getItem('DetFromWhere') == '3')
        {
          this.currentPage = Number(sessionStorage.getItem("ObjctCurrentPage"));
        }
        else
        {
          this.currentPage = Number(localStorage.getItem("MusicCurrentPage"));
        }

        this._service.delete(id,this.currentPage);
        this.back2list();
        }
      });
}

  back2list() {
    if (sessionStorage.getItem('DetFromWhere') == '1' || sessionStorage.getItem('DetFromWhere') == '2'
    || sessionStorage.getItem('DetFromWhere') == '3')
    {
      sessionStorage.setItem('DetFromWhere','');
      this._rout.navigate(['/objctlist'])
    }
    else this._rout.navigate(['/MusicList'])
  }

}
