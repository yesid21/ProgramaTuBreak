import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { DatosComponent } from './datos/datos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DatosComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'datos', component: DatosComponent },
      { path: '**', component: HomeComponent },
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production, registrationStrategy: 'registerImmediately'
    }),
    FontAwesomeModule,
    NgSelectModule
  ],
  exports: [
    FontAwesomeModule,
    NgSelectModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private library: FaIconLibrary
  ) {
    this.library.addIconPacks(fas, fab);
  }
}
