import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';
import { Category, CategoryGroup } from 'src/app/shared/types/category';
import { CategoryFormComponent } from '../category-form/category-form.component';

import { CategoryConfigComponent } from './category-config.component';

describe('CategoryConfigComponent', () => {
  let component: CategoryConfigComponent;
  let fixture: ComponentFixture<CategoryConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [

      ],
      declarations: [ CategoryConfigComponent ],
      providers: [FluxStore]
    })




    .compileComponents();

    fixture = TestBed.createComponent(CategoryConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
