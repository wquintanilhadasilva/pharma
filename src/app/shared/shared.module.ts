import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ModalComponent } from './modal/modal.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PaginaNaoEncontradaComponent,
    ModalComponent,
    DialogComponent
    ],
  exports: [
    PaginaNaoEncontradaComponent,
    ModalComponent,
    DialogComponent
  ]
})
export class SharedModule { }
