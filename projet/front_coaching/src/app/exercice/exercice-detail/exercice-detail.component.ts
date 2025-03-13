import { Component } from '@angular/core';
import { Exercice } from '../../models/exercice';
import { Etatload } from '../../models/etatLoad';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-exercice-detail',
  templateUrl: './exercice-detail.component.html',
  styleUrl: './exercice-detail.component.css',
})
export class ExerciceDetailComponent {
  public exercice: Exercice = new Exercice();
  public etatLoad = Etatload.LOADING;
  readonly etatLoading = Etatload;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    this.exercice.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.exercice.id > 0) {
      this.apiService
        .getExerciceByID(this.exercice.id)
        .subscribe({
          next: (data) => {
            this.exercice = new Exercice(
              data.id,
              data.nom,
              data.description,
              data.duree_estimee,
              data.difficulte
            );
            this.etatLoad = Etatload.SUCCESS;
          },
          error: () => (this.etatLoad = Etatload.ERREUR),
        });
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
