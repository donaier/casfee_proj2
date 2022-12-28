import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) {}


  ngOnInit() {
    this.set_Theme()
  }

  set_Theme(){
    this.document.body.classList.add('has-navbar-fixed-top', 'dark-theme')
  }

}
