import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component'
import { SharedModule } from '../shared_components/shared.module'


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    SharedModule,

  ],
  providers: [],
  bootstrap: []
})
export class DashboardModule { }
