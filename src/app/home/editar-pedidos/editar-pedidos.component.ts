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

  pedido;
  itemSelecionado;
  subscricao: Subscription;

  @ViewChild('editarItem') editarItem: EditarItemPedidoComponent;

  constructor(
    private activateRouted: ActivatedRoute,
    private route: Router,
    public faturamentoService: FaturamentoService,
    private pedidosService: PedidosService
  ) { }

  ngOnInit() {
    this.subscricao = this.activateRouted.data.subscribe(
      (info: {pedido: any}) => {
        // Obtém o pedido enviado pelo router. note que o pedido foi
        // obtido pelo resolver de pedidos ao mudar a rota
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

  novoItem() {
     this.editarItem.show(null, this.pedido);
  }

  closeEditar(value) {
    // se houve mudanças, atualiza o valor na lista
    if (value.confirmado) {
      if (!value.novoItem) {
        this.mudarDadosItem(value.item);
      }else {
        // Novo item, add ao pedido
        this.pedido.itens.push(value.item);
      }
    }
    this.itemSelecionado = null;
  }

  descartar() {
    // Recupera o pedido original do service
    this.pedidosService.getPedido(this.pedido.number).subscribe(data => this.pedido = data);
    // this.pedido = this.pedidosService.getPedido(this.pedido.number);
  }

  gravar () {
    // TODO gravar o pedido atualizado no service
    this.pedidosService.gravarPedido(this.pedido);
    this.pedidosService.getPedido(this.pedido.number).subscribe(data => this.pedido = data);
    // this.pedido = this.pedidosService.getPedido(this.pedido.number);
  }

  private mudarDadosItem(novoItem) {
    Object.assign(this.itemSelecionado, novoItem);
  }

}
