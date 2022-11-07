import { NgModule } from '@angular/core'
import { ConfigurationComponent } from './configuration.component'
import { SharedModule } from '../shared_components/shared.module'

@NgModule({
  declarations: [
    ConfigurationComponent,
  ],
  imports: [
    SharedModule,

  ],
  providers: [],
  bootstrap: []
})
export class ConfigurationModule { }
