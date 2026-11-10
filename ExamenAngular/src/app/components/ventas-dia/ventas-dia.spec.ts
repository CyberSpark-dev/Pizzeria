import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentasDiaComponent } from './ventas-dia';

describe('VentasDiaComponent', () => {
  let component: VentasDiaComponent;
  let fixture: ComponentFixture<VentasDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasDiaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VentasDiaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the selected sale detail', () => {
    const venta = {
      id: 1,
      cliente: 'Ana Pérez',
      fecha: '2026-11-09',
      total: 120,
      detalles: [],
    };

    component.alternarDetalle(venta);
    expect(component.ventaDetalleAbierto).toBe(venta.id);

    component.alternarDetalle(venta);
    expect(component.ventaDetalleAbierto).toBeNull();
  });
});
