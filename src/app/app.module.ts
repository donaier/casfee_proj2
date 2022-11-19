import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './components/shared_components/shared.module';

import { AppComponent } from './app.component';

// Login
import { LoginComponent } from './components/login/login.component';

// Firestore
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

// Flux
import { FLUX_CONFIG } from './shared/helpers/flux.configuration';
import { FluxStore } from './shared/services/flux-store';
import { Flux_UploadData } from './model/Flux-upload.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [...FLUX_CONFIG, FluxStore, Flux_UploadData],
  bootstrap: [AppComponent]
})

export class AppModule {}
