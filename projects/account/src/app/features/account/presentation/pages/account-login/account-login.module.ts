import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountLoginRoutingModule } from './account-login-routing.module';
import { AccountLoginPage } from './account-login.page';
import { AccountLoginFormModule } from '../../components/account-login-form/account-login-form.module';

@NgModule({
  declarations: [
    AccountLoginPage
  ],
  imports: [
    CommonModule,
    AccountLoginRoutingModule,
    AccountLoginFormModule,
  ],
})
export class AccountLoginModule { }
