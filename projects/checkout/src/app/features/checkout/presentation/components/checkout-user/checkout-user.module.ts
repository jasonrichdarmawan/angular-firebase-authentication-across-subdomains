import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutUserComponent } from './checkout-user.component';



@NgModule({
  declarations: [
    CheckoutUserComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CheckoutUserComponent,
  ],
})
export class CheckoutUserModule { }
