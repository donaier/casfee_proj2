import { DOCUMENT } from '@angular/common'
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthentificationService } from 'src/app/shared/services/authentification.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  @ViewChild('signinButton', { static: true }) signinButton!: ElementRef

  login!: FormGroup
  email!: FormControl
  password!: FormControl
  authorisation : boolean = true
  wronguser? : string

  constructor(private AuthService: AuthentificationService, private router: Router, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.document.body.removeAttribute('class')
    this.login = new FormGroup({
      email: this.email = new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
      ]),
      password: this.password = new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    })
  }

  async onSubmit(){
    if(this.login.valid){
      this.signinButton.nativeElement.classList.add('is-loading')
      if(await this.AuthService.login_firebase(this.login.value)){
        this.router.navigate(['/dashboard'])
        this.login.reset()
      }else{
        this.authorisation = false
      }
      this.signinButton.nativeElement.classList.remove('is-loading')
    }
  }

}
