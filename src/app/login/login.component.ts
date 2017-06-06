import { Usuario } from './usuario';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  exibirLoginInvalido = false;

  constructor(private formBuilder: FormBuilder, private autService: AuthService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null],
      senha: [null]
    });
    this.autService.usuarioAutenticadoEmiter.subscribe(
      (result: boolean) => {
        if (!result) {
          this.exibirLoginInvalido = true;
        }
      }
    );
  }

  fazerLogin() {
    console.log(this.formulario.value);
    this.autService.fazerLogin(this.formulario.value);
  }

}
