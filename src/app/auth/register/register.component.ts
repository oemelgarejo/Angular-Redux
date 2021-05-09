import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup;
  loading: boolean;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  crearCuenta() {
    if (this.registroForm.invalid) return;
    // Swal.fire({
    //   title: 'Espere por favor!',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })
    this.store.dispatch(ui.isLoading())
    const { nombre, correo, password } = this.registroForm.value;
    this.authService.crearUsuario(nombre, correo, password).then(resp => {
      // user.updateProfile({
      //   displayName: nombre,
      //   photoURL: 'https://scontent.fctg1-4.fna.fbcdn.net/v/t1.18169-9/26992750_10214960025376773_6290384554374190991_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeGi_uxS_hot219i7YgLZat7Soow5Z5RNZlKijDlnlE1mf6aGEosekGSWeXoegwYqzc&_nc_ohc=ZufgDri4VfsAX8jYt3J&_nc_ht=scontent.fctg1-4.fna&oh=2879445a9b5820626e0aac23731f8fc8&oe=60BEEF61'
      // }).then(() => {
        //  Swal.close();
        this.store.dispatch(ui.stopLoading());
         this.router.navigate(['/']);
      // });
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
    });
  }
}
