import { Component, Input } from '@angular/core';
import { Perfume } from '../../models/perfume.model'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

   @Input() perfume!: Perfume;

    constructor(private cartService: CartService) {}

  agregarAlCarrito() {
    this.cartService.agregarProducto({
      id: this.perfume.id,
      nombre: this.perfume.nombre,
      precioActual: this.perfume.precioActual,
      imagenUrl: this.perfume.imagenUrl,
      cantidad: 1
    });
  }
  
}
