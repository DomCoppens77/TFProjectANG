import {ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GentypeService} from 'src/app/services/gentype.service';
import { APIGENMOD } from 'src/app/Models/generaltype.model';
import { APIBANDLST } from 'src/app/Models/music.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {CheckAdmin} from '../../shared/CheckAdmin'

@Component({
  selector: 'app-gentypelist',
  templateUrl: './gentypelist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./gentypelist.component.scss']
})
export class GentypelistComponent implements OnInit {

  fg  : FormGroup;
  fg2 : FormGroup;
  fg3 : FormGroup;
  fg4 : FormGroup;
  listeGenT : APIGENMOD = new APIGENMOD();

  admin : boolean;
  spinner = true;
  selectedItem1 = "1";

  LstBands : APIBANDLST = new APIBANDLST();
  model    : APIBANDLST = new APIBANDLST();
  filteredOptions$: Observable<string[]>;
  inputFormControl: FormControl;

  filteredControlOptions$: Observable<string[]>;
  filteredNgModelOptions$: Observable<string[]>;

  constructor(private _service : GentypeService, private _builder : FormBuilder, private _router : Router, private _arouter : ActivatedRoute) { }

  ngOnInit(): void {
    
    this.admin = CheckAdmin();
   
    this.selectedItem1 = localStorage.getItem('GENTYPE');
    if (this.selectedItem1 == null) this.selectedItem1 = '1';
    //console.log(this.selectedItem1);
       
    // Keep it first because it's used at load
    this.fg  = this._builder.group({GenType    : [this.selectedItem1.toString(), Validators.required]});
    this.fg2 = this._builder.group({SearchDesc : [sessionStorage.getItem('ObjctSearchDesc'), Validators.required]});
    this.fg3 = this._builder.group({SearchEAN  : [sessionStorage.getItem('ObjctSearchEAN'), Validators.required]});    
    
    this._service.getall().subscribe(data => {
      this.listeGenT = data;
      this.spinner = false;
    });

    this.model = this._arouter.snapshot.data['model'];
    this.filteredOptions$ = of(this.model.results);
    this.inputFormControl = new FormControl();
    this.filteredOptions$ = this.inputFormControl.valueChanges.pipe(startWith(''),map(filterString => this.filter(filterString)));    

    this.fg4 = this._builder.group({SearchBand : ['', Validators.required]});     

    this.filteredControlOptions$ = of(this.model.results);
    this.filteredNgModelOptions$ = of(this.model.results);

    this.inputFormControl = new FormControl();
    this.filteredControlOptions$ = this.inputFormControl.valueChanges
      .pipe(startWith(''),map(filterString => this.filter(filterString)),);
    
      this.spinner = false;
  };  

  get f(){
    return this.fg.controls;
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.model.results.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  onModelChange(value: string) {
    this.filteredNgModelOptions$ = of(this.filter(value));
  }

  viewHandle(value: string) {
    // return value.toUpperCase();
    return value;
  }

  onSubmit () {
    localStorage.setItem('GENTYPE',this.fg.value['GenType'])
    if (this.fg.value['GenType'] == 1) 
    {
       this._router.navigate(['/MusicList']);
    }
    if (this.fg.value['GenType'] == 2) 
    {
    }
  }

  searchODesc(){
    if (this.fg2.value['SearchDesc'] != sessionStorage.getItem('ObjctSearchDesc'))
    sessionStorage.setItem('ObjctCurrentPage','1');
    sessionStorage.setItem('ObjctSearchcurr','1');
    sessionStorage.setItem('ObjctSearchDesc',this.replaceByPct(this.fg2.value['SearchDesc']))
    
    this._router.navigate(['/objctlist']);
  }

  replaceByPct(lstr_enter : string) : string{
    return lstr_enter.replace(" ","%");;
  }

  searchOEAN(){
    sessionStorage.setItem('ObjctCurrentPageEAN','1');
    sessionStorage.setItem('ObjctSearchcurr','2');
    sessionStorage.setItem('ObjctSearchEAN',this.fg3.value['SearchEAN'])
    this._router.navigate(['/objctlist']);
  }

  searchOBand(){
    //console.log(this.inputFormControl.value);
    
    if (this.inputFormControl.value != sessionStorage.getItem('ObjctSearchDesc'))
    sessionStorage.setItem('ObjctCurrentPage','1');
    sessionStorage.setItem('ObjctSearchcurr','3');
    sessionStorage.setItem('ObjctSearchBand',this.inputFormControl.value)
    
    this._router.navigate(['/objctlist']);
  }
}
