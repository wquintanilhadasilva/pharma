import { Injectable } from '@angular/core';

import { ItemOrder } from './../../domain/ItemOrder';
import { Order } from './../../domain/Order';

@Injectable()
export class PedidosService {

  public listaDePedidos: any[] = [];

  constructor() { }

  getPedidos(): any[] {

    this.listaDePedidos = [];

    for (let i = 1; i <= 30; i++) {
      let o = new Order();
      o.number = i.toString();
      o.date = new Date();
      o.customer = 'Cliente MMMMMM MMMMMMM MMMMMM MMMMM' + i;
      o.status = 'Pendente';
      for (let c = 1; c <= 20; c++) {
        let io: ItemOrder = new ItemOrder();
        io.id = c.toString();
        io.productName = 'Produto XPTO ' + c + '-' + i;
        io.productUnitCost = 5.00;
        io.quantidade = i + c;
        io.salesPrice = 10;
        io.tax = 1.5 * i + o.itens.length;
        io.totalItem = c;
        o.itens.push(io);
      }
      this.listaDePedidos.push(o);
    }

    return this.listaDePedidos;

  }

  public obtemTotalDePedidos(): number {
    return this.listaDePedidos.length;
  }

  public getPedido(id: string): Order {
    return this.getPedidos().find((p: Order)  => p.number === id);
  }

  public gravarPedido(pedido: Order) {

    let idx = this.listaDePedidos.findIndex((x: Order) => x.number === pedido.number);
    console.log(idx);
    this.listaDePedidos.splice(idx, 1);
    this.listaDePedidos.push(pedido);
    /*
    this.listaDePedidos[idx].itens = pedido.itens;
    let x = this.getPedido(pedido.number);
    console.log(x);
    */
  }

}
