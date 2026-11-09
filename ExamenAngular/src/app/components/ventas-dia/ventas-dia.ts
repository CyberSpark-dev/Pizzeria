import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzeriaService } from '../../services/pizzeria';

@Component({
  selector: 'app-ventas-dia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas-dia.html',
})
export class VentasDiaComponent {
  criterioBuscar = '';
  ventas: any[] = [];
  totalGeneral = 0;

  constructor(private pizzeriaService: PizzeriaService) {}

  buscarVentas() {
    const criterio = this.criterioBuscar.trim();

    if (!criterio) {
      alert('Escribe un día o mes para consultar las ventas.');
      return;
    }

    this.pizzeriaService.buscarVentas(criterio).subscribe({
      next: (res: any) => {
        this.ventas = res.ventas || [];
        this.totalGeneral = res.total || 0;

        if (this.ventas.length === 0) {
          alert(`No se encontraron ventas para: ${criterio}`);
          return;
        }

        alert(
          `Búsqueda realizada para ${criterio}.\nSe encontraron ${this.ventas.length} ventas.\nTotal: $${this.totalGeneral} .\n De clic de nuevo en "Buscar Ventas" para detalles`,
        );
      },
      error: () => {
        alert('No se pudieron consultar las ventas. Inténtalo nuevamente.');
      },
    });
  }
}
