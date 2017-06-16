import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-editar-item-pedido',
  templateUrl: './editar-item-pedido.component.html',
  styleUrls: ['./editar-item-pedido.component.css']
})
export class EditarItemPedidoComponent implements OnInit {

  @Output() editClose = new EventEmitter();

  @Input() item: any;

  constructor() { }

  ngOnInit() {
    console.log('xxx');
    console.log(this.item);
  }

  onEditClose() {
    this.editClose.emit({});
  }

}
