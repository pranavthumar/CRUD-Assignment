import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLogicComponent } from './main-logic/main-logic.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FetchTokenComponent } from './fetch-token/fetch-token.component';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { Effects } from './store/effects';
import { reducer } from './store/reducer';

@NgModule({
  declarations: [
    AppComponent,
    MainLogicComponent,
    LoginComponent,
    FetchTokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    EntityDataModule.forRoot(entityConfig),
    StoreModule.forRoot({state: reducer}, {}),
    EffectsModule.forRoot([Effects])
  ],
  providers: [

    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
