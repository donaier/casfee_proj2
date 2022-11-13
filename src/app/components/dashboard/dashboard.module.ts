import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component'
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared_components/shared.module'


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: []
})

export class DashboardModule { }
