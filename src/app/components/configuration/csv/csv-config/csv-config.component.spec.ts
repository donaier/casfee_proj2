import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvConfigComponent } from './csv-config.component';

describe('CsvConfigComponent', () => {
  let component: CsvConfigComponent;
  let fixture: ComponentFixture<CsvConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
