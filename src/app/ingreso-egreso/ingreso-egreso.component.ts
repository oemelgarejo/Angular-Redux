import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm: FormGroup;
  tipo: string = 'I';
  loading: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder, private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
   this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
    this.ingresoForm = this.fb.group({
      description: ['', Validators.required],
      monto: ['', Validators.required],

    })
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  guardar() {
    this.store.dispatch(ui.isLoading())
    if (this.ingresoForm.invalid) return;

    const { description, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(description, monto, this.tipo);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        Swal.fire('Registro creado', description, 'success');
        this.store.dispatch(ui.stopLoading());
      })
      .catch(error => {
        Swal.fire('Error', error.message, 'error');
        this.store.dispatch(ui.stopLoading());
      });
  }

}
