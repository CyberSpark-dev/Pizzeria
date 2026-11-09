import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioPedidoComponent } from './formulario-pedido';

describe('FormularioPedidoComponent', () => {
  let component: FormularioPedidoComponent;
  let fixture: ComponentFixture<FormularioPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPedidoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioPedidoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
