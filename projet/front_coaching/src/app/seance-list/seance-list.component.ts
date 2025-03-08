import { Component } from '@angular/core';
import { Seance } from '../models/seance';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-seance-list',
  templateUrl: './seance-list.component.html',
  styleUrl: './seance-list.component.css'
})
export class SeanceListComponent {
  seances: Seance[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getSeances().subscribe((data: Seance[]) => {
      this.seances = data;
    });
  }


}
