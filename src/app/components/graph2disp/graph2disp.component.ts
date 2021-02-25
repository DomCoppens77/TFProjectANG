import { Component, OnInit } from '@angular/core';
import { graphic } from 'echarts';
import { APIGENYTP } from 'src/app/Models/generaltype.model';
import { GentypeService} from 'src/app/services/gentype.service';
import {CheckAdmin} from '../../shared/CheckAdmin'


@Component({
  selector: 'app-graph2disp',
  templateUrl: './graph2disp.component.html',
  styleUrls: ['./graph2disp.component.scss']
})
export class Graph2dispComponent implements OnInit {

  options: any;
  listeGenYP : APIGENYTP = new APIGENYTP();
  admin : boolean;
  spinner = true;

  constructor(private _service : GentypeService) {}

  ngOnInit(): void {

    const dataShadow = [];
    const dataAxis = [] ;
    const data = [];

    this.admin = CheckAdmin();
    this._service.getyp().then(dt => {
      //console.log(dt);
      this.listeGenYP = dt;
      
      const yMax = Math.max.apply(Math, this.listeGenYP.results.map(function(o) { return o.price; }));

      this.listeGenYP.results.forEach(fn => {
         dataAxis.push(fn.year.toString()); 
         data.push(fn.price); 
         this.spinner = false;
        })

    for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }

    this.options = {
      title: {
        text: 'Yearly Purchase Graph',
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          textStyle: {
            color: '#fff',
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#999',
          },
        },
      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        {
          // For shadow
          type: 'bar',
          itemStyle: {
            normal: { color: 'rgba(0,0,0,0.05)' },
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false,
        },
        {
          type: 'bar',
          itemStyle: {
            normal: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' },
              ]),
            },
            emphasis: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            },
          },
          data,
        },
      ],
    };
  }); // then
  }

  onChartEvent(event: any, type: string) {
   // console.log('chart event:', type, event);
  }

}
