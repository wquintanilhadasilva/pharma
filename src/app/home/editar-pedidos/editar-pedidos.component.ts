import { PedidosService } from './../services/pedidos.service';
import { ItemOrder } from './../../domain/ItemOrder';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { FaturamentoService } from './../services/faturamento.service';
import { EditarItemPedidoComponent } from './../editar-item-pedido/editar-item-pedido.component';
import { Order } from './../../domain/Order';

@Component({
  selector: 'app-editar-pedidos',
  templateUrl: './editar-pedidos.component.html',
  styleUrls: ['./editar-pedidos.component.css']
})
export class EditarPedidosComponent implements OnInit, OnDestroy {

  pedido: Order;
  itemSelecionado;
  subscricao: Subscription;

  @ViewChild('editarItem') editarItem: EditarItemPedidoComponent;

  constructor(
    private activateRouted: ActivatedRoute,
    private route: Router,
    private faturamentoService: FaturamentoService,
    private pedidosService: PedidosService
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
    this.editarItem.show(item, this.pedido);
  }

  closeEditar(value) {
    // se houve mudanças, atualiza o valor na lista
    if (value.confirmado) {
      this.mudarDadosItem(value.item);
    }
    this.itemSelecionado = null;
  }

  descartar() {
    // Recupera o pedido original do service
    this.pedido = this.pedidosService.getPedido(this.pedido.number);
  }

  gravar () {
    // TODO gravar o pedido atualizado no service
    this.pedidosService.gravarPedido(this.pedido);
    this.pedido = this.pedidosService.getPedido(this.pedido.number);
  }

  private mudarDadosItem(novoItem: ItemOrder) {
    Object.assign(this.itemSelecionado, novoItem);
  }

}
