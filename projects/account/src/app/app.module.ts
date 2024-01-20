import { NgModule, inject } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { commonEnvironment } from 'projects/common/environments/environment';
import { COMMON_ENVIRONMENT_TOKEN } from 'projects/common/environments/environment.interface';
import { FirebaseApp, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions, connectFunctionsEmulator } from '@angular/fire/functions';
import { ENVIRONMENT } from '../environments/environment.interface';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserTransferStateModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      if (commonEnvironment.useEmulators) {
        connectAuthEmulator(auth, `http://127.0.0.1:${commonEnvironment.emulators!.auth.port}`);
      }
      return auth;
    }),
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => {
      const app = inject(FirebaseApp);
      const functions = getFunctions(app, "asia-east1");
      if (commonEnvironment.useEmulators) {
        connectFunctionsEmulator(functions, "127.0.0.1", commonEnvironment.emulators!.functions.port);
      }
      return functions;
    })
  ],
  providers: [
    { 
      provide: COMMON_ENVIRONMENT_TOKEN,
      useValue: commonEnvironment,
    },
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
    ScreenTrackingService,
    UserTrackingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
