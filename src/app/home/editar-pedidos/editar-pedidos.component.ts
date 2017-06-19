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


  cssDisabled = 'pointer-events:none;';

  @ViewChild('editarItem') editarItem: EditarItemPedidoComponent;

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
    console.log(this.editarItem);
    this.editarItem.show(item);
  }

  closeEditar(value) {
    this.itemSelecionado = null;
  }

}
