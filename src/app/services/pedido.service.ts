import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../models/pedido.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

   private apiUrl = 'https://essenza-backend.onrender.com/api/pedidos'; 

  constructor(private http: HttpClient) {}

  crearPedido(pedido: Pedido): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }
}