import { Component } from '@angular/core';
import { Coach } from '../../models/coach';
import { Etatload } from '../../models/etatLoad';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrl: './coach-list.component.css'
})
export class CoachListComponent {
 coachs: Coach[] = [];

  public etatLoad = Etatload.LOADING;
  readonly etatLoading = Etatload;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.getCoachs().subscribe({
      next: (data) => {
        this.coachs = data;
        this.etatLoad = Etatload.SUCCESS;
      },
      error: () => (this.etatLoad = Etatload.ERREUR),
    });
  }
}
