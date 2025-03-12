import { Component } from '@angular/core';
import { Seance } from '../../models/seance';
import { ApiService } from '../../services/api.service';
import { Etatload } from '../../models/etatLoad';

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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getSeances().subscribe({
      next: (data) => {
        this.seances = data.map((seance: any) => new Seance(
          seance.id,
          seance.coach_id,
          seance.date_heure, // Convertir la date en objet Date
          seance.type_seance,
          seance.theme_seance,
          seance.statut,
          seance.niveau_seance,
          seance.exercices
        ));

        this.planningSeances = this.organizeSeances(this.seances); // Organiser les séances
        this.daysOfWeek = Object.keys(this.planningSeances); // Extraire les jours du planning
        this.etatLoad = Etatload.SUCCESS;
        console.log(this.planningSeances);

        console.log(this.daysOfWeek);
      },
      error: () => (this.etatLoad = Etatload.ERREUR),
    });
  }

  organizeSeances(seances: Seance[]): { [key: string]: Seance[] } {
    const planning: { [key: string]: Seance[] } = {};

    seances.forEach(seance => {
      const date = seance.date_heure.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
      const hour = seance.date_heure.getHours();

      if (!planning[date]) {
        planning[date] = [];
      }

      planning[date].push(seance);
    });

    return planning;
  }
}
