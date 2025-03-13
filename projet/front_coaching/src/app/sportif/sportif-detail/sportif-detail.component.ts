import { Component } from '@angular/core';
import { Seance } from '../../models/seance';
import { Sportif } from '../../models/sportif';
import { Etatload } from '../../models/etatLoad';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sportif-detail',
  templateUrl: './sportif-detail.component.html',
  styleUrl: './sportif-detail.component.css'
})
export class SportifDetailComponent {
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
            this.etatLoad = Etatload.SUCCESS;

          },
          error: () => (this.etatLoad = Etatload.ERREUR),
        });
    }

    else {
      this.router.navigateByUrl("/login");
    }
  }
}
