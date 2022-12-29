import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fakeAsync, getTestBed, tick } from '@angular/core/testing';
import { AccountConfigComponent } from './account-config.component';
import { Account, csvMask } from 'src/app/shared/types/account';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/components/shared_components/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FLUX_CONFIG } from 'src/app/shared/helpers/flux.configuration';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

describe('AccountConfigComponent', () => {
  let component: AccountConfigComponent;
  let fixture: ComponentFixture<AccountConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore())
      ],
      declarations: [ AccountConfigComponent ],
      providers: [ ...FLUX_CONFIG, FluxStore ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should ...', () => {
      expect(component).toBeTruthy();
    });
});
