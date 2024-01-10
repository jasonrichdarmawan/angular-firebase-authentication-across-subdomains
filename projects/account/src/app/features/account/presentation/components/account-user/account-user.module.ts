import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountUserComponent } from './account-user.component';



@NgModule({
  declarations: [
    AccountUserComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AccountUserComponent,
  ],
})
export class AccountUserModule { }
