import { Inject, Injectable } from '@angular/core'
import { fluxDispatcherToken } from '../helpers/flux.configuration'
import { Subject } from 'rxjs'
import { FluxAction, FluxActionTypes } from '../types/actions.type'


import { addDoc, collection, deleteDoc, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore'

@Injectable()

export class UploadService {
    constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>, private firestore: Firestore) {
      this.dispatcher.subscribe(async (action: FluxAction) => {
        switch (action.type) {
          case FluxActionTypes.Create:
            if(action.selector ==='account'){
              await addDoc(collection(this.firestore, 'accounts'), action.account)
            }
            if(action.selector ==='categoryGroup'){
              await addDoc(collection(this.firestore, 'categoryGroups'), action.categoryGroup)
            }
            if(action.selector ==='category'){
              await addDoc(collection(this.firestore, 'categoryEntries'), action.category)
            }
            if(action.selector ==='csvMask'){
              await addDoc(collection(this.firestore, 'csvMasks'), action.csvMask)
            }
            break

          case FluxActionTypes.Update:
            if(action.selector ==='account'){
              await updateDoc(doc(this.firestore, 'accounts/'+ action.account?.id), {
                name: action.account?.name,
                shortName: action.account?.shortName,
                description: action.account?.description,
                initialValue: action.account?.initialValue,
                currentValue: action.account?.currentValue,
                color: action.account?.color,
                csv: action.account?.csv,
                transactions: action.account?.transactions
               })
            }
            if(action.selector ==='categoryGroup'){
              await updateDoc(doc(this.firestore, 'categoryGroups/'+ action.categoryGroup?.id), {
                name: action.categoryGroup?.name,
                color: action.categoryGroup?.color
              })
            }
            if(action.selector ==='csvMask'){
              await updateDoc(doc(this.firestore, 'csvMasks/'+ action.csvMask?.id), {
                mask: action.csvMask?.mask,
                delimiter: action.csvMask?.delimiter,
                dateMask: action.csvMask?.dateMask,
                name: action.csvMask?.name,
              })
            }
            break

          case FluxActionTypes.Delete:
            if(action.selector ==='account'){
              await deleteDoc(doc(this.firestore, 'accounts', action.account!.id))
            }
            if(action.selector ==='categoryGroup'){
              await deleteDoc(doc(this.firestore, 'categoryGroups', action.categoryGroup!.id))
            }
            if(action.selector ==='category'){
              await deleteDoc(doc(this.firestore, 'categoryEntries', action.category!.id))
            }
            if(action.selector ==='csvMask'){
              await deleteDoc(doc(this.firestore, 'csvMasks', action.csvMask!.id))
            }
            break
        }
      })
    }
}
