import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PasswordValidatorService } from './service/password-validator.service';
import { PasswordFormComponent } from './password-validator.component';
import { IUser } from 'src/app/interfaces/IUser';
import { IResponse } from 'src/app/interfaces/IResponse';
import { HttpErrorResponse } from '@angular/common/http';

describe('PasswordFormComponent', () => {
  let component: PasswordFormComponent;
  let fixture: ComponentFixture<PasswordFormComponent>;
  let passwordValidatorService: PasswordValidatorService;
  let router: Router;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [PasswordFormComponent],
      providers: [
        FormBuilder,
        PasswordValidatorService,
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordFormComponent);
    component = fixture.componentInstance;
    passwordValidatorService = TestBed.inject(PasswordValidatorService);
    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with name, email, and password controls', () => {
    const form = component.form;
    expect(form.contains('name')).toBe(true);
    expect(form.contains('email')).toBe(true);
    expect(form.contains('password')).toBe(true);
  });

  it('should update passwordErrors when password value changes', () => {
    const spy = jest.spyOn(component, 'updatePasswordErrors');
    component.form.controls.password.setValue('12345');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should set passwordErrors correctly based on validation', () => {
    component.form.controls.password.setValue('12345');
    component.updatePasswordErrors();
    expect(component.passwordErrors).toEqual([
      'Senha deve conter 6 dígitos',
      "Senha deve estar entre números 184759 e 856920",
      "Senha deve conter 2 dígitos adjacentes iguais"
    ]);
  });

  it('should handle successful form submission', () => {
    const mockResponse: IResponse = { requestId: '12345678910' };
    const mockUser: IUser = { name: 'Teste', email: 'teste@teste.com', password: '222222' };

    jest.spyOn(passwordValidatorService, 'sendForm').mockReturnValue(of(mockResponse));
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.form.setValue(mockUser);
    component.sendForm();

    expect(component.isLoading).toBe(false);
    expect(component.showToast).toBe(true);
    expect(component.toastType).toBe('success');
    expect(component.toastMessage).toBe('Formulário enviado com sucesso!');
    expect(navigateSpy).toHaveBeenCalledWith(['dashboard']);
    expect(localStorage.getItem('name')).toBe(mockUser.name);
  });

  it('should handle form submission error', () => {
    const mockError: HttpErrorResponse = { status: 400, error: { code: '123' } } as HttpErrorResponse;

    jest.spyOn(passwordValidatorService, 'sendForm').mockReturnValue(throwError(mockError));

    component.form.setValue({ name: 'Teste', email: 'teste@teste.com', password: '222222' });
    component.sendForm();

    expect(component.isLoading).toBe(false);
    expect(component.showToast).toBe(true);
    expect(component.toastType).toBe('error');
    expect(component.toastMessage).toBe('Ocorreu um erro ao enviar o formulário! Por favo, tente novamente!');
  });

  it('should show invalid form toast message if form is invalid', () => {
    component.form.setValue({ name: '', email: '', password: '' });
    component.sendForm();
    expect(component.toastMessage).toBe('Formulário inválido! Por favor, revise os campos preenchidos!');
  });
});
