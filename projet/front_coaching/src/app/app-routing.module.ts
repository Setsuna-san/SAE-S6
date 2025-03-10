import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SeanceListComponent } from './seance/seance-list/seance-list.component';
import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import { LoginComponent } from './login/login.component';
import { CoachListComponent } from './coach/coach-list/coach-list.component';
import { CoachDetailComponent } from './coach/coach-detail/coach-detail.component';

const routes: Routes = [
  { path: '',            component: HomeComponent },
  { path: 'seances',  component: SeanceListComponent },
  { path: 'coachs',  component: CoachListComponent },
  { path: 'coach/:id',  component: CoachDetailComponent },
  { path: 'login',  component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
