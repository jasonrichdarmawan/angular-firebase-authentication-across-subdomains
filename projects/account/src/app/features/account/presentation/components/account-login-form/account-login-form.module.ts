import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountLoginFormComponent } from './account-login-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AccountLoginFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    AccountLoginFormComponent,
  ],
})
export class AccountLoginFormModule { }
