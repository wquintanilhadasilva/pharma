import { Order } from './../../domain/Order';
import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

import { ItemOrder } from './../../domain/ItemOrder';
import { FaturamentoService } from './../services/faturamento.service';

@Component({
  selector: 'app-editar-item-pedido',
  templateUrl: './editar-item-pedido.component.html',
  styleUrls: ['./editar-item-pedido.component.css']
})
export class EditarItemPedidoComponent implements OnInit {

  @Output() editClose = new EventEmitter();

  @ViewChild('btnShowDialog') btnShow: ElementRef;

  item: ItemOrder;
  itemOriginal: ItemOrder;
  pedido: Order;

  constructor(private faturamentoService: FaturamentoService) {
  }

  ngOnInit() {
    this.inicializa();
    console.log('init');
  }

  show(it: ItemOrder, ped: Order) {
    this.itemOriginal = it;
    this.pedido = ped;
    this.cloneItem();
    this.btnShow.nativeElement.click();
  }

  showNewItem(ped: Order) {
    this.inicializa();
    this.pedido = ped;
    this.btnShow.nativeElement.click();
  }

  closeCancel() {
    // reestabelece o objeto original sem as mudanças possivelmente realizadas.
    this.emitCloseEvent(false, this.itemOriginal);
  }

  closeConfirm() {
    this.emitCloseEvent(true, this.item);
  }

  private cloneItem() {
    this.item =  Object.assign(new ItemOrder(), this.itemOriginal);
  }

  private emitCloseEvent(value, itemPedido) {
    this.editClose.emit({confirmado: value, item: itemPedido});
  }

  private inicializa() {
      this.item = new ItemOrder();
      this.pedido = new Order();
      this.itemOriginal = new ItemOrder();
  }

}
