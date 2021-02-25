import { Component, OnInit } from '@angular/core';
import { APIGENYTP } from 'src/app/Models/generaltype.model';
import { GentypeService} from 'src/app/services/gentype.service';
import { not } from '@angular/compiler/src/output/output_ast';
import {CheckAdmin} from '../../shared/CheckAdmin'


@Component({
  selector: 'app-graph2dispmulti',
  templateUrl: './graph2dispmulti.component.html',
  styleUrls: ['./graph2dispmulti.component.scss']
})
  export class Graph2dispmultiComponent implements OnInit {

    options: any;
    listeGenYP : APIGENYTP = new APIGENYTP();
    admin : boolean;
    spinner = true;
    
    isLoading = false;
    UTYPESIDPS;
    
    constructor(private _service : GentypeService) {}
    
    ngOnInit(): void {

      const YEARS = [];
      const TYPES = [];
      const data = [];
      let UTYPES;
      let UYEARS;

      this.admin = CheckAdmin();

      this._service.getyp().then(dt => {
        this.listeGenYP = dt;

        this.listeGenYP.results.forEach(fn => {
          YEARS.push(fn.year.toString()); 
          TYPES.push('X-' + fn.typeId.toString());
          data.push(fn.price); 
          this.spinner = false;
         })
         UTYPES = [...new Set(this.listeGenYP.results.map(i => 'X-' + i.typeId))];
         UYEARS = [...new Set(this.listeGenYP.results.map(i => i.year))];
         this.UTYPESIDPS = [...new Set(this.listeGenYP.results.map(i => 'X-' + i.typeId + " : " + i.genTypeName))];
/*
          console.log(UYEARS);
          console.log(UTYPES);
          console.log(data);
*/
/*HERE-START*/


this.options = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data : UTYPES
    //data: ['X-1', 'X-2', 'X-3', 'X-4', 'X-5']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data : UYEARS
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'X-1',
      type: 'line',
      stack: 'counts',
 
      areaStyle: { normal: {} },
      data : data
      //data: [120, 132, 101, 134, 90, 230, 210]
    }
    /*
    ,
    {
      name: 'X-2',
      type: 'line',
      stack: 'counts',
      areaStyle: { normal: {} },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'X-3',
      type: 'line',
      stack: 'counts',
      areaStyle: { normal: {} },
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'X-4',
      type: 'line',
      stack: 'counts',
      areaStyle: { normal: {} },
      data: [320, 332, 301, 334, 390, 330, 320]
    },
  
    {
      name: 'X-5',
      type: 'line',
      stack: 'counts',
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },     
      areaStyle: { normal: {} },
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
*/
  ]
};

/*HERE-END*/

        }); //THEN
    }
     
     



  }
  
