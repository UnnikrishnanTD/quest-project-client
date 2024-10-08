import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore, StoreModule } from '@ngrx/store';
import { ErrorInterceptor } from './utils/error-interceptor.interceptor';
import { errorUpdate } from './store/error-reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore(),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    importProvidersFrom(StoreModule.forRoot({error: errorUpdate}))
  ]
};
