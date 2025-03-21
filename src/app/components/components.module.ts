import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordFormComponent } from './password-validator/password-validator.component';
import { LoadingComponent } from './loading/loading.component';
import { ToastComponent } from './toast/toast.component';
import { HeaderComponent } from './header/header.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { TableModule } from 'primeng/table'; // Módulo da tabela
import { ButtonModule } from 'primeng/button'; // Botões para ações (editar, excluir, etc.)
import { InputTextModule } from 'primeng/inputtext'; // Edição de células
import { DropdownModule } from 'primeng/dropdown'; // Caso tenha campos de seleção
import { CheckboxModule } from 'primeng/checkbox'; // Caso tenha checkboxes na tabela

@NgModule({
  declarations: [
    PasswordFormComponent,
    LoadingComponent,
    ToastComponent,
    HeaderComponent,
    OnboardingComponent
  ],
  exports: [
    PasswordFormComponent,
    HeaderComponent,
    OnboardingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule
  ]
})
export class ComponentsModule { }
