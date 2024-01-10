import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutPage } from './checkout.page';
import { CheckoutLoginFormModule } from '../../components/checkout-login-form/checkout-login-form.module';
import { CheckoutUserModule } from '../../components/checkout-user/checkout-user.module';


@NgModule({
  declarations: [
    CheckoutPage,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    CheckoutUserModule,
    CheckoutLoginFormModule,
  ]
})
export class CheckoutModule { }
