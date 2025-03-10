import { Component } from '@angular/core';
import { Seance } from '../../models/seance';
import { ApiService } from '../../services/api.service';
import { Etatload } from '../../models/etatLoad';

@Component({
  selector: 'app-seance-list',
  templateUrl: './seance-list.component.html',
  styleUrl: './seance-list.component.css',
})
export class SeanceListComponent {
  seances: Seance[] = [];
  public etatLoad = Etatload.LOADING;
  readonly etatLoading = Etatload;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getSeances().subscribe({
      next: (data) => {
        this.seances = data;
        this.etatLoad = Etatload.SUCCESS;
      },
      error: () => (this.etatLoad = Etatload.ERREUR),
    });
  }
}
