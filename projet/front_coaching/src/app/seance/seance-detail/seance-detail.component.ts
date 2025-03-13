import { Component } from '@angular/core';
import { Etatload } from '../../models/etatLoad';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Seance } from '../../models/seance';
import { Coach } from '../../models/coach';
import { AuthService } from '../../services/auth.service';
import { Sportif } from '../../models/sportif';

@Component({
  selector: 'app-seance-detail',
  templateUrl: './seance-detail.component.html',
  styleUrl: './seance-detail.component.css',
})
export class SeanceDetailComponent {
  public coach: Coach = new Coach();
  public dureeTotal: number = 0;

  public seance: Seance = new Seance();
  public sportif: Sportif = new Sportif();

  public etatLoad = Etatload.LOADING;
  public etatLoadSeance = Etatload.LOADING;

  readonly etatLoading = Etatload;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.seance.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.authService.currentAuthUserValue.isLogged()) {
      this.apiService
        .getSportifByEMail(this.authService.currentAuthUserValue.email)
        .subscribe({
          next: (data) => {
            this.sportif = data;
          },
        });
    }

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
    this.seance.exercices.forEach((element) => {
      this.dureeTotal = this.dureeTotal + element.duree_estimee;
    });
  }

  isFull(): boolean {
    switch (this.seance.type_seance) {
      case 'solo':
        return this.seance.sportifs.length >= 1;

      case 'duo':
        return this.seance.sportifs.length >= 2;

      case 'trio':
        return this.seance.sportifs.length >= 3;

      default:
        return false;
    }
  }

  isSubscribed(): boolean {
    if (this.authService.currentAuthUserValue.isLogged() && this.sportif) {
      let isSubscribed = false;
      this.sportif.seances.forEach((sportifSeance: Seance) => {
        if (sportifSeance.id === this.seance.id) {
          isSubscribed = true; // Si on trouve une séance correspondante, on met à true
        }
      });
      return isSubscribed;
    }
    return false;
  }

  join() {
    if (this.authService.currentAuthUserValue.isLogged() && this.sportif) {
      this.apiService.joinSeance(this.sportif.id, this.seance.id).subscribe({
        next: () => {
          this.router.navigateByUrl('/seances/true');
        },
        error: () => (this.etatLoad = Etatload.ERREUR),
      });
    }
  }

  leave() {
    if (this.authService.currentAuthUserValue.isLogged() && this.sportif) {
      this.apiService.leaveSeance(this.sportif.id, this.seance.id).subscribe({
        next: () => {
          this.router.navigateByUrl('/seances/true');
        },
        error: () => (this.etatLoad = Etatload.ERREUR),
      });
    }

  }
}
