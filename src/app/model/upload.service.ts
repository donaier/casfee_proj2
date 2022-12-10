import { Inject, Injectable } from '@angular/core'
import { fluxDispatcherToken } from '../shared/helpers/flux.configuration'
import { Subject } from 'rxjs'
import { FluxAction, FluxActionTypes } from '../shared/types/actions.type'


import { deleteDoc, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore'

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
              const docRef_add = doc(this.firestore, 'categories', action.categoryGroup!.name)
              await setDoc(docRef_add, action.categoryGroup)
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
              const docRef_add = doc(this.firestore, 'categories', action.categoryGroup!.name)
              await setDoc(docRef_add, action.categoryGroup)
            }
            if(action.selector ==='category'){
              const docRef = doc(this.firestore, 'categories', action.categoryGroup!.name)
              await updateDoc(docRef, {categories: action.categoryGroup!.categories} )
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
              await deleteDoc(doc(this.firestore, 'categories', action.categoryGroup!.name))
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
