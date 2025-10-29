import { Component, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Marca } from '../../../models/marca.model';
import { MarcaService } from '../../../services/marca.service';
import { register } from 'swiper/element/bundle';


// Registra los componentes de Swiper
register();

@Component({
  selector: 'app-marca-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marca-carrusel.component.html',
  styleUrl: './marca-carrusel.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MarcaCarruselComponent {

   marcas: Marca[] = [];

  constructor(private marcaService: MarcaService) {}

  ngOnInit(): void {
    this.marcaService.obtenerMarcas().subscribe({
      next: (data) => {
        this.marcas = data.filter(m => m.estado === 1); // Solo marcas activas
      },
      error: (err) => {
        console.error('Error al cargar marcas:', err);
      }
    });
  }
}
