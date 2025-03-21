import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PasswordValidatorService } from './password-validator.service';
import { IUser } from 'src/app/interfaces/IUser';
import { IResponse } from 'src/app/interfaces/IResponse';
import { environment } from 'src/environments/environments';
import { AbstractControl } from '@angular/forms';

describe('PasswordValidatorService', () => {
  let service: PasswordValidatorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PasswordValidatorService],
    });

    service = TestBed.inject(PasswordValidatorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validatePassword', () => {
    it('should return null if the password is valid', () => {
      const control = { value: '222222' } as AbstractControl;
      const validatorFn = service.validatePassword();
      const result = validatorFn(control);

      expect(result).toBeNull();
    });

    it('should return errors if the password is invalid', () => {
      const control = { value: '12345' } as AbstractControl;
      const validatorFn = service.validatePassword();
      const result = validatorFn(control);

      expect(result).toEqual(
        {
          adjacentDigits: "Senha deve conter 2 dígitos adjacentes iguais",
          range: "Senha deve estar entre números 184759 e 856920",
          sixDigits: "Senha deve conter 6 dígitos"
        }
      );
    });

    it('should return errors for a password with adjacent digits', () => {
      const control = { value: '234578' } as AbstractControl;
      const validatorFn = service.validatePassword();
      const result = validatorFn(control);

      expect(result).toEqual({
        adjacentDigits: 'Senha deve conter 2 dígitos adjacentes iguais'
      });
    });

    it('should return errors for a password with decreasing digits', () => {
      const control = { value: '664321' } as AbstractControl;
      const validatorFn = service.validatePassword();
      const result = validatorFn(control);

      expect(result).toEqual({
        decreasing: 'Senha deve conter dígitos em uma sequência crescente ou de mesmo valor'
      });
    });

    it('should return multiple errors if the password is invalid', () => {
      const control = { value: '16345' } as AbstractControl;
      const validatorFn = service.validatePassword();
      const result = validatorFn(control);

      expect(result).toEqual({
        sixDigits: 'Senha deve conter 6 dígitos',
        adjacentDigits: 'Senha deve conter 2 dígitos adjacentes iguais',
        range: 'Senha deve estar entre números 184759 e 856920',
        decreasing: 'Senha deve conter dígitos em uma sequência crescente ou de mesmo valor'
      });
    });
  });

  describe('getErrorMessages', () => {
    it('should return an empty array if there are no errors', () => {
      const errors = null;
      const result = service.getErrorMessages(errors);

      expect(result).toEqual([]);
    });

    it('should return error messages if there are errors', () => {
      const errors = {
        sixDigits: 'Senha deve conter 6 dígitos',
        range: 'Senha deve estar entre números 184759 e 856920'
      };
      const result = service.getErrorMessages(errors);

      expect(result).toEqual([
        'Senha deve conter 6 dígitos',
        'Senha deve estar entre números 184759 e 856920'
      ]);
    });
  });

  describe('sendForm', () => {
    it('should send user data and return response', () => {
      const mockUser: IUser = {
        name: 'Teste',
        email: 'teste@teste.com',
        password: '222222'
      }
      const mockResponse: IResponse = { requestId: '12345678910' };

      service.sendForm(mockUser).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne(`${environment.url}/PasswordValidation`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockResponse);
    });
  });
});
