import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SeanceListComponent } from './seance/seance-list/seance-list.component';
import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { CoachListComponent } from './coach/coach-list/coach-list.component';
import { SeanceItemComponent } from './seance/seance-item/seance-item.component';
import { SportifDetailComponent } from './sportif/sportif-detail/sportif-detail.component';
import { CoachDetailComponent } from './coach/coach-detail/coach-detail.component';
import { MenuComponent } from './menu/menu.component';
import { SeanceDetailComponent } from './seance/seance-detail/seance-detail.component';
import { ExerciceDetailComponent } from './exercice/exercice-detail/exercice-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SeanceListComponent,
    UtilisateurListComponent,
    LoginComponent,
    CoachListComponent,
    SeanceItemComponent,
    SportifDetailComponent,
    CoachDetailComponent,
    MenuComponent,
    SeanceDetailComponent,
    ExerciceDetailComponent,
  ],
  imports: [HttpClientModule, FormsModule, BrowserModule, AppRoutingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
