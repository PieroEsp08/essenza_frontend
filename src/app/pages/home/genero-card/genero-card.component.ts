import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneroService } from '../../../services/genero.service';
import { Genero } from '../../../models/genero.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-genero-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genero-card.component.html',
  styleUrl: './genero-card.component.css'
})
export class GeneroCardComponent {

   generos: Genero[] = [];
  
    constructor(private generoService: GeneroService, private router: Router) {}
  
    ngOnInit(): void {
      this.generoService.getGeneros().subscribe({
        next: (data) => {
          this.generos = data.filter(c => c.estado === 1);
        },
        error: (err) => console.error('Error al cargar generos:', err)
      });
    }
  
    irAGenero(generoId: number) {
      this.router.navigate(['/productos'], { queryParams: { genero: generoId } });
    }


}
