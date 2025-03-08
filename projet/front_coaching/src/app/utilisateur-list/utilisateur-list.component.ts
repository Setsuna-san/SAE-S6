import { Component } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrl: './utilisateur-list.component.css'
})
export class UtilisateurListComponent {
  utilisateurs: Utilisateur[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUtilisateurs().subscribe((data: Utilisateur[]) => {
      this.utilisateurs = data;
    });
  }
}
