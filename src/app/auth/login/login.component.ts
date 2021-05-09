import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginUsuario() {
    if (this.loginForm.invalid) return;

    Swal.fire({
      title: 'Espere por favor!',
      didOpen: () => {
        Swal.showLoading()
      }
    })

    const { correo, password } = this.loginForm.value;

    this.authService.loginUsuario(correo, password)
      .then(({user}) => {
        Swal.close();
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
