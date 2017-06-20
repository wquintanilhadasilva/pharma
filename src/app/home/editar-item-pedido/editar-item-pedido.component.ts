import { ItemOrder } from './../../domain/ItemOrder';
import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-editar-item-pedido',
  templateUrl: './editar-item-pedido.component.html',
  styleUrls: ['./editar-item-pedido.component.css']
})
export class EditarItemPedidoComponent implements OnInit {

  @Output() editClose = new EventEmitter();

  @ViewChild('btnShowDialog') btnShow: ElementRef;

  item: any;
  itemOriginal: any;

  constructor() { }

  ngOnInit() {
    if (this.item == null) {
      this.item = new ItemOrder();
    }
  }

  show(it) {
    this.itemOriginal = it;
    this.cloneItem();
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

}
