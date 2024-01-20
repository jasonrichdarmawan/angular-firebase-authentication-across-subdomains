import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./presentation/pages/account/account.module").then(m => m.AccountModule),
  },
  {
    path: 'login',
    loadChildren: () => import("./presentation/pages/account-login/account-login.module").then(m => m.AccountLoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
