import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { AuthentificationService } from '../../shared/services/authentification.service'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../shared_components/shared.module';


describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let myService: AuthentificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,],
      providers: [{ provide: AuthentificationService, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    myService = TestBed.inject(AuthentificationService);
    component.ngOnInit();
  });

  describe("Initialise App", function() {

    it('should create Component', () => {
      expect(component).toBeTruthy();
    });

    it('should create AuthService', () => {
      expect(myService).toBeTruthy();
    });

  });

  describe("Test Form", function() {
  //  let email = component.login!.controls['email'];
   // let password = component.login.controls['password'];
    it('form invalid when empty', () => {
      expect(component.login!.valid).toBeFalsy();
    });

    it('form valid when filled', () => {
      expect(component.login!.valid).toBeFalsy();
      component.login!.controls['email'].setValue("admin@admin.ch");
      component.login!.controls['password'].setValue("123456");
      expect(component.login!.valid).toBeTruthy();
    });

    it('should do a correct login', async () => {
      component.login!.controls['email'].setValue("admin@admin.ch");
      component.login!.controls['password'].setValue("123456");
   //   await component.onSubmit();
   //   expect(component.signinButton.nativeElement.classList).toContain('is-loading');

    });



    /*
    it('email invalid when empty', () => {
      expect(email.valid).toBeFalsy(); (2)
    });

    it('password invalid when empty', () => {
      expect(password.valid).toBeFalsy(); (2)
    });

    it('email valid if entry', () => {
      email.setValue("admin@admin.ch");
      expect(email.valid).toBeTruthy(); (2)
    });

    it('password valid if entry', () => {
      password.setValue("123456");
      expect(password.valid).toBeTruthy(); (2)
    }); */


  });








/*
  describe('method1', () => {


    it('should ...', () => {
      expect(component).toBeTruthy();
    });





  });
*/


})
