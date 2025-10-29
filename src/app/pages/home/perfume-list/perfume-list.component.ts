import { Component } from '@angular/core';
import { PerfumeService } from '../../../services/perfume.service';
import { Perfume } from '../../../models/perfume.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../../../components/card/card.component";


@Component({
  selector: 'app-perfume-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './perfume-list.component.html',
  styleUrl: './perfume-list.component.css'
})
export class PerfumeListComponent {

  todosPerfumes: Perfume[] = [];
  perfumesMostrados: Perfume[] = [];
  cantidadMostrar = 6;

  constructor(private perfumeService: PerfumeService) {}
  
   ngOnInit(): void {
   this.perfumeService.getPerfumes().subscribe((data: Perfume[]) => {
      this.todosPerfumes = data;
      this.perfumesMostrados = this.todosPerfumes.slice(0, this.cantidadMostrar);
    });
}

verMas(): void {
    this.cantidadMostrar += 6;
    this.perfumesMostrados = this.todosPerfumes.slice(0, this.cantidadMostrar);
  }

  hayMasPerfumes(): boolean {
    return this.perfumesMostrados.length < this.todosPerfumes.length;
  }

}
