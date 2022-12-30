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
      data: this.setMonthlyTotals(acc, selectedMonths)
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
        (accumulator, currentValue) => accumulator + (currentValue.date.includes(month) ? currentValue.amount: 0),
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

  composeOptions(accounts: Account[], selectedTimes: string[]) {
    let accNames: string[] = this.setAccountNames(accounts)
    let timeSteps: string[] = selectedTimes
    let accSeries: object[] = this.setAccountSeries(accounts, selectedTimes)


    return {
      title: { text: '' },
      legend: {
        data: accNames,
        icon: 'none',
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
          data: timeSteps
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: accSeries
    };
  }
}
