import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { App_Route } from './app.routes';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ToastrModule } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { GlobalErrorHandler } from './core/handlers/globalErrorHandler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(App_Route),
    RouterOutlet,
    ColorPickerModule,
    ColorPickerService,
    provideAnimations(),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    provideHttpClient(),
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebase),
      ToastrModule.forRoot({
        timeOut: 8000, // 15 seconds
        closeButton: true,
        progressBar: true,
        maxOpened:2,
        autoDismiss:true

      })
    ),
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
};
