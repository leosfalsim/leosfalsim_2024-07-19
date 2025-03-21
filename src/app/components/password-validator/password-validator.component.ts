import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidatorService } from './service/password-validator.service';
import { IUser } from 'src/app/interfaces/IUser';
import { HttpErrorResponse } from '@angular/common/http';
import { IResponse } from 'src/app/interfaces/IResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-validator',
  templateUrl: './password-validator.component.html',
  styleUrls: ['./password-validator.component.scss']
})
export class PasswordFormComponent {
  form: FormGroup;
  isLoading = false;
  passwordErrors: string[] = [];
  toastMessage: string = '';
  showToast: boolean = false;
  toastType: 'success' | 'error' | 'warning' = 'success';

  constructor(
    private fb: FormBuilder,
    private $passwordValidatorService: PasswordValidatorService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.$passwordValidatorService.validatePassword()]]
    });
  }

  ngOnInit() {
    this.password?.valueChanges.subscribe(() => {
      this.updatePasswordErrors();
    });
  }

  updatePasswordErrors() {
    const errors = this.password?.errors;
    this.passwordErrors = this.$passwordValidatorService.getErrorMessages(errors);
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  sendForm() {
    this.isLoading = true;

    if (this.form.valid) {

      const user: IUser = {
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password
      };

      this.$passwordValidatorService.sendForm(user).subscribe({
        next: (response: IResponse) => {
          localStorage.setItem('name', user.name);
          this.isLoading = false;
          this.showToast = true;
          this.toastType = 'success';
          this.toastMessage = 'Formulário enviado com sucesso!';
          this.router.navigate(['dashboard']);
          setTimeout(() => this.toastMessage = '', 5000);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.showToast = true;
          this.toastType = 'error';
          this.toastMessage = 'Ocorreu um erro ao enviar o formulário! Por favo, tente novamente!';
          setTimeout(() => this.toastMessage = '', 5000);
        }
      });
    }else {
      this.toastMessage = 'Formulário inválido! Por favor, revise os campos preenchidos!';
      this.isLoading = false;
    }
  }
}
