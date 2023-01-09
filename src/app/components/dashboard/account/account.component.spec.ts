import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FLUX_CONFIG } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/model/flux-store';
import { environment } from 'src/environments/environment';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { Subject, Subscription } from 'rxjs';

import { AccountComponent } from './account.component';
import { InjectionToken } from '@angular/core';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],
      declarations: [

      ],
      providers: [FluxStore, ...FLUX_CONFIG, { provide: InjectionToken<fluxDispatcherToken>, useValue: {Subject<FluxAction>} }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
