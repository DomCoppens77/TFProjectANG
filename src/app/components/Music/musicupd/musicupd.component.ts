import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MusicService   } from 'src/app/services/music.service';
import { Music,MusicAdd } from '../../../Models/music.model';
import { APIMUSIC2 } from 'src/app/Models/music.model';
import { APIMUSICTYPE } from '../../../Models/musictype.model';
import { APIMUSICFRMT } from '../../../Models/musicformat.model';
import { APISHOP } from '../../../Models/Shop.model';
import { APICURR } from '../../../Models/currency.model';
import { APICTRY} from '../../../Models/country.model';
import {formatDate} from '@angular/common';
import { format, formatDistance, parseISO } from 'date-fns';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-musicupd',
  templateUrl: './musicupd.component.html',
  styleUrls: ['./musicupd.component.scss']
})
export class MusicupdComponent implements OnInit {

  constructor(private _router : ActivatedRoute ,private _builder : FormBuilder, private _service : MusicService, private _rout : Router) { }

  fg : FormGroup;
  CKsigned: boolean;
  CKStatus: string;
  LstMType : APIMUSICTYPE = new APIMUSICTYPE();
  LstMFrmt : APIMUSICFRMT = new APIMUSICFRMT();
  LstShops : APISHOP      = new APISHOP();
  LstCurrs : APICURR      = new APICURR();
  LstCtrys : APICTRY      = new APICTRY();
  model : APIMUSIC2 = new APIMUSIC2();
  spinner = true;

  currpage : number = 1;

  admin : boolean;
  ngModelDate = new Date();
  
  actualyear = formatDate(new Date(), 'yyyy', 'en');
  
  ngOnInit(): void {
  
    this.admin = CheckAdmin();
    
    this.model = this._router.snapshot.data['model'];

    this.toggle(this.model.results[0].signed);

    // this._service.listMusicType().subscribe(data => this.LstMType = data);
    // this._service.listMusicFormat().subscribe(data => this.LstMFrmt = data);
    // this._service.listShops().subscribe(data => this.LstShops = data);
    // this._service.listCurrencies().subscribe(data => this.LstCurrs = data);
    // this._service.listCountries().subscribe(data => this.LstCtrys = data);

    this._service.listMusicType().subscribe(data => {
      this.LstMType = data;
      this._service.listMusicFormat().subscribe(data => {
        this.LstMFrmt = data;
        this._service.listShops().subscribe(data => {
          this.LstShops = data;
          this._service.listCurrencies().subscribe(data => { 
            this.LstCurrs = data;
            this._service.listCountries().subscribe(data => {
              this.LstCtrys = data;
              this.spinner = false;
            });        
          });
        });  
      });  
    });
    this.CKsigned = false;
                  
    this.fg = this._builder.group({
      band      : [this.model.results[0].band, Validators.required],
      title     : [this.model.results[0].title, Validators.required],
      year      : [this.model.results[0].year],
      tracks    : [this.model.results[0].tracks],
      nbCDs     : [this.model.results[0].nbCDs],
      nbDvds    : [this.model.results[0].nbDvds],
      nbLps     : [this.model.results[0].nbLps],
      typeStr   : [this.model.results[0].mTypeId.toString(), Validators.required],
      formatStr : [this.model.results[0].formatId.toString(), Validators.required],
      serialNbr : [this.model.results[0].serialNbr],
      ctry      : [this.model.results[0].ctry],
      price     : [this.model.results[0].price],
      curr      : [this.model.results[0].curr],
      shopId    : [this.model.results[0].shopId.toString(), Validators.required],
      date2      : [this.model.results[0].date],
      date      : [parseISO(this.model.results[0].date.toString())],
      signed    : [this.CKsigned,Validators.required],
      signedBy  : [this.model.results[0].signedBy],
      ean       : [this.model.results[0].ean],
      comment1  : [this.model.results[0].comment1],
      comment2  : [this.model.results[0].comment2]

    });
    this.toggle(this.CKsigned);  
  }

  toggle(checked: boolean) {
    this.CKsigned = checked;

    if (this.CKsigned) this.CKStatus = "success";
    else this.CKStatus = "danger";
 
  }

  onSubmit() {

    const mu = new MusicAdd();                      
    mu.id        = this.model.results[0].id;
    mu.band      = this.fg.value['band'];                            
    mu.title     = this.fg.value['title'];
    mu.year      = Number(this.fg.value['year']);
    mu.tracks    = this.fg.value['tracks'];
    mu.nbCDs     = Number(this.fg.value['nbCDs']);
    mu.nbDvds    = Number(this.fg.value['nbDvds']);
    mu.nbLps     = Number(this.fg.value['nbLps']);
    mu.mTypeId   = Number(this.fg.value['typeStr']);
    mu.formatId  = Number(this.fg.value['formatStr']);
    mu.serialNbr = this.fg.value['serialNbr'];
    mu.ctry      = this.fg.value['ctry'];

    mu.price     = Number(this.fg.value['price']);
    mu.curr      = this.fg.value['curr'];
    mu.shopId    = Number(this.fg.value['shopId']);
    mu.date      = new Date(this.fg.value['date']);
    mu.signed    = this.fg.value['signed'];
    mu.signedBy  = this.fg.value['signedBy'];
    mu.ean       = this.fg.value['ean'];
    mu.comment1  = this.fg.value['comment1'];
    mu.comment2  = this.fg.value['comment2'];

    mu.onwed     = true;
    mu.eaN_EXT   = "";

    if (localStorage.getItem('MusicCurrentPage') != null )
     this.currpage = Number(localStorage.getItem('MusicCurrentPage'));
    
    this._service.update(mu,this.currpage);
    this.back2list();
  }

  back2list() {
    if (sessionStorage.getItem('DetFromWhere') == '1' || sessionStorage.getItem('DetFromWhere') == '2'
    || sessionStorage.getItem('DetFromWhere') == '3'
    )
    {
      sessionStorage.setItem('DetFromWhere','');
      this._rout.navigate(['/objctlist'])
    }
    else this._rout.navigate(['/MusicList'])
  }
}
