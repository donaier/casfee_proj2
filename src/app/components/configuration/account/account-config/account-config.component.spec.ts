import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fakeAsync, getTestBed, tick } from '@angular/core/testing';
import { AccountConfigComponent } from './account-config.component';
import { Account, csvMask } from 'src/app/shared/types/account';
import { FluxStore } from 'src/app/shared/services/flux-store';

describe('AccountConfigComponent', () => {
  let component: AccountConfigComponent;
  let fixture: ComponentFixture<AccountConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [

      ],
      declarations: [ AccountConfigComponent ],
      providers: [ FluxStore ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should initialise data', () => {



  });

  it('should create new account', () => {



  });

  it('should create delete account', () => {



  });




});
