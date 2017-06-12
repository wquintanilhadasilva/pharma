import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Order } from './../../domain/Order';

import { PedidosService } from './../services/pedidos.service';
import { ModalComponent } from './../../shared/modal/modal.component';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css']
})
export class SimuladorComponent implements OnInit {

  @ViewChild('modalAprovar') modalAprovar: ModalComponent;
  @ViewChild('modalReprovar') modalReprovar: ModalComponent;

  constructor(private pedidosService: PedidosService) { }

  ngOnInit() {
  }

  onAprovarPedido(pedido) {
    this.modalAprovar.show(pedido);
  }

  confirmeAprovar(pedido) {
    console.log(pedido);
    console.log('aprovado!');
     this.fecharDialogo(this.modalAprovar);
  }

  onRejeitarPedido(pedido) {
    this.modalReprovar.show(pedido);
  }

  confirmeReprovar(pedido) {
    console.log(pedido);
    console.log('reprovado!');
    this.fecharDialogo(this.modalReprovar);
  }

  onEditarPedido(pedido) {
    console.log('Editar');
    console.log(pedido);
  }

  fecharDialogo(dlg: ModalComponent) {
    if (dlg != null) {
      dlg.hide();
    }
  }

}
