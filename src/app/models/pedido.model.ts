import {PedidoDetalle} from './pedidoDetalle.model';
import {Usuario} from './usuario.model';
export interface Pedido {
  id?:number;
  usuario: Usuario;  
  fecha: Date;    
  total: number;
  estado: number;       
  detalles: PedidoDetalle[];
}