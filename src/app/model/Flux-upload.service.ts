import { Inject, Injectable } from '@angular/core'
import { fluxDispatcherToken } from '../shared/helpers/flux.configuration'
import { Subject } from 'rxjs'
import { FluxAction, FluxActionTypes } from '../shared/types/actions.type'
import { Firestore } from '@angular/fire/firestore'

// Types
import { Transaction } from 'src/app/shared/types/transaction'
import { Account } from 'src/app/shared/types/account'
import { Category } from 'src/app/shared/types/category'

@Injectable()

export class Flux_UploadData {
    constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>, private firestore: Firestore) {
      this.dispatcher.subscribe(async (action: FluxAction) => {
        switch (action.type) {
            case FluxActionTypes.AddTransaction:

              break
            case FluxActionTypes.UpdateTransaction:

              break
            case FluxActionTypes.DeleteTransaction:

              break
            case FluxActionTypes.AddAccount:

              break
            case FluxActionTypes.UpdateAccount:

              break
            case FluxActionTypes.DeleteAccount:

              break
            case FluxActionTypes.AddCategoryGroup:

              break
            case FluxActionTypes.UpdateCategoryGroup:

              break
            case FluxActionTypes.DeleteCategoryGroup:

              break
            case FluxActionTypes.AddCategory:

              break
            case FluxActionTypes.UpdateCategory:

              break
            case FluxActionTypes.DeleteCategory:

              break
            default:
              throw new Error('operation unknown')
        }
      })
    }
}
