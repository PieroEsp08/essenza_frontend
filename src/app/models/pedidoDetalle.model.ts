import { Perfume } from "./perfume.model";

export interface PedidoDetalle {
  id?:number;
  perfume: Perfume;
  cantidad: number;
  precioUnitario: number;
}