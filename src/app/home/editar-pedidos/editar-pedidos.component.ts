import { FaturamentoService } from './../services/faturamento.service';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Order } from './../../domain/Order';

@Component({
  selector: 'app-editar-pedidos',
  templateUrl: './editar-pedidos.component.html',
  styleUrls: ['./editar-pedidos.component.css']
})
export class EditarPedidosComponent implements OnInit, OnDestroy {

  pedido: Order;

  subscricao: Subscription;

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

}
