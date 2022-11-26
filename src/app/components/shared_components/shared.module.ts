import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  imports: [
    RouterModule,
  ],
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent,
    ReactiveFormsModule,
  ]
})

export class SharedModule {}
