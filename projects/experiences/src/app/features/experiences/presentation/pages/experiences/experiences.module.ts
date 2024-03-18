import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperiencesRoutingModule } from './experiences-routing.module';
import { ExperiencesPage } from './experiences.page';
import { ExperiencesLoginFormModule } from '../../../components/experiences-login-form/experiences-login-form.module';
import { ExperiencesUserModule } from '../../../components/experiences-user/experiences-user.module';

@NgModule({
  declarations: [
    ExperiencesPage
  ],
  imports: [
    CommonModule,
    ExperiencesRoutingModule,
    ExperiencesUserModule,
    ExperiencesLoginFormModule,
  ]
})
export class ExperiencesModule { }
