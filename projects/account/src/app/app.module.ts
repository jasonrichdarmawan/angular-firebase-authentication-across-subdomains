import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { getAnalytics } from 'firebase/analytics';
import { commonEnvironment } from 'projects/common/environments/environment';
import { COMMON_ENVIRONMENT_TOKEN, CommonEnvironment } from 'projects/common/environments/environment.interface';

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { 
      provide: COMMON_ENVIRONMENT_TOKEN,
      useValue: commonEnvironment,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
