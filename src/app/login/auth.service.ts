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

    if (!this.checkNullOrEmpty(usuario)) {

      sessionStorage.setItem(this.loginKey, this.loginKeyValueFalse);
      this.usuarioAutenticadoEmiter.emit(false);

    } else {

      // TODO Injetar o serviço e validar no servidor...
      if ( usuario.nome === 'usuario@email.com' && usuario.senha === '123456') {
        sessionStorage.setItem(this.loginKey, this.loginKeyValueTrue);
        this.usuarioAutenticadoEmiter.emit(true);
        this.router.navigate(['/']);
      } else {
        sessionStorage.setItem(this.loginKey, this.loginKeyValueFalse);
        this.usuarioAutenticadoEmiter.emit(false);
      }

    }

  }

  checkNullOrEmpty(usuario: Usuario): boolean {

    if (usuario === null) {
      return false;
    }

    if (usuario.nome === null || usuario.nome === '') {
      return false;
    }

    if (usuario.senha === null || usuario.senha === '') {
      return false;
    }

    return true;

  }

  usuarioEstaAutenticado(): boolean {
    const logado = sessionStorage.getItem(this.loginKey);
    return logado === this.loginKeyValueTrue ? true : false;
  }

}
