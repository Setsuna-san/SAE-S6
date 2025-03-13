import { Component } from '@angular/core';
import { Seance } from '../../models/seance';
import { ApiService } from '../../services/api.service';
import { Etatload } from '../../models/etatLoad';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Sportif } from '../../models/sportif';

@Component({
  selector: 'app-seance-list',
  templateUrl: './seance-list.component.html',
  styleUrls: ['./seance-list.component.css'],
})
export class SeanceListComponent {
  seances: Seance[] = [];
  planningSeances: { [key: string]: Seance[] } = {}; // Structure de données pour le planning
  daysOfWeek: string[] = []; // Liste des jours du planning
  public etatLoad = Etatload.LOADING;
  readonly etatLoading = Etatload;
  public onPersonnal: boolean = false;
  public sportif: Sportif = new Sportif();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.onPersonnal = Boolean(this.route.snapshot.paramMap.get('perso'));

    if (this.authService.currentAuthUserValue.isLogged()) {
      this.apiService
        .getSportifByEMail(this.authService.currentAuthUserValue.email)
        .subscribe({
          next: (data) => {
            this.sportif = data;
          },
        });
    }

    if (this.authService.currentAuthUserValue.isLogged() && this.onPersonnal) {
      this.apiService
        .getSportifByEMail(this.authService.currentAuthUserValue.email)
        .subscribe({
          next: (data) => {
            this.seances = data.seances.map(
              (seance: any) =>
                new Seance(
                  seance.id,
                  new Date(seance.dateHeure),
                  seance.typeSeance,
                  seance.themeSeance,
                  seance.statut,
                  seance.niveauSeance,
                  seance.exercices,
                  seance.coach
                )
            );

            if (this.seances.length > 0) {
              this.planningSeances = this.organizeSeances(this.seances);
              this.daysOfWeek = Object.keys(this.planningSeances);
              this.etatLoad = Etatload.SUCCESS;
            } else {
              this.etatLoad = Etatload.WAITING;
            }
          },
          error: () => (this.etatLoad = Etatload.ERREUR),
        });
    } else {
      this.apiService.getSeances().subscribe({
        next: (data) => {
          this.seances = data.map(
            (seance: any) =>
              new Seance(
                seance.id,
                new Date(seance.date_heure),
                seance.type_seance,
                seance.theme_seance,
                seance.statut,
                seance.niveau_seance,
                seance.exercices,
                seance.coach_id,
                seance.sportifs
              )
          );
          if (this.seances.length > 0) {
            this.planningSeances = this.organizeSeances(this.seances);
            this.daysOfWeek = Object.keys(this.planningSeances);
            this.etatLoad = Etatload.SUCCESS;
          } else {
            this.etatLoad = Etatload.WAITING;
          }
        },
        error: () => (this.etatLoad = Etatload.ERREUR),
      });
    }
  }

  organizeSeances(seances: Seance[]): { [key: string]: Seance[] } {
    const planning: { [key: string]: Seance[] } = {};

    seances.forEach((seance) => {
      const date = seance.date_heure.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });
      const hour = seance.date_heure.getHours();
      if (!planning[date]) {
        planning[date] = [];
      }

      planning[date].push(seance);
    });

    return planning;
  }

  isFull(seance: Seance): boolean {
    switch (seance.type_seance) {
      case 'solo':
        return seance.sportifs.length >= 1;

      case 'duo':
        return seance.sportifs.length >= 2;

      case 'trio':
        return seance.sportifs.length >= 3;

      default:
        return false;
    }
  }

  isSubscribed(seance: Seance): boolean {
    if (this.authService.currentAuthUserValue.isLogged() && this.sportif) {
      let isSubscribed = false;
      this.sportif.seances.forEach((sportifSeance: Seance) => {
        if (sportifSeance.id === seance.id) {
          isSubscribed = true;  // Si on trouve une séance correspondante, on met à true
        }
      });
      return isSubscribed;
    }
    return false;
  }

}
