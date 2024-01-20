import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountPage } from './account.page';
import { AccountUserModule } from '../../components/account-user/account-user.module';


@NgModule({
  declarations: [
    AccountPage
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AccountUserModule,
  ]
})
export class AccountModule { }
