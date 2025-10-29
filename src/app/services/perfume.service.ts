import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfume } from '../models/perfume.model';

@Injectable({
  providedIn: 'root'
})
export class PerfumeService {

    private apiUrl = 'https://essenza-backend.onrender.com/api/perfumes';

  constructor(private http: HttpClient) {}

   // Obtener todos los perfumes
  getPerfumes(): Observable<Perfume[]> {
    return this.http.get<Perfume[]>(this.apiUrl);
  }

    // Obtener un perfume por su ID
  getPerfumeById(id: number): Observable<Perfume> {
    return this.http.get<Perfume>(`${this.apiUrl}/${id}`);
  }
  
    // Obtener perfumes filtrados por género
  getPerfumesPorGenero(idGenero: number): Observable<Perfume[]> {
      return this.http.get<Perfume[]>(`${this.apiUrl}/genero/${idGenero}`);
    }

  // Obtener perfumes por marca
  getPerfumesPorMarca(idMarca: number): Observable<Perfume[]> {
    return this.http.get<Perfume[]>(`${this.apiUrl}/marca/${idMarca}`);
  }

  // Obtener perfumes por categoría
  getPerfumesPorCategoria(idCategoria: number): Observable<Perfume[]> {
    return this.http.get<Perfume[]>(`${this.apiUrl}/categoria/${idCategoria}`);
  }

  // Obtener perfumes por filtros combinados: categoría + género + marca
  getPerfumesPorFiltros(idCategoria: number, idGenero: number, idMarca: number): Observable<Perfume[]> {
    return this.http.get<Perfume[]>(`${this.apiUrl}/filtros?categoriaId=${idCategoria}&generoId=${idGenero}&marcaId=${idMarca}`);
  }


  buscarPorNombre(nombre: string): Observable<Perfume[]> {
    return this.http.get<Perfume[]>(`${this.apiUrl}/buscar?nombre=${nombre}`);
  }


}
