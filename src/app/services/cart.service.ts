import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ProductoCarrito {
  id: number;
  nombre: string;
  precioActual: number;
  imagenUrl: string;
  cantidad: number;
}


@Injectable({
  providedIn: 'root'
})
export class CartService {

   private productos: ProductoCarrito[] = [];
  private carrito$ = new BehaviorSubject<ProductoCarrito[]>([]);

  constructor() {
    const guardado = localStorage.getItem('carrito');
    if (guardado) {
      this.productos = JSON.parse(guardado);
      this.carrito$.next(this.productos);
    }
  }

  obtenerCarrito() {
    return this.carrito$.asObservable();
  }

  calcularTotal(): number {
  return this.productos.reduce((total, producto) =>
    total + producto.precioActual * producto.cantidad, 0);
}

  agregarProducto(producto: ProductoCarrito) {
    const existente = this.productos.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      this.productos.push({ ...producto, cantidad: 1 });
    }
    this.actualizarEstado();
  }

  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    this.actualizarEstado();
  }

  limpiarCarrito() {
    this.productos = [];
    this.actualizarEstado();
  }

  private actualizarEstado() {
    this.carrito$.next(this.productos);
    localStorage.setItem('carrito', JSON.stringify(this.productos));
  }

  incrementarCantidad(id: number) {
  const producto = this.productos.find(p => p.id === id);
  if (producto) {
    producto.cantidad += 1;
    this.actualizarEstado();
  }
}

disminuirCantidad(id: number) {
  const producto = this.productos.find(p => p.id === id);
  if (producto && producto.cantidad > 1) {
    producto.cantidad -= 1;
    this.actualizarEstado();
  } 
}

}
