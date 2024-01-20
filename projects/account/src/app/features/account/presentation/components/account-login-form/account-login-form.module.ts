import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountLoginFormComponent } from './account-login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AccountLoginFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    AccountLoginFormComponent,
  ],
})
export class AccountLoginFormModule { }
