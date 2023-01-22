import { Injectable } from '@angular/core';
import { User as FirebaseUser } from "firebase/auth";

@Injectable({providedIn: 'root'})

export class StorageService {

    constructor() {}

    set_localStorage(data: FirebaseUser | boolean) {
      if (data) {
        localStorage.setItem('Userdata', JSON.stringify(data))
      }
    }

    delete_localStorage() {
      localStorage.removeItem('Userdata')
    }

    set_theme_preference(theme: string) {
      localStorage.setItem('theme-preference', theme)
    }

    getUserdata() : null | boolean | string {
      if (localStorage.getItem('Userdata') !== null) {
        return localStorage.getItem('Userdata')
      }
      return false
    }
}
