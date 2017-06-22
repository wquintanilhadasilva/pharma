import { Order } from './../../domain/Order';
import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ItemOrder } from './../../domain/ItemOrder';
import { FaturamentoService } from './../services/faturamento.service';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

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

  novoItem = false;

  exibir = false;

  // Define o que deve ser exibido na lista (qual atributo do objeto)
  formatter = (result: string) => result.toUpperCase();

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  constructor(private faturamentoService: FaturamentoService) {
  }

  ngOnInit() {
    this.inicializa();
    console.log('init');
  }

  show(it: ItemOrder, ped: Order) {
    this.exibir = true;
    if (it === null) {
      this.inicializa();
      this.novoItem = true;
    }else {
      this.itemOriginal = it;
      this.cloneItem();
      this.novoItem = false;
    }
    this.pedido = ped;
    // Espera montar o elemento no template para disparar
    setTimeout(() => {
      this.btnShow.nativeElement.click();
    }, 100);
  }

  selectItem(item) {
    console.log(item);
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
    this.editClose.emit({confirmado: value, novoItem: this.novoItem, item: itemPedido});
    this.exibir = false;
  }

  private inicializa() {
      this.item = new ItemOrder();
      this.pedido = new Order();
      this.itemOriginal = new ItemOrder();
  }

}
