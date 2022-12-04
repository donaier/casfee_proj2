import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualTransactionFormComponent } from './manual-transaction-form.component';

describe('ManualTransactionFormComponent', () => {
  let component: ManualTransactionFormComponent;
  let fixture: ComponentFixture<ManualTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualTransactionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
