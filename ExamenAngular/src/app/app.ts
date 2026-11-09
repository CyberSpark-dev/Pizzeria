import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioPedidoComponent } from './components/formulario-pedido/formulario-pedido';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido';
import { VentasDiaComponent } from './components/ventas-dia/ventas-dia';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormularioPedidoComponent, DetallePedidoComponent, VentasDiaComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  title = 'frontend';
}
