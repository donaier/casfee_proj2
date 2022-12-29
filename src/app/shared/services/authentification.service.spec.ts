import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../components/shared_components/shared.module';
import { AuthentificationService } from "./authentification.service";
import { AppRoutingModule } from '../../app-routing.module';
import { environment } from '../../../environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { StorageService } from 'src/app/model/storage.service';

describe("AuthentificationService", () => {
  let service: AuthentificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),],
      providers: [
        { provide: AuthentificationService, useValue: {} },
        { provide: StorageService, useValue: {} },
        { provide: Auth, useValue: {} }],
    });
    service = TestBed.inject(AuthentificationService);
  });


  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('should do a correct login', () => {

  //  service.login_firebase({email : "admin@admin.ch", password : "123456"})
    expect(window.localStorage).toBeNull();

  });


});


