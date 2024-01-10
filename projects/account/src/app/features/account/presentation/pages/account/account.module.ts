import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountPage } from './account.page';
import { AccountLoginFormModule } from '../../components/account-login-form/account-login-form.module';
import { AccountUserModule } from '../../components/account-user/account-user.module';


@NgModule({
  declarations: [
    AccountPage
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AccountLoginFormModule,
    AccountUserModule,
  ]
})
export class AccountModule { }
