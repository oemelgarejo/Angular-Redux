import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: any[] = [];
  itemsSubs: Subscription;
  constructor(private store: Store<AppStateIngreso>,
    private ingresoEgresoServ: IngresoEgresoService) { }

  ngOnInit(): void {
    this.itemsSubs = this.store.select('ingresosEgresos')
      .subscribe(({items}) => this.ingresosEgresos = items);
  }

  borrar(uid: string) {
    this.ingresoEgresoServ.borrarIngresoEgreso(uid)
    .then(() => {
      Swal.fire('Borrado', 'Item borrado', 'success');
    })
    .catch(error => Swal.fire('Error', error.message, 'error'));
  }

  ngOnDestroy() {
    this.itemsSubs.unsubscribe();
  }

}
