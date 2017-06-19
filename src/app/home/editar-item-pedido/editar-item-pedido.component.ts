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

  constructor() { }

  ngOnInit() {
  }

  show(it) {
    this.item = it;
    this.btnShow.nativeElement.click();
  }

  onEditClose() {
    this.editClose.emit({});
  }

}
