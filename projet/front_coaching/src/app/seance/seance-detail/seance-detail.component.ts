import { Component } from '@angular/core';
import { Etatload } from '../../models/etatLoad';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Seance } from '../../models/seance';
import { Coach } from '../../models/coach';

@Component({
  selector: 'app-seance-detail',
  templateUrl: './seance-detail.component.html',
  styleUrl: './seance-detail.component.css',
})
export class SeanceDetailComponent {
  public coach: Coach = new Coach();
  public dureeTotal : number = 0 ;

  public seance: Seance = new Seance() ;
  public etatLoad = Etatload.LOADING;
  public etatLoadSeance = Etatload.LOADING;

  readonly etatLoading = Etatload;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.seance.id = Number(this.route.snapshot.paramMap.get('id'));

    this.apiService.getSeanceById(this.seance.id).subscribe({
      next: (data) => {
        this.seance = data ;
        this.etatLoadSeance = Etatload.SUCCESS;
        this.apiService.getCoachById(this.seance.coachId).subscribe({
          next: (data) => {
            this.totalDuree();
            this.coach = data;
            this.etatLoad = Etatload.SUCCESS;
          },
          error: () => (this.etatLoad = Etatload.ERREUR),
        });
      },
      error: () => (this.etatLoadSeance = Etatload.ERREUR),
    });


  }

  private totalDuree() {

    this.seance.exercices.forEach(element => {
      this.dureeTotal = this.dureeTotal + element.duree_estimee ;
    });
  }



}
