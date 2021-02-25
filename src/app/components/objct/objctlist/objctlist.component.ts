import { Component, OnInit } from '@angular/core';
import { GentypeService } from 'src/app/services/gentype.service';

import { APIOBJECT } from 'src/app/Models/generaltype.model';
import { Router } from '@angular/router';
import {CheckAdmin} from '../../../shared/CheckAdmin'


@Component({
  selector: 'app-objctlist',
  templateUrl: './objctlist.component.html',
  styleUrls: ['./objctlist.component.scss']
})
export class ObjctlistComponent implements OnInit {

  constructor(private _service : GentypeService, private _router : Router) { }

  currentpage : number;
  currentSearch : string;
  searchString : string;
  maxpages = 1;
  border = 0;
  admin : boolean;
  spinner = true;
  ListeObj : APIOBJECT = new APIOBJECT();


  ngOnInit(): void {
    this.admin = CheckAdmin();
    this.currentSearch =  sessionStorage.getItem('ObjctSearchcurr');

    if (this.currentSearch == '1' || this.currentSearch == '3')
    {
        if (sessionStorage.getItem('ObjctCurrentPage') != null && sessionStorage.getItem('ObjctCurrentPage').length != 0)
        this.currentpage = Number(sessionStorage.getItem('ObjctCurrentPage'));
        else this.currentpage = 1;
        
        if (this.currentSearch == '1') this.searchString = sessionStorage.getItem('ObjctSearchDesc');
        if (this.currentSearch == '3') this.searchString = sessionStorage.getItem('ObjctSearchBand');

        this._service.searchODesc(this.currentpage,this.searchString).subscribe(data => {
            this.ListeObj = data;
            this.maxpages = this.ListeObj.results[0].maxPages;
            this.spinner = false;
            //console.log(this.ListeObj);
        });
    }
    if (this.currentSearch == '2')
    {
        if (sessionStorage.getItem('ObjctCurrentPageEAN') != null && sessionStorage.getItem('ObjctCurrentPageEAN').length != 0)
        this.currentpage = Number(sessionStorage.getItem('ObjctCurrentPageEAN'));
        else this.currentpage = 1;

        this.searchString = sessionStorage.getItem('ObjctSearchEAN');
        this._service.searchOEAN(this.currentpage,this.searchString).subscribe(data => {
            this.ListeObj = data;
            this.maxpages = this.ListeObj.results[0].maxPages;
            this.spinner = false;
            //console.log(this.ListeObj);
            
        });
    }   
  }

  goDetail(id : number, )
  {
    sessionStorage.setItem('DetFromWhere',this.currentSearch);
    this._router.navigate(['/MusicDet/'+id]);
  }

  goNext(page : number) {
    if (page <= this.ListeObj.results[0].maxPages) this.savePageAndGo(page);
  }

  goPrev(page : number) {
    if (page > 0) this.savePageAndGo(page);
  }

  goBack()
  {
    this._router.navigate(['/GenList']);
  }

  savePageAndGo(page2save : number)
  {
    if (page2save > 0 && page2save <= this.ListeObj.results[0].maxPages)
    {
      
      this.currentpage = page2save;
      this.spinner = true;
      if (this.currentSearch == '1' || this.currentSearch == '3')
      {
        sessionStorage.setItem('ObjctCurrentPage',page2save.toString());
        this._service.searchODesc(this.currentpage,this.searchString).subscribe(data => { this.ListeObj = data;
          this.spinner = false;
        });
      }
      if (this.currentSearch == '2')
      {
        sessionStorage.setItem('ObjctCurrentPageEAN',page2save.toString());
        this._service.searchOEAN(this.currentpage,this.searchString).subscribe(data => { this.ListeObj = data;
          this.spinner = false;
        });        
      }
    }
  }

}
