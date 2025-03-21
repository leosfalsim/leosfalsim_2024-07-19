import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/interfaces/IResponse';
import { IUser } from 'src/app/interfaces/IUser';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {

  constructor(private _http: HttpClient) {}

  validatePassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const errors: any = {};
      if (!this.hasSixDigits(value)) {
        errors['sixDigits'] = 'Senha deve conter 6 dígitos';
      }
      if (!this.isWithinRange(value)) {
        errors['range'] = 'Senha deve estar entre números 184759 e 856920';
      }
      if (!this.hasAdjacentDigits(value)) {
        errors['adjacentDigits'] = 'Senha deve conter 2 dígitos adjacentes iguais';
      }
      if (!this.doesNotDecrease(value)) {
        errors['decreasing'] = 'Senha deve conter dígitos em uma sequência crescente ou de mesmo valor';
      }
      return Object.keys(errors).length ? errors : null;
    };
  }

  getErrorMessages(errors: any): string[] {
    if (!errors) {
      return [];
    }

    const messages = [];
    if (errors['sixDigits']) {
      messages.push(errors['sixDigits']);
    }
    if (errors['range']) {
      messages.push(errors['range']);
    }
    if (errors['adjacentDigits']) {
      messages.push(errors['adjacentDigits']);
    }
    if (errors['decreasing']) {
      messages.push(errors['decreasing']);
    }
    return messages;
  }

  private hasSixDigits(value: string): boolean {
    return /^\d{6}$/.test(value);
  }

  private isWithinRange(value: string): boolean {
    const num = Number(value);
    return num >= 184759 && num <= 856920;
  }

  private hasAdjacentDigits(value: string): boolean {
    return /(.)\1/.test(value);
  }

  private doesNotDecrease(value: string): boolean {
    if(value) {
      for (let i = 0; i < value.length - 1; i++) {
        if (value[i] > value[i + 1]) {
          return false;
        }
      }
    }
    return true;
  }

  sendForm(user: IUser): Observable<IResponse> {
    return this._http.post<IResponse>(`${environment.url}/PasswordValidation`, user);
  }
}
