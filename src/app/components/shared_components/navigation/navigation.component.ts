import { Component, ElementRef, ViewChild } from '@angular/core'
import { AuthentificationService } from 'src/app/shared/services/authentification.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})

export class NavigationComponent {
  constructor(private AuthService: AuthentificationService) {}

  expandBurgerMenu(e: Event) {
    const btn = <HTMLElement>e.target;
    btn.classList.toggle('is-active');
    document.getElementById('nav-menu')?.classList.toggle('is-active')
  }

  logout(){
    this.AuthService.logout()
  }

}
