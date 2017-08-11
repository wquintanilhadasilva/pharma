import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import {switchMap} from 'rxjs/operator/switchMap';
import {_do} from 'rxjs/operator/do';
import 'rxjs/add/operator/map';
import {_catch} from 'rxjs/operator/catch';
import {of} from 'rxjs/observable/of';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/toPromise';


import { PedidosService } from './../services/pedidos.service';
import { Order } from './../../domain/Order';
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

  item;
  itemOriginal;
  pedido;
  pedidoSimulado;
  editado = false;
  margemGlobal = 0;
  novoItem = false;
  exibir = false;
  searching = false;
  searchFailed = false;

  // produtos = [];

  // Define o que deve ser exibido na lista (qual atributo do objeto)
  formatter = (result: any) => result;

  /*search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));*/

 /* search = (text$: Observable<any>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => {
        if (term === '') {
          return []
        } else {
          this.carregaProdutos(term).toPromise().
          then(r => {
            this.produtos = r;
            console.log(this.produtos);
          });
          // return this.produtos.length === 0 ? [] : this.produtos.slice(0, 10);
        }
      });
    */

  search = (text$: Observable<string>) =>
    _do.call(
      switchMap.call(
        _do.call(distinctUntilChanged.call(debounceTime.call(text$, 300)), () => this.searching = true),
        term =>
          _catch.call(
            _do.call(this.carregaProdutos(term)
                  .map((i: any[]) => i.slice(0, 10)),
                  () => this.searchFailed = false),
            () => {
              this.searchFailed = true;
              return of.call([]);
            }
          )
      ),
      () => this.searching = false
  );

  constructor(private pedidoService: PedidosService) { }


  ngOnInit() {
    this.inicializa();
    console.log('init');
  }

private carregaProdutos(filtro): Observable<any> {
    return this.pedidoService.listarProdutos(filtro);
  }
  /*
  private carregaProdutos(filtro) : Observable<any> {
    return this.pedidoService.listarProdutos(filtro).subscribe(r => {
      this.produtos = r;
      console.log(this.produtos);
    });
  }
  */

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
    // clona o pedido para que a simulação não afete o
    // pedido original até que o confirmar seja acionado
    this.pedidoSimulado = Object.assign(new Object(), this.pedido);

    // Espera montar o elemento no template para disparar
    setTimeout(() => {
      this.btnShow.nativeElement.click();
    }, 100);

    this.editado = false;

    // Carrega e exibe a margem do pedido
    this.getOrderChangedMargin();

    // Carrega e exibe a margem global
    this.getGlobalMargin();

  }

  selectItem(item) {
    this.item.productName = item.productName;
    this.item.number = item.number;
    this.item.salesPrice = item.salesPrice;
    this.item.productUnitCost = item.productUnitCost;
    this.item.tax = item.tax;
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
    this.pedidoService.calcularValoresItem(this.item).subscribe(r => {
      this.item = r;
      // Ajusta os valores do item no array de itens do pedido
      this.adjustItemInOrder(this.item);
      this.getOrderChangedMargin();
    });
  }

  private adjustItemInOrder(item) {

    this.pedidoSimulado.itens.forEach(i => {
      if (i.id === item.id) {
        i = Object.assign(i, item);
        /*i.quantidade = item.quantidade;
        i.salesPrice = item.salesPrice;
        i.totalItem = item.totalItem;
        i.totalCost = item.totalCost;
        i.tax = item.tax;*/
      }
    });

  }

  private getOrderChangedMargin() {
    // const pedClone = this.clonePedidoToSimulate();
    this.pedidoService.calcularValoresPedido(this.pedidoSimulado).subscribe(r => {
      this.pedidoSimulado = r;
      // Recalcula a margem global para simulação conforme mudanças efetuadas no pedido
      this.getGlobalMargin();
    });
  }

  private getGlobalMargin() {
    // Clona o pedido para simular a nova margem com ele...
    // const pedClone = this.clonePedidoToSimulate();
    this.pedidoService.calculaMargemGlobal(this.pedidoSimulado).subscribe(
      r => {
        this.margemGlobal = r;
      }
    );
  }

  /*private clonePedidoToSimulate() {
    this.pedidoSimulado = Object.assign(new Object(), this.pedido);
    // Agora substitui o item do pedido simulado pelo item modificado
      for (let i of this.pedidoSimulado.itens) {
        if (i.id === this.item.id) {
          // Troca o item do pedido clonado pelo item modificado
          i = Object.assign(i, this.item);
          break;
        }
      }

      return p;
  } */

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
