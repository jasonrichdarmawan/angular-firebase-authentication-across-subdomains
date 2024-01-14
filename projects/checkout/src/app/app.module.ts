import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
// import { getAnalytics } from 'firebase/analytics';
import { COMMON_ENVIRONMENT_TOKEN } from 'projects/common/environments/environment.interface';
import { commonEnvironment } from 'projects/common/environments/environment';

const app = initializeApp(environment.firebase);

/**
 * @todo issue with Cloud Function
 */
// const analytics = getAnalytics(app);
// const analytics = getAnalytics(app);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule
  ],
  providers: [
    {
      provide: COMMON_ENVIRONMENT_TOKEN,
      useValue: commonEnvironment,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
