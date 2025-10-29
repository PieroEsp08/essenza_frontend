import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfumeService } from '../../services/perfume.service';
import { Perfume } from '../../models/perfume.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {

  perfume!: Perfume;

  constructor(
    private route: ActivatedRoute,
    private perfumeService: PerfumeService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
     this.route.paramMap.subscribe((params) => {
    const id = params.get('id');
    if (id) {
      this.perfumeService.getPerfumeById(+id).subscribe((data) => {
        this.perfume = data;
      });
    }
  });
  }

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
