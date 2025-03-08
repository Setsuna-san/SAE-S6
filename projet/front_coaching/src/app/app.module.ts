import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SeanceListComponent } from './seance-list/seance-list.component';
import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SeanceListComponent,
    UtilisateurListComponent,
    LoginComponent,
  ],
  imports: [HttpClientModule, FormsModule, BrowserModule, AppRoutingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
