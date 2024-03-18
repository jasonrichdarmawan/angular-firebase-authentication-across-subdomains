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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserTransferStateModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => {
      const app = inject(FirebaseApp);
      const auth = getAuth(app);
      if (commonEnvironment.useEmulators && commonEnvironment.emulators?.auth) {
        connectAuthEmulator(auth, `http://127.0.0.1:${commonEnvironment.emulators.auth.port}`);
      }
      return auth;
    }),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => {
      const app = inject(FirebaseApp);
      const functions = getFunctions(app, "asia-east1");
      if (commonEnvironment.useEmulators && commonEnvironment.emulators?.functions.port) {
        connectFunctionsEmulator(functions, "127.0.0.1", commonEnvironment.emulators.functions.port);
      }
      return functions;
    })
  ],
  providers: [
    {
      provide: COMMON_ENVIRONMENT_TOKEN,
      useValue: commonEnvironment,
    },
    ScreenTrackingService,UserTrackingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
