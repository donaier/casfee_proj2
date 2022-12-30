import { Injectable } from '@angular/core';
import { Transaction } from '../types/transaction';

@Injectable({
  providedIn: 'root'
})

export class GraphService {

  constructor() {}

  composeOptions(transactions: Transaction[]) {
    return {
      title: {
        text: ''
      },
      legend: {
        data: ['accountName1', 'accountName2']
      },
      toolbox: {},
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
          data: ['time', 'slots']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'accountName1',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          data: [120, 132]
        },
        {
          name: 'accountName2',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {},
          data: [120, 132]
        },
      ]
    };
  }
}
