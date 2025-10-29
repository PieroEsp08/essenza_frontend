import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PerfumeService } from '../../services/perfume.service';
import { CardComponent } from '../../components/card/card.component'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genero',
  standalone: true,
  imports: [CommonModule,CardComponent],
  templateUrl: './genero.component.html',
  styleUrl: './genero.component.css'
})
export class GeneroComponent {

  perfumes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private perfumeService: PerfumeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.perfumeService.getPerfumesPorGenero(+id).subscribe(data => {
          this.perfumes = data;
        });
      }
    });
  }

}
