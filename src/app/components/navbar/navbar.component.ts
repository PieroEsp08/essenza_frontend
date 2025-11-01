import { Component, Output, EventEmitter,ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { GeneroService } from '../../services/genero.service';
import { CartService } from '../../services/cart.service';
import { PerfumeService } from '../../services/perfume.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

   @ViewChild('busquedaRef') busquedaRef!: ElementRef;


  generos: any[] = [];
  cantidadItems: number = 0;
  @Output() toggleCart = new EventEmitter<void>();
  mostrarResultados: boolean = false;



   
  terminoBusqueda: string = '';
  resultados: any[] = [];

   constructor(private router: Router,
               private generosService: GeneroService,
               private cartService: CartService,
               private perfumeService: PerfumeService

   ) {}

  ngOnInit(): void {
    
     // Obtener géneros
    this.generosService.getGeneros().subscribe({
      next: (data) => this.generos = data,
      error: (err) => console.error('Error al cargar categorías:', err)
    });

    // Suscribirse al carrito
    this.cartService.obtenerCarrito().subscribe(productos => {
      this.cantidadItems = productos.reduce((acc, p) => acc + p.cantidad, 0);
    });

  }

  
  
    abrirCarrito() {
      this.toggleCart.emit();
    }

    buscarPerfumes() {
  if (this.terminoBusqueda.trim().length === 0) {
    this.resultados = [];
    this.mostrarResultados = false;
    return;
  }

  this.perfumeService.buscarPorNombre(this.terminoBusqueda)
    .subscribe({
      next: (resp) => {
        this.resultados = resp;
        this.mostrarResultados = resp.length > 0;
      },
      error: (err) => console.error('Error en búsqueda:', err)
    });
}

 @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.busquedaRef && !this.busquedaRef.nativeElement.contains(event.target)) {
      this.mostrarResultados = false;
    }
  }

  onFocusBuscador() {
    if (this.resultados.length > 0) {
      this.mostrarResultados = true;
    }
  }

irADetalle(id: number) {
  this.resultados = [];
  this.terminoBusqueda = '';
  this.router.navigate(['/perfume', id]); // Ajusta según tu ruta
}

}
