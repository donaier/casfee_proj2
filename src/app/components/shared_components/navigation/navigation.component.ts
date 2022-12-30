import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, NgModule, OnInit, ViewChild } from '@angular/core'
import { AuthentificationService } from 'src/app/shared/services/authentification.service';
import { StorageService } from 'src/app/model/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})

export class NavigationComponent implements AfterViewInit {
  @ViewChild('navMenu') navMenu!: ElementRef
  @ViewChild('select_theme') select_theme!: ElementRef
  @ViewChild('dropdown') dropdown!: ElementRef
  @ViewChild('theme_select') theme!: ElementRef

  classlist : DOMTokenList | undefined
  router: Router

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private AuthService: AuthentificationService,
    private StorageService: StorageService,
    router: Router
  ) {
    this.router = router
  }

  ngAfterViewInit() {
    this.document.body.classList.add('has-navbar-fixed-top')
    let theme = localStorage.getItem('theme-preference') || 'default-theme'
    this.set_theme(theme)
  }

  expandBurgerMenu(e: Event) {
    const btn = <HTMLElement>e.target;
    btn.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active')
  }

  set_theme(theme : string){
    this.StorageService.set_theme_preference(theme)
    this.document.body.classList.remove('light-theme', 'dark-theme', 'default-theme')
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

  change_color(){
    this.theme.nativeElement.classList.toggle('background')
  }

  openManual(){
    console.log("open instructions")
  }

  showSettings() {
    this.document.getElementById('dashboard-filter')?.classList.remove('hidden')
  }

  logout(){
    this.AuthService.logout()
  }
}
