import { FormControl, Validators } from '@angular/forms';
import { csvMask } from './account';
import { Category } from './category'

export interface Transaction {
  description: string,
  fromAccount?: string,
  amount: number,
  date: string,
  category: string
}

export const TransactionForm = {
  description: new FormControl('', [Validators.required]),
  fromAccount: new FormControl(''),
  amount: new FormControl('', [Validators.required]),
  date: new FormControl('', [Validators.required]),
  category: new FormControl('', [Validators.required]),
};

export function cookTransactions(transactions: [], csvMask: csvMask) {
  let readyTransactions: Transaction[] = [];
  let setPositions = resolveCsvMask(csvMask);

  if (setPositions) {
    transactions.forEach((t: String) => {
      let tArray = t.split(csvMask.delimiter);

      // lets set 3 as min since there is info, amount and date
      if (tArray.length >= 3) {
        // mask can have multiple 'amount' fields for pos/neg values, usually only one contains data
        setPositions?.amountPos.forEach(ap => {
          if (ap && tArray[ap] != '' && !isNaN(parseFloat(tArray[ap]))) {
            readyTransactions.push({
              description: setPositions?.descriptionPos ? tArray[setPositions.descriptionPos].replace(/\"/gi, '').trim() : 'error',
              fromAccount: '',
              amount: parseFloat(tArray[ap]),
              date: setPositions?.datePos != undefined ? tArray[setPositions.datePos] : 'error',
              category: '',
            })
          }
        })
      }
    });
  }
  // reverse here to have the oldest first
  return readyTransactions.reverse();
}

export function resolveCsvMask(csvMask: csvMask) {
  let setArray = csvMask.mask.split(csvMask.delimiter);
  let descriptionPos = setArray.findIndex(el => el == 'info');
  let datePos = setArray.findIndex(el => el == 'date');
  let amountPos = setArray.map((e, i) => e == 'amount' ? i : '').filter(String);

  if (
    descriptionPos >= 0 && descriptionPos !== undefined &&
    datePos >= 0 && datePos !== undefined &&
    amountPos.length
  ) {
    return {
      datePos,
      descriptionPos,
      amountPos
    }
  } else {
    return null;
  }
}
