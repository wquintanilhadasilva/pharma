import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ModalComponent } from './modal/modal.component';
import { DialogComponent } from './dialog/dialog.component';
import { MarginColorPipe } from './pipes/margin-color.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PaginaNaoEncontradaComponent,
    ModalComponent,
    DialogComponent,
    MarginColorPipe
    ],
  exports: [
    PaginaNaoEncontradaComponent,
    ModalComponent,
    DialogComponent,
    MarginColorPipe
  ]
})
export class SharedModule { }
