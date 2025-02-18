import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://localhost:8008/api'; // URL de notre API

  constructor(private http: HttpClient) {}

  // Lister les catégories
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/categories`);
  }
}
