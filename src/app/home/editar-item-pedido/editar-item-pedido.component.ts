import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { PedidosService } from './../services/pedidos.service';
import { Order } from './../../domain/Order';
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

  item;
  itemOriginal;
  pedido;

  editado = false;

  margemGlobal = 0;

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

  constructor(private pedidoService: PedidosService) { }

  ngOnInit() {
    this.inicializa();
    console.log('init');
  }

  show(it, ped) {
    this.exibir = true;
    if (it === null) {
      this.inicializa();
      this.novoItem = true;
    } else {
      this.itemOriginal = it;
      this.cloneItem();
      this.novoItem = false;
    }
    this.pedido = ped;
    // Espera montar o elemento no template para disparar
    setTimeout(() => {
      this.btnShow.nativeElement.click();
    }, 100);

    this.calcValores();

    this.editado = false;

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

  calcularMargem() {
    this.calcValores();
    this.editado = true;
  }

  onEdit() {
    this.editado = false;
  }

  private calcValores() {
    /**
         * Toda vez que calcular, tem que atualizar:
         *    Custo total do item do pedido;
         *    Valor total do Item do pedido;
         *    Margem do item do pedido;
         *
         *    Valor total do pedido
         *    Margem do pedido
         *    Quantidade de itens no pedido
         *    Custo total do pedido
         *
         *    Projeção da Margem Global
         *    Projeção do Faturamento Global
         *
         *    Considerar a quantidade e o preço de venda do item
         */
    this.pedidoService.calcularValoresPedido(this.pedido).subscribe(r => {
      this.pedido = r;
    });

    this.pedidoService.calcularValoresItem(this.item).subscribe(r => {
      this.item = r;
      this.getGlobalMargin();
    });
  }

  private getGlobalMargin() {
    this.pedidoService.calculaMargemGlobal(this.pedido).subscribe(
      r => {
        this.margemGlobal = r;
      }
    );
  }

  private cloneItem() {
    this.item = Object.assign(new Object(), this.itemOriginal);
  }

  private emitCloseEvent(value, itemPedido) {
    this.editClose.emit({ confirmado: value, novoItem: this.novoItem, item: itemPedido });
    this.exibir = false;
  }

  private inicializa() {

    this.editado = false;

    this.item = this.getItemNovo();
    this.itemOriginal = this.getItemNovo();

    this.pedido = new Object();
    this.pedido.number = 0;
    this.pedido.date = new Date();
    this.pedido.customer = '';
    this.pedido.status = 'Pendente';
    this.pedido.itens = [];
    this.pedido.margin = 0;
    this.pedido.totalOrder = 0;
    this.pedido.qtdeItens = 0;
  }

  private getItemNovo() {
    const item = {
      number: 0,
      productName: '',
      quantidade: 0,
      salesPrice: 0,
      totalItem: 0,
      productUnitCost: 0,
      totalCost: 0,
      tax: 0,
      margin: 0
    }
    return item;
  }

}
