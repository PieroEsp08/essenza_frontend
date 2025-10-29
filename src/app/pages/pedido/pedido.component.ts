import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, ProductoCarrito } from '../../services/cart.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';
import { PedidoDetalle } from '../../models/pedidoDetalle.model';






@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {

   carrito: ProductoCarrito[] = [];
   total: number = 0;
   

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.obtenerCarrito().subscribe(data => {
      this.carrito = data;
      this.calcularTotal();
    });
  }
  

  calcularTotal() {
    this.total = this.carrito.reduce((sum, p) => sum + p.precioActual * p.cantidad, 0);
  }
  

 async confirmarCompra(): Promise<void> {
  // 1) Carrito vacío
  if (this.carrito.length === 0) {
    await Swal.fire({
      icon: 'warning',
      title: 'Carrito vacío',
      text: 'No tienes productos en el carrito.',
      confirmButtonText: 'Entendido',
      customClass: { confirmButton: 'btn btn-primary' },
      buttonsStyling: false
    });
    return;
  }

  // 2) Confirmar intención
  const total = this.total;
  const { isConfirmed } = await Swal.fire({
    title: '¿Confirmar compra?',
    html: `<p>Vas a comprar <strong>${this.carrito.length}</strong> perfumes<br>
           <strong>Total: S/. ${total.toFixed(2)}</strong></p>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, comprar',
    cancelButtonText: 'Cancelar',
    customClass: {
      popup: 'rounded-4 shadow-lg',
      confirmButton: 'btn btn-success me-2',
      cancelButton: 'btn btn-outline-secondary'
    },
    buttonsStyling: false
  });

  if (!isConfirmed) {
    return;
  }

  // 3) Mostrar "procesando" SIN await
  Swal.fire({
    title: 'Procesando...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  // 4) Esperar 2 segundos
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 5) Cerrar modal de carga y mostrar éxito
  Swal.close();
  await Swal.fire({
    title: '¡Compra exitosa!',
    html: `<p>Gracias por tu compra. Hemos registrado tu pedido por <strong>S/. ${total.toFixed(2)}</strong>.</p>`,
    icon: 'success',
    confirmButtonText: 'Aceptar',
    customClass: { confirmButton: 'btn btn-primary' },
    buttonsStyling: false
  });

  // 6) Limpiar y redirigir
  this.cartService.limpiarCarrito();
  this.router.navigate(['/']);
}



   eliminar(id: number) {
    this.cartService.eliminarProducto(id);
    // Volver a cargar el carrito y recalcular total
    this.carrito = this.carrito.filter(p => p.id !== id);
    this.calcularTotal();
  }

  
  cancelarCompra() {
  Swal.fire({
    title: '¿Quieres cancelar?',
    text: 'Se mantendrá tu carrito intacto.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, volver',
    cancelButtonText: 'Seguir comprando',
    customClass: {
      confirmButton: 'btn btn-outline-dark me-2',
      cancelButton: 'btn btn-secondary'
    },
    buttonsStyling: false
  }).then(result => {
    if (result.isConfirmed) {
      this.router.navigate(['/']);
    }
  });
}


}
