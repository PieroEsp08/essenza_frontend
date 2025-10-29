import { Categoria } from './categoria.model';
import { Genero } from './genero.model';
import { Marca } from './marca.model';

export interface Perfume {
  id: number;
  nombre: string;
  descripcion: string;
  precioOriginal: number;
  precioActual: number;
  descuento: number;
  stock: number;
  imagenUrl: string;
  fechaCreacion: Date;
  estado: number;
  categoria: Categoria;
  genero: Genero;
  marca: Marca;
}