import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core'
import { AuthentificationService } from 'src/app/shared/services/authentification.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})

export class NavigationComponent {
  @ViewChild('navMenu') navMenu!: ElementRef
  @ViewChild('select_theme') select_theme!: ElementRef
  @ViewChild('Template') theme!: ElementRef

  classlist : DOMTokenList | undefined

  constructor(private AuthService: AuthentificationService,  @Inject(DOCUMENT) private document: Document) {}

  expandBurgerMenu(e: Event) {
    const btn = <HTMLElement>e.target;
    btn.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active')
  }

  set_theme(theme : string){
    this.document.body.removeAttribute('class')
    this.document.body.classList.add('has-navbar-fixed-top')
    if(theme === "light"){
      this.theme.nativeElement.innerText = "Light Theme"
      this.document.body.classList.add('light-theme')
    }
    if(theme === "dark"){
      this.theme.nativeElement.innerText = "Dark Theme"
      this.document.body.classList.add('dark-theme')
    }
    if(theme === "colored"){
      this.theme.nativeElement.innerText = "Color Theme"
      this.document.body.classList.add('default-theme')
    }
  }

  openManual(){
    console.log("open instructions")
  }

  logout(){
    console.log("open instructions")
    this.AuthService.logout()
  }

}
