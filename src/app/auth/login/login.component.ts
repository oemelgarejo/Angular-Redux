import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading: boolean;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  loginUsuario() {
    if (this.loginForm.invalid) return;

    this.store.dispatch(ui.isLoading())

    // Swal.fire({
    //   title: 'Espere por favor!',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })

    const { correo, password } = this.loginForm.value;

    this.authService.loginUsuario(correo, password)
      .then(({ user }) => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        })
      })
  }
}
