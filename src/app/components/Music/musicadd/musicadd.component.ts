import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MusicService   } from 'src/app/services/music.service';
import { MusicAdd,APIBANDLST } from '../../../Models/music.model';
import { APIMUSICTYPE } from '../../../Models/musictype.model';
import { APIMUSICFRMT } from '../../../Models/musicformat.model';
import { APISHOP } from '../../../Models/Shop.model';
import { APICURR } from '../../../Models/currency.model';
import { APICTRY} from '../../../Models/country.model';
import {formatDate} from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-musicadd',
  templateUrl: './musicadd.component.html',
  styleUrls: ['./musicadd.component.scss']
})
export class MusicaddComponent implements OnInit {

  fg : FormGroup;

  constructor(private _builder : FormBuilder, private _service : MusicService, private _rout : Router) { }

  CKsigned: boolean;
  CKStatus: string;
  LstMType : APIMUSICTYPE = new APIMUSICTYPE();
  LstMFrmt : APIMUSICFRMT = new APIMUSICFRMT();
  LstShops : APISHOP      = new APISHOP();
  LstCurrs : APICURR      = new APICURR();
  LstCtrys : APICTRY      = new APICTRY();
  LstBands : APIBANDLST   = new APIBANDLST();

  currpage : number = 1;
  admin : boolean;
  ngModelDate = new Date();
  actualyear = formatDate(new Date(), 'yyyy', 'en');
  spinner = true;

  filteredOptions$: Observable<string[]>;
  inputFormControl: FormControl;

  
  ngOnInit(): void {
  
    this.admin = CheckAdmin();
    
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
      title    : ['', Validators.required],
      year      : [this.actualyear, Validators.min(1950)],
      tracks    : ['0'],
      nbCDs     : ['0'],
      nbDvds    : ['0'],
      nbLps     : ['0'],
      typeStr   : ['', Validators.required],
      formatStr : ['', Validators.required],
      serialNbr : [''],
      ctry      : [''],
      price     : ['0', Validators.min(0)],
      curr      : ['EUR', Validators.required],
      shopId    : ['',Validators.required],
      date      : [this.ngModelDate],
      signed    : [this.CKsigned,Validators.required],
      signedBy  : [''],
      ean       : [''],
      comment1  : [''],
      comment2  : ['']
    });
    this.toggle(this.CKsigned);

    this._service.listBands().subscribe(data =>{ this.LstBands = data;
  
      this.filteredOptions$ = of(this.LstBands.results);
      this.inputFormControl = new FormControl();
      this.filteredOptions$ = this.inputFormControl.valueChanges
        .pipe(startWith(''),map(filterString => this.filter(filterString)),
        );
    });

  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.LstBands.results.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  viewHandle(value: string) {
    // return value.toUpperCase();
    return value;
  }

  onSubmit() {

    const mu = new MusicAdd();                      
    mu.band      = this.inputFormControl.value                  
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
    mu.signed    = this.CKsigned;   //this.fg.value['signed'],
    mu.signedBy  = this.fg.value['signedBy'];
    mu.ean       = this.fg.value['ean'];
    mu.comment1  = this.fg.value['comment1'];
    mu.comment2  = this.fg.value['comment2'];
    mu.onwed     = true;
    mu.eaN_EXT   = "";

    if (localStorage.getItem('MusicCurrentPage') != null )
     this.currpage = Number(localStorage.getItem('MusicCurrentPage'));
    
    this._service.save(mu,this.currpage);
    this.back2list();
  }
  
  toggle(checked: boolean) {
    this.CKsigned = checked;

    if (this.CKsigned) this.CKStatus = "success";
    else this.CKStatus = "danger";
 
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
