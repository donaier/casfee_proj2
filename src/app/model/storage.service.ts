import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class StorageService {
    constructor() {}

    static set_localStorage(data: string) {
        localStorage.setItem('Userdata', JSON.stringify(data))
    }

    static delete_localStorage() {
        localStorage.removeItem('Userdata')
    }

    static getUserdata(): string | boolean | null {
        if (localStorage.getItem('Userdata') !== null) {
            return localStorage.getItem('Userdata')
        }
        return false
    }
}
