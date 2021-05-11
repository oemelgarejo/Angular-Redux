import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  ingresosSubs: Subscription;
  constructor(private store: Store<AppState>,
    private ingresoEgresoServ: IngresoEgresoService) { }

  ngOnInit(): void {
  this.userSub = this.store.select('auth')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe(({user}) => {
     this.ingresosSubs = this.ingresoEgresoServ.initIngresosEgresosListener(user.uid)
        .subscribe((ingresosEgresosFB: any) => {
          this.store.dispatch(ingresoEgresoActions.setItems({items: ingresosEgresosFB}));
        })
    })
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
    this.ingresosSubs?.unsubscribe();
  }

}
