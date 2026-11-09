import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentasDia } from './ventas-dia';

describe('VentasDia', () => {
  let component: VentasDia;
  let fixture: ComponentFixture<VentasDia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasDia],
    }).compileComponents();

    fixture = TestBed.createComponent(VentasDia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
