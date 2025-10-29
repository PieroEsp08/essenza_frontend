import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca.model';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {

   private apiUrl = 'https://essenza-backend.onrender.com/api/marcas';

  constructor(private http: HttpClient) {}

  obtenerMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl);
  }
}
