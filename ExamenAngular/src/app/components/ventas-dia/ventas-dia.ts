import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzeriaService, Venta } from '../../services/pizzeria';

@Component({
  selector: 'app-ventas-dia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas-dia.html',
  styleUrl: './ventas-dia.css',
})
export class VentasDiaComponent {
  criterioBuscar = '';
  ventas: Venta[] = [];
  totalGeneral = 0;
  ventaDetalleAbierto: number | null = null;

  constructor(private pizzeriaService: PizzeriaService) {}

  buscarVentas() {
    const criterio = this.criterioBuscar.trim();

    if (!criterio) {
      alert('Escribe un día o mes para consultar las ventas.');
      return;
    }

    this.pizzeriaService.buscarVentas(criterio).subscribe({
      next: (res: { ventas: Venta[]; total: number }) => {
        this.ventas = res.ventas;
        this.totalGeneral = res.total;
        this.ventaDetalleAbierto = null;

        if (this.ventas.length === 0) {
          alert(`No se encontraron ventas para: ${criterio}`);
          return;
        }

        alert(
          `Búsqueda realizada para ${criterio}.\nSe encontraron ${this.ventas.length} ventas.\nTotal: $${this.totalGeneral}.`,
        );
      },
      error: () => {
        alert('No se pudieron consultar las ventas. Inténtalo nuevamente.');
      },
    });
  }

  alternarDetalle(venta: Venta) {
    this.ventaDetalleAbierto = this.ventaDetalleAbierto === venta.id ? null : venta.id;
  }
}
