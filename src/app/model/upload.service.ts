import { Inject, Injectable } from '@angular/core'
import { fluxDispatcherToken } from '../shared/helpers/flux.configuration'
import { Subject } from 'rxjs'
import { FluxAction, FluxActionTypes } from '../shared/types/actions.type'


import { deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore'

// Types

import { Transaction } from 'src/app/shared/types/transaction'
import { Account } from 'src/app/shared/types/account'
import { Category } from 'src/app/shared/types/category'

@Injectable()

export class UploadService {
    constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>, private firestore: Firestore) {
      this.dispatcher.subscribe(async (action: FluxAction) => {
        switch (action.type) {
          case FluxActionTypes.Create:
            if(action.selector ==='account'){
              const docRef_add = doc(this.firestore, 'accounts', action.account!.name)
              await setDoc(docRef_add, action.account)
            }
            if(action.selector ==='categoryGroup'){

            }
            if(action.selector ==='category'){

            }
            if(action.selector ==='transaction'){

            }
            if(action.selector ==='csvMask'){
              const docRef_add = doc(this.firestore, 'csvMasks', action.csvMask!.name)
              await setDoc(docRef_add, action.csvMask)
            }
            break
          case FluxActionTypes.Update:
            if(action.selector ==='account'){
              const docRef_update = doc(this.firestore, 'accounts', action.account!.name)
              await setDoc(docRef_update, action.account)
            }
            if(action.selector ==='categoryGroup'){

            }
            if(action.selector ==='category'){

            }
            if(action.selector ==='transaction'){

            }
            if(action.selector ==='csvMask'){
              const docRef_update = doc(this.firestore, 'csvMasks', action.csvMask!.name)
              await setDoc(docRef_update, action.csvMask)
            }
            break
          case FluxActionTypes.Delete:
            if(action.selector ==='account'){
              await deleteDoc(doc(this.firestore, 'accounts', action.account!.name))
            }
            if(action.selector ==='categoryGroup'){

            }
            if(action.selector ==='category'){

            }
            if(action.selector ==='transaction'){

            }
            if(action.selector ==='csvMask'){
              await deleteDoc(doc(this.firestore, 'csvMasks', action.csvMask!.name))
            }
            break
        }
      })
    }
}
