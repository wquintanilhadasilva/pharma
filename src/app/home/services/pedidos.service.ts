import { Observable } from 'rxjs/Observable';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ItemOrder } from './../../domain/ItemOrder';
import { Order } from './../../domain/Order';

import 'rxjs/add/operator/map';

@Injectable()
export class PedidosService implements OnInit {

  public listaDePedidos: any[] = [];

  constructor(private http: Http) {
    console.log('inicio service');
    this.listaDePedidos = [];
    /*
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
    } */
   }

   ngOnInit() {
   }

  getPedidos(): Observable<Order[]> {

    return this.http.get('http://localhost:54536/api/pedidos', this.getOptions())
          .map((res: Response)  => {
            return res.json();
          }); /*{
            <Order[]> res.json();
            let body = res.json();
            console.log(body);
            console.log(res);
            let r: Order[] = [];
            return body;
        });*/
  }

  public obtemTotalDePedidos(): number {
    return this.listaDePedidos.length;
  }

  public getPedido(id: string) {

    // return this.getPedidos().find((p: Order)  => p.number === id);
    return this.http.get('http://localhost:54536/api/pedidos/' + id, this.getOptions()).map(response => response);
  }

  public gravarPedido(pedido: Order) {

    let body = JSON.stringify(pedido);
    this.http.put('http://localhost:54536/api/pedidos/' + pedido.number, body, this.getOptions() );

    // let idx = this.listaDePedidos.findIndex((x: Order) => x.number === pedido.number);
    // console.log(idx);
    // this.listaDePedidos.splice(idx, 1);
    // this.listaDePedidos.push(pedido);
    //
    // this.listaDePedidos[idx] = pedido;

  }

  private getOptions() {

    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // headers.append('Access-Control-Allow-Credentials', 'true');

    const options = new RequestOptions({
      headers: headers
    });

    return options;
  }

}
