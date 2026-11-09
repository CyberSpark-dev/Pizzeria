import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PizzeriaService {
  private apiUrl = 'http://127.0.0.1:5000/api/ventas';

  private pedidoTemporal = new BehaviorSubject<any[]>([]);
  pedidoTemporal$ = this.pedidoTemporal.asObservable();

  private reiniciarFormulario = new BehaviorSubject<boolean>(false);
  reiniciarFormulario$ = this.reiniciarFormulario.asObservable();

  constructor(private http: HttpClient) {}

  agregarPizzaTemporal(pizza: any) {
    const pedidoActual = this.pedidoTemporal.value;
    this.pedidoTemporal.next([...pedidoActual, pizza]);
  }

  quitarPizzaTemporal(index: number) {
    const pedidoActual = this.pedidoTemporal.value;
    pedidoActual.splice(index, 1);
    this.pedidoTemporal.next([...pedidoActual]);
  }

  limpiarPedido() {
    this.pedidoTemporal.next([]);
  }

  limpiarFormulario() {
    this.reiniciarFormulario.next(true);
  }

  guardarVenta(venta: any) {
    return this.http.post(this.apiUrl, venta);
  }

  // NUEVO: Método unificado para día o mes
  buscarVentas(criterio: string) {
    return this.http.get(`${this.apiUrl}/buscar/${criterio}`);
  }
}
