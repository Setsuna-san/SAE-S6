import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SeanceListComponent } from './seance-list/seance-list.component';
import { UtilisateurListComponent } from './utilisateur-list/utilisateur-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '',            component: HomeComponent },
  { path: 'seances',  component: SeanceListComponent },
  { path: 'utilisateurs',  component: UtilisateurListComponent },
  { path: 'login',  component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
