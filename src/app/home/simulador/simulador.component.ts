import { Order } from './../../domain/Order';
import { StatusMovimento } from './../../domain/status-movimento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css']
})
export class SimuladorComponent implements OnInit {

  movimento: StatusMovimento;

  pedidoSelecionado: Order;

  constructor() { }

  ngOnInit() {
    this.movimento = new StatusMovimento();
    this.movimento.referencia = '06/2017';
  }

  exibirMensagem(msg) {
    alert(msg);
  }

  aprovarPedido() {
    console.log('aprovado!');
    console.log(this.pedidoSelecionado);
  }

  rejeitarPedido() {
    console.log('rejeitado!');
    console.log(this.pedidoSelecionado);
  }

}
