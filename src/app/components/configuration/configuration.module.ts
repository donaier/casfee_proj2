import { NgModule } from '@angular/core'
import { ConfigurationComponent } from './configuration.component'
import { SharedModule } from '../shared_components/shared.module'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [
    ConfigurationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: []
})
export class ConfigurationModule { }
