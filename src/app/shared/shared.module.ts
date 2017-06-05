import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PaginaNaoEncontradaComponent
    ],
  exports:[
    PaginaNaoEncontradaComponent
  ]
})
export class SharedModule { }
