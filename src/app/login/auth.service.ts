import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './usuario';

@Injectable()
export class AuthService {

  private loginKey = 'isLoggedIn';
  private loginKeyValueTrue = 'true';
  private loginKeyValueFalse = 'false';

  usuarioAutenticadoEmiter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario) {
    // TODO Injetar o serviço e validar no servidor...
    if (usuario.nome === 'usuario@email.com' && usuario.senha === '123456') {
      localStorage.setItem(this.loginKey, this.loginKeyValueTrue);
      this.usuarioAutenticadoEmiter.emit(true);
      this.router.navigate(['/']);
    } else {
      localStorage.setItem(this.loginKey, this.loginKeyValueFalse);
      this.usuarioAutenticadoEmiter.emit(false);
    }
  }

  usuarioEstaAutenticado(): boolean {
    const logado = localStorage.getItem(this.loginKey);
    return logado === this.loginKeyValueTrue ? true : false;
  }

}
