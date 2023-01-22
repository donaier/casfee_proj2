import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { StorageService } from '../../model/storage.service';
import { User } from '../types/user';
import { User as FirebaseUser } from "firebase/auth";
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class AuthentificationService {
  constructor(private StorageService: StorageService, private auth: Auth, private router: Router) {}

  async login_firebase(Login: User) : Promise<boolean> {
    try {
      await signInWithEmailAndPassword(this.auth, Login.email, Login.password)
      this.StorageService.set_localStorage(this.get_currentUser())
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  get_currentUser(): FirebaseUser | boolean {
    console.log(this.auth.currentUser)
    if(this.auth.currentUser != null){
      return true
    //  return currentUser
    }
    return false
  }



/*
  isLoggedin(): FirebaseUser | boolean {
    console.log(this.auth.currentUser)
    if(this.auth.currentUser != null){
      return true
    //  return currentUser
    }
    return false
  } */

  logout() {
    this.StorageService.delete_localStorage()
    this.logout_firebase()
    this.router.navigate(['/login'])
  }

  logout_firebase() {
    this.auth.signOut()
  }
/* */
  isLoggedin(): boolean {
    if(this.StorageService.getUserdata()) {
      return true
    }
    if(!this.StorageService.getUserdata()) {
      return false
    }
    return false
  }
}
