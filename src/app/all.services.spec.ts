import { TestBed } from '@angular/core/testing';
import { AuthentificationService } from './shared/services/authentification.service';
import { FluxStore } from './shared/services/flux-store';


describe('AuthentificationService', () => {
  let Authservice: AuthentificationService;
  let Store: FluxStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    Authservice = TestBed.inject(AuthentificationService);
    Store = TestBed.inject(FluxStore);
  });

  it('should create AuthService', () => {
    expect(Authservice).toBeTruthy();
  });

  it('should create FluxStore', () => {
    expect(Store).toBeTruthy();
  });


});
