import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { PedidosService } from './../services/pedidos.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {

  @Output() aprovarPedido = new EventEmitter();
  @Output() reprovarPedido = new EventEmitter();
  @Output() editarPedido = new EventEmitter();

  constructor(public pedidosService: PedidosService) {}

  ngOnInit() {}

  aprovar(pedido) {
    this.aprovarPedido.emit(pedido);
  }
  reprovar(pedido) {
    this.reprovarPedido.emit(pedido);
  }
  editar(pedido) {
    this.editarPedido.emit(pedido);
  }

}
