import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PizzeriaService } from "../../services/pizzeria";

@Component({
  selector: "app-detalle-pedido",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./detalle-pedido.html",
})
export class DetallePedidoComponent implements OnInit {
  pizzas: any[] = [];
  totalPedido = 0;

  constructor(
    private pizzeriaService: PizzeriaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.pizzeriaService.pedidoTemporal$.subscribe((pizzas: any[]) => {
      this.pizzas = [...pizzas];
      this.totalPedido = this.pizzas.reduce(
        (acc, curr) => acc + (curr.subtotal || 0),
        0,
      );
      this.cdr.detectChanges();
    });
  }

  quitarPizza(index: number) {
    if (index < 0 || index >= this.pizzas.length) {
      alert("No hay una pizza seleccionada para quitar.");
      return;
    }

    const pizzaEliminada = this.pizzas[index];
    this.pizzeriaService.quitarPizzaTemporal(index);
    this.cdr.detectChanges();
    alert(
      `Pizza eliminada del detalle del pedido.\nTamaño: ${pizzaEliminada.tamano}\nSubtotal: $${pizzaEliminada.subtotal}`,
    );
  }

  quitarUltimaPizza() {
    if (this.pizzas.length === 0) {
      alert("El pedido ya está vacío, no hay pizzas para quitar.");
      return;
    }

    this.quitarPizza(this.pizzas.length - 1);
  }

  terminarPedido() {
    if (this.pizzas.length === 0) {
      alert(
        "Por favor, agrega al menos una pizza a la tabla antes de terminar el pedido.",
      );
      return;
    }

    const datosCliente = this.pizzas[0].cliente || {};
    const clienteValido =
      datosCliente.nombre &&
      datosCliente.direccion &&
      datosCliente.telefono &&
      datosCliente.fecha;

    if (!clienteValido) {
      alert(
        "Completa nombre, dirección, teléfono y fecha antes de registrar el pedido.",
      );
      return;
    }

    const confirmado = window.confirm(
      `¿Deseas confirmar este pedido con total de $${this.totalPedido}?`,
    );

    if (!confirmado) {
      alert("Pedido cancelado sin enviar a la base de datos.");
      return;
    }

    const ventaFinal = {
      ...datosCliente,
      total: this.totalPedido,
      detalles: this.pizzas,
    };

    this.pizzeriaService.guardarVenta(ventaFinal).subscribe({
      next: () => {
        alert(
          `Confirmación: El importe total a pagar es $${this.totalPedido}\n¡Venta registrada exitosamente en MySQL!`,
        );
        this.pizzeriaService.limpiarPedido();
        this.pizzeriaService.limpiarFormulario();
      },
      error: (err) => {
        console.error("Error del servidor:", err);
        alert(
          "Error de conexión con Flask. Abre la consola (F12) para ver los detalles.",
        );
      },
    });
  }
}
