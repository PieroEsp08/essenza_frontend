import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerCarruselComponent } from './banner-carrusel/banner-carrusel.component';
import { PerfumeListComponent } from './perfume-list/perfume-list.component';
import { MarcaCarruselComponent } from './marca-carrusel/marca-carrusel.component';
import { CategoriaCardComponent } from "./categoria-card/categoria-card.component";
import { GeneroCardComponent } from "./genero-card/genero-card.component";
import { PromocionesComponent } from "./promociones/promociones.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BannerCarruselComponent, PerfumeListComponent, MarcaCarruselComponent, CategoriaCardComponent, GeneroCardComponent, PromocionesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
