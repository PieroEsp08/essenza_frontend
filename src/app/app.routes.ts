import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { GeneroComponent } from './pages/genero/genero.component';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { PedidoComponent } from './pages/pedido/pedido.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '', component: CartComponent },
    {path: 'genero/:id', component: GeneroComponent },
    {path: 'quienes-somos', component: QuienesSomosComponent},
    {path: 'perfume/:id', component: DetalleComponent},
    {path: 'pedido', component: PedidoComponent }
];
