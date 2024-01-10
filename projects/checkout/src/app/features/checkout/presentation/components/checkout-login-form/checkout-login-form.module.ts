import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutLoginFormComponent } from './checkout-login-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CheckoutLoginFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CheckoutLoginFormComponent,
  ],
})
export class CheckoutLoginFormModule { }
