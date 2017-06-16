import { FaturamentoService } from './../services/faturamento.service';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Order } from './../../domain/Order';

@Component({
  selector: 'app-editar-pedidos',
  templateUrl: './editar-pedidos.component.html',
  styleUrls: ['./editar-pedidos.component.css']
})
export class EditarPedidosComponent implements OnInit, OnDestroy {

  styleView = '{visibility: (showEditar ? \'hidden\' : \'\'), height: (showEditar ? \'80px\' : \'100%\')}';
  // {visibility: (showEditar ? 'hidden' : '', height: (showEditar ? '80px' : '100%')}
  pedido: Order;

  itemSelecionado;

  subscricao: Subscription;

  showEditar = false;

  cssDisabled = 'pointer-events:none;';

  constructor(
    private activateRouted: ActivatedRoute,
    private route: Router,
    private faturamentoService: FaturamentoService
  ) { }

  ngOnInit() {
    this.subscricao = this.activateRouted.data.subscribe(
      (info: {pedido: Order}) => {
        this.pedido = info.pedido;
      }
    );
  }

  voltar() {
    this.route.navigate(['/home/simulador']);
  }

  ngOnDestroy() {
    this.subscricao.unsubscribe();
  }

  remover(p) {
    console.log(p);
    // TODO implementar a exlcusão do item
  }

  editar(item) {
    this.itemSelecionado = item;
    this.showEditar = true;
    // TODO implementar a edição do item
  }

  closeEditar(value) {
    this.showEditar = false;
    this.itemSelecionado = null;
  }

}
