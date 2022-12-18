import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvTransactionFormComponent } from './csv-transaction-form.component';

describe('CsvTransactionFormComponent', () => {
  let component: CsvTransactionFormComponent;
  let fixture: ComponentFixture<CsvTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvTransactionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
