import { Injectable } from '@angular/core';
import { Account } from '../types/account';
import { DATE_FORMAT, Transaction } from '../types/transaction';
import * as moment from 'moment';
import { reduce } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GraphService {

  constructor() {}

  private setAccountNames(accounts: Account[]) {

    return accounts.map(acc => acc.name)
  }

  private setAccountSeries(accounts: Account[], selectedMonths: string[]) {

    let accGraphObjects = accounts.map(acc => {return {
      name: acc.name,
      type: 'line',
      stack: 'Total',
      areaStyle: { color: acc.color },
      lineStyle: { width: 0 },
      symbol: 'none',
      data: this.setMonthlyTotals(acc, selectedMonths),
      color: acc.color,
    }})

    return accGraphObjects
  }

  private setMonthlyTotals(account: Account, selectedMonths: string[]) {
    let sortedTransactions = account.transactions.sort((a,b) => Date.parse(moment(a.date, DATE_FORMAT).toString()) - Date.parse(moment(b.date, DATE_FORMAT).toString()))
    let availableMonths = [...new Set(sortedTransactions.map(trans => trans.date.substring(3)))]
    let runningTotal = account.initialValue
    let monthlyTotals: {
      [key: string]: number,
    } = {}
    let flatMonthlyTotals: number[] = []

    availableMonths.forEach((month, i) => {
      monthlyTotals[month] = sortedTransactions.reduce(
        (accumulator, currentValue) => accumulator + (currentValue.date.includes(month) ? currentValue.amount : 0),
        runningTotal
      )
      runningTotal = monthlyTotals[month]
    });

    let lastMonth: number = 0
    selectedMonths.forEach(month => {
      flatMonthlyTotals.push(monthlyTotals[month] || lastMonth)
      lastMonth = flatMonthlyTotals.at(-1) || 0
    })

    return flatMonthlyTotals
  }

  private setAccountInOut(accounts: Account[], selectedMonths: string[]) {
    return [
      {
        name: 'Income',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'left'
        },
        data: this.setOutData(accounts, selectedMonths),
        color: '#FF2255'
      },
      {
        name: 'Expenses',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'right'
        },
        data: this.setInData(accounts, selectedMonths),
        color: 'green'
      }
    ]
  }

  private setOutData(accounts: Account[], selectedMonths: string[]) {
    return accounts.map(acc => {
      let out: number = 0
      acc.transactions.forEach(trans => {
        if (trans.amount < 0 && selectedMonths.some(times => trans.date.includes(times))) {
          out += trans.amount
        }
      });
      return out < 0 ? out : NaN;
    }).reverse()
  }

  private setInData(accounts: Account[], selectedMonths: string[]) {
    return accounts.map(acc => {
      let out: number = 0
      acc.transactions.forEach(trans => {
        if (trans.amount > 0 && selectedMonths.some(times => trans.date.includes(times))) {
          out += trans.amount
        }
      });
      return out > 0 ? out : NaN;
    }).reverse()
  }

  composeOptionsTotal(accounts: Account[], selectedTimes: string[]) {
    let accNames: string[] = this.setAccountNames(accounts)
    let timeSteps: string[] = selectedTimes
    let accSeries: object[] = this.setAccountSeries(accounts, selectedTimes)


    return {
      title: { text: 'Total (accumulated)' },
      legend: {
        data: accNames,
        selectedMode: false
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
          data: timeSteps,
          axisLine: { show: false },
          axisTick: { show: false }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: { lineStyle: { color: '#F0F0F0'}}
        }
      ],
      series: accSeries
    };
  }

  composeOptionsInOut(accounts: Account[], selectedTimes: string[]) {
    let accNames: string[] = this.setAccountNames(accounts).reverse()
    let accSeries: object[] = this.setAccountInOut(accounts, selectedTimes)

    return {
      title: { text: 'In/Out' },
      legend: {
        show: false,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value'
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: {
            show: false
          },
          data: accNames
        }
      ],
      series: accSeries
    };
  }
}
