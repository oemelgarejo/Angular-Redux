import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  userSubs: Subscription;
  usuario = {
    nombre: '',
    photoUrl: ''
  }
  constructor(private authService: AuthService,
    private store: Store<AppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth')
      .pipe(
        filter(({user}) => user != null)
      )
      .subscribe(({user}) => {
          this.usuario.nombre = user.nombre;
      })
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });

  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }
}
