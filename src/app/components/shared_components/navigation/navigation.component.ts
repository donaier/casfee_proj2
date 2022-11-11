import { Component, ElementRef, ViewChild } from '@angular/core'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})

export class NavigationComponent {
  constructor() {}

  expandBurgerMenu(e: Event) {
    const btn = <HTMLElement>e.target;
    btn.classList.toggle('is-active');
    document.getElementById('nav-menu')?.classList.toggle('is-active')
  }
}
