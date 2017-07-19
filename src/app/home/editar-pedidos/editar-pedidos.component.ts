import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { FaturamentoService } from './../services/faturamento.service';
import { EditarItemPedidoComponent } from './../editar-item-pedido/editar-item-pedido.component';
import { Faturamento } from './../../domain/faturamento';
import { PedidosService } from './../services/pedidos.service';

@Component({
  selector: 'app-editar-pedidos',
  templateUrl: './editar-pedidos.component.html',
  styleUrls: ['./editar-pedidos.component.css']
})
export class EditarPedidosComponent implements OnInit, OnDestroy {

  pedido;
  itemSelecionado;
  subscricao: Subscription;
  indicadores: Faturamento;

  @ViewChild('editarItem') editarItem: EditarItemPedidoComponent;

  constructor(
    private activateRouted: ActivatedRoute,
    private route: Router,
    private faturamentoService: FaturamentoService,
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
    this.indicadores = this.faturamentoService.indicadores;
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
        // atualiza os indicadores do pedido
        this.getOrderChangedMargin();
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
    this.itemSelecionado = Object.assign(this.itemSelecionado, novoItem);
  }

   private getOrderChangedMargin() {
    // const pedClone = this.clonePedidoToSimulate();
    this.pedidosService.calcularValoresPedido(this.pedido).subscribe(r => {
      this.pedido = r;
    });
  }

}
