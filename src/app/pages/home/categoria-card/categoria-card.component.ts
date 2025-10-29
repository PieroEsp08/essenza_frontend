import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categoria-card',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './categoria-card.component.html',
  styleUrl: './categoria-card.component.css'
})
export class CategoriaCardComponent {

   categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService, private router: Router) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data.filter(c => c.estado === 1);
      },
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  irACategoria(categoriaId: number) {
    this.router.navigate(['/productos'], { queryParams: { categoria: categoriaId } });
  }

}
