import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';
import { ApiService } from '../services/api.service';
import { Etatload } from '../models/etatLoad';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrl: './utilisateur-list.component.css',
})
export class UtilisateurListComponent implements OnInit{
  utilisateurs: Utilisateur[] = [];

  public etatLoad = Etatload.LOADING;
  readonly etatLoading = Etatload;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.getUtilisateurs().subscribe({
      next: (data) => {
        this.utilisateurs = data;
        this.etatLoad = Etatload.SUCCESS;
      },
      error: () => (this.etatLoad = Etatload.ERREUR),
    });
  }
}
