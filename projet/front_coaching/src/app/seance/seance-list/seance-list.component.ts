import { Component } from '@angular/core';
import { Seance } from '../../models/seance';
import { ApiService } from '../../services/api.service';
import { Etatload } from '../../models/etatLoad';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.currentAuthUserValue.isLogged()) {
      this.apiService.getSportif();

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
                seance.coach_id
              )
          );

          this.planningSeances = this.organizeSeances(this.seances);
          this.daysOfWeek = Object.keys(this.planningSeances);
          this.etatLoad = Etatload.SUCCESS;
          console.log(this.planningSeances);

          console.log(this.daysOfWeek);
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
      case 'Solo':
        if (seance.exercices.length >= 1) {
          return true;
        }
        return false;
        break;
      case 'Duo':
        if (seance.exercices.length >= 2) {
          return true;
        }
        return false;
        break;
      case 'Trio':
        if (seance.exercices.length >= 3) {
          return true;
        }
        return false;
        break;

      default:
        return false;
        break;
    }
  }
}
