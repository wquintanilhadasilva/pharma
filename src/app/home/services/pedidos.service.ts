import { Observable } from 'rxjs/Observable';
import { Injectable, OnInit } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestMethod,
  RequestOptions,
  URLSearchParams,
  RequestOptionsArgs,
  ResponseContentType
} from '@angular/http';

import { ItemOrder } from './../../domain/ItemOrder';
import { Order } from './../../domain/Order';

import 'rxjs/add/operator/map';

@Injectable()
export class PedidosService implements OnInit {

  public listaDePedidos: any[] = [];

  constructor(private http: Http) {
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

  getPedidos(): Observable<any[]> {
    return this.http.get('http://localhost:54536/api/pedidos',
          this.getOptions(RequestMethod.Get))
          .map((res: Response)  => {
            const r = res.json();
            return r || {};
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
    return this.http.get('http://localhost:54536/api/pedidos/' + id, this.getOptions(RequestMethod.Get)).map(response => response.json());
  }

  public gravarPedido(pedido) {

    const body = JSON.stringify(pedido);
    this.http.put('http://localhost:54536/api/pedidos/' + pedido.number, body, this.getOptions(RequestMethod.Put) );

    // let idx = this.listaDePedidos.findIndex((x: Order) => x.number === pedido.number);
    // console.log(idx);
    // this.listaDePedidos.splice(idx, 1);
    // this.listaDePedidos.push(pedido);
    //
    // this.listaDePedidos[idx] = pedido;

  }

  public calcularValoresPedido(pedido): Observable<any> {
    const pedidoJson = JSON.stringify(pedido);
    return this.http.post('http://localhost:54536/api/pedidos/calcularValoresPedido',
              pedidoJson,
              this.getOptions(RequestMethod.Post))
                .map(
                  response => {
                    let r = response.json();
                    return r || {};
                  }
                );

  }

  public calcularValoresItem(item): Observable<any> {
    const itemJson = JSON.stringify(item);
    return this.http.post('http://localhost:54536/api/pedidos/calcularValoresItem',
                itemJson,
                this.getOptions(RequestMethod.Post))
                .map(
                  response => {
                    let r = response.json();
                    return r || {};
                  }
                );

  }

  public calculaMargemGlobal(pedido): Observable<any> {
    const pedidoJson = JSON.stringify(pedido);
    return this.http.post('http://localhost:54536/api/pedidos/getMargemGlobal',
                pedidoJson,
                this.getOptions(RequestMethod.Post))
                .map(
                  response => {
                    let r = response.json();
                    return r || {};
                  }
                );

  }

  private getOptions(method) {

    const options = new RequestOptions({
      headers: this.getHeaders()
      // method: method
    });

    return options;
  }

  private getHeaders() {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // headers.append('Access-Control-Allow-Credentials', 'true');

    return headers;
  }

}
