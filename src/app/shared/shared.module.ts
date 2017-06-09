import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PaginaNaoEncontradaComponent,
    ModalComponent
    ],
  exports: [
    PaginaNaoEncontradaComponent,
    ModalComponent
  ]
})
export class SharedModule { }
