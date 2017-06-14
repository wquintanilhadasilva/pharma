import { DialogComponent } from './../../shared/dialog/dialog.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Order } from './../../domain/Order';

import { PedidosService } from './../services/pedidos.service';

import { EditarPedidosComponent } from './../editar-pedidos/editar-pedidos.component';
import { ModalComponent } from './../../shared/modal/modal.component';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css']
})
export class SimuladorComponent implements OnInit {

  @ViewChild('modalAprovar') modalAprovar: DialogComponent;
  @ViewChild('modalReprovar') modalReprovar: DialogComponent;

  constructor(private pedidosService: PedidosService, private router: Router) {
  }

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

  onEditarPedido(pedido: Order) {
    // router para o editor do pedido
    this.router.navigate(['/home/simulador', pedido.number, 'editar']);
  }

  fecharDialogo(dlg: DialogComponent) {
    if (dlg != null) {
      dlg.hide();
    }
  }

}
