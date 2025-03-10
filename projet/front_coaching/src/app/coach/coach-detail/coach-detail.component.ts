import { Component, Input } from '@angular/core';
import { Etatload } from '../../models/etatLoad';
import { Coach } from '../../models/coach';
import { Seance } from '../../models/seance';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-coach-detail',
  templateUrl: './coach-detail.component.html',
  styleUrl: './coach-detail.component.css',
})
export class CoachDetailComponent {
  public coach: Coach = new Coach();

  public seances: Seance[] = [];
  public etatLoad = Etatload.LOADING;
  public etatLoadSeances = Etatload.LOADING;

  readonly etatLoading = Etatload;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.coach.id = Number(this.route.snapshot.paramMap.get('id'));

    this.apiService.getCoachById(this.coach.id).subscribe({
      next: (data) => {
        this.etatLoad = Etatload.SUCCESS;
        this.coach = data;
      },
      error: () => (this.etatLoad = Etatload.ERREUR),
    });

    this.apiService.getSeancesByCoachId(this.coach.id).subscribe({
      next: (data) => {
        this.seances = data;
        this.etatLoadSeances = Etatload.SUCCESS;
      },
      error: () => (this.etatLoadSeances = Etatload.ERREUR),
    });
  }
}
