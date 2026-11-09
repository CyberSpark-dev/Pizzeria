import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PizzeriaService } from '../../services/pizzeria';

@Component({
  selector: 'app-formulario-pedido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-pedido.html',
})
export class FormularioPedidoComponent implements OnInit {
  pedidoForm: FormGroup;
  preciosTamano: any = { Chica: 40, Mediana: 80, Grande: 120 };
  mensajeAccion = '';
  mostrarAlertaAgregado = false;

  constructor(
    private fb: FormBuilder,
    private pizzeriaService: PizzeriaService,
  ) {
    this.pedidoForm = this.fb.group({
      nombre: [''],
      direccion: [''],
      telefono: [''],
      fecha: [''],
      tamano: ['Chica', Validators.required],
      jamon: [false],
      pina: [false],
      champinones: [false],
      num_pizzas: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.pizzeriaService.reiniciarFormulario$.subscribe((reiniciar) => {
      if (reiniciar) {
        this.pedidoForm.reset({
          nombre: '',
          direccion: '',
          telefono: '',
          fecha: '',
          tamano: 'Chica',
          jamon: false,
          pina: false,
          champinones: false,
          num_pizzas: 1,
        });
      }
    });
  }

  cerrarAlertaAgregado() {
    this.mostrarAlertaAgregado = false;
    this.mensajeAccion = '';
  }

  agregarPizza() {
    const form = this.pedidoForm.value;

    if (!form.tamano) {
      alert('Selecciona el tamaño de la pizza antes de agregarla.');
      return;
    }

    if (!form.num_pizzas || form.num_pizzas < 1) {
      alert('La cantidad de pizzas debe ser mayor o igual a 1.');
      return;
    }

    let ingredientes = [];
    let costoIngredientes = 0;

    if (form.jamon) {
      ingredientes.push('Jamón');
      costoIngredientes += 10;
    }
    if (form.pina) {
      ingredientes.push('Piña');
      costoIngredientes += 10;
    }
    if (form.champinones) {
      ingredientes.push('Champiñones');
      costoIngredientes += 10;
    }

    const precioBase = this.preciosTamano[form.tamano];
    const subtotal = (precioBase + costoIngredientes) * form.num_pizzas;

    const pizza = {
      tamano: form.tamano,
      ingredientes: ingredientes,
      num_pizzas: form.num_pizzas,
      subtotal: subtotal,
      cliente: {
        nombre: form.nombre,
        direccion: form.direccion,
        telefono: form.telefono,
        fecha: form.fecha,
      },
    };

    this.pizzeriaService.agregarPizzaTemporal(pizza);

    this.mensajeAccion = `Pizza agregada correctamente. Tamaño ${form.tamano} precio $${subtotal}. Ingredientes: ${ingredientes.join(', ') || 'Ninguno'}.`;
    this.mostrarAlertaAgregado = true;

    this.pedidoForm.patchValue({
      tamano: 'Chica',
      jamon: false,
      pina: false,
      champinones: false,
      num_pizzas: 1,
    });

    setTimeout(() => {
      this.mostrarAlertaAgregado = false;
      this.mensajeAccion = '';
    }, 3000);
  }
}
