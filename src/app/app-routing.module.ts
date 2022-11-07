import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { ConfigurationComponent } from './components/configuration/configuration.component'

const routes: Routes = [
  {
      path: 'login',
      component: LoginComponent,
    //  canActivate: [AuthGuard],
   //   data: { role: 'login' },
  },
  {
      path: 'dashboard',
       loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
      component: DashboardComponent,
    //  canActivate: [AuthGuard],
    //  data: { role: 'dashboard' },
  },
  {
      path: 'configuration',
      loadChildren: () => import('./components/configuration/configuration.module').then(m => m.ConfigurationModule),
      component: ConfigurationComponent,
    //  canActivate: [AuthGuard],
   //   data: { role: 'configuration' },
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
