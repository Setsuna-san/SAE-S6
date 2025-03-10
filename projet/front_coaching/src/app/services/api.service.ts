import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';
import { Utilisateur } from '../models/utilisateur';
import { Seance } from '../models/seance';
import { Coach } from '../models/coach';
import { Exercice } from '../models/exercice';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://localhost:8008/api'; // URL de notre API

  constructor(private http: HttpClient) {}

  // Lister les catégories
  getSeances(): Observable<Seance[]> {
    return this.http.get<Seance[]>(`${this.apiUrl}/seances`);
  }

  getSeanceById(id : number): Observable<Seance> {
    return this.http.get<Seance>(`${this.apiUrl}/seance/${id}`);
  }

  getSeancesByCoachId(id : number): Observable<Seance[]> {
    return this.http.get<Seance[]>(`${this.apiUrl}/coach/${id}/seances`);
  }

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/utilisateurs`);
  }

  getUtilisateurById(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/utilisateurs`);
  }

  getCoachs(): Observable<Coach[]> {
    return this.http.get<Coach[]>(`${this.apiUrl}/coachs`);
  }

  getCoachById(id: number ): Observable<Coach> {
    return this.http.get<Coach>(`${this.apiUrl}/coach/${id}`);
  }

  getExercices(): Observable<Exercice[]> {
    return this.http.get<Exercice[]>(`${this.apiUrl}/exercices`);
  }

  getExerciceByID(id: number): Observable<Exercice> {
    return this.http.get<Exercice>(`${this.apiUrl}/exercice/${id}`);
  }

  getExercicesBySeanceId(id : number): Observable<Exercice[]> {
    return this.http.get<Exercice[]>(`${this.apiUrl}/seance/${id}/exercices`);
  }


}
