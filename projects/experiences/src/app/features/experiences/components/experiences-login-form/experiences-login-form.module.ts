import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperiencesLoginFormComponent } from './experiences-login-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ExperiencesLoginFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ExperiencesLoginFormComponent,
  ],
})
export class ExperiencesLoginFormModule { }
