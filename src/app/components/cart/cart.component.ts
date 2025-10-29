import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, ProductoCarrito } from '../../services/cart.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  carrito: ProductoCarrito[] = [];

  @Input() visible = false;
  @Output() cerrarCart = new EventEmitter<void>();

  cerrar() {
    this.cerrarCart.emit();
  }

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.obtenerCarrito().subscribe(data => {
      this.carrito = data;
    });
  }

  
  incrementar(id: number) {
    this.cartService.incrementarCantidad(id);
  }

  disminuir(id: number) {
    this.cartService.disminuirCantidad(id);
  }

  eliminar(id: number) {
    this.cartService.eliminarProducto(id);
  }

  limpiarCarrito() {
    this.cartService.limpiarCarrito();
  }

  calcularTotal() {
    return this.cartService.calcularTotal().toFixed(2);
  }



  async irAPedido(): Promise<void> {
    // 1) Si el carrito está vacío
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

    // 2) Confirmar intención de compra
    const total = this.carrito.reduce((sum, p) => sum + p.precioActual * p.cantidad, 0);
    const { isConfirmed } = await Swal.fire({
      title: '¿Proceder a la compra?',
      html: `<p>Vas a comprar <strong>${this.carrito.length}</strong> perfumes<br>
             <strong>Total: S/. ${total.toFixed(2)}</strong></p>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
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

     this.cerrarCart.emit();

    // 3) Redirigir a la página de pedido
    this.router.navigate(['/pedido']);
  }
}
