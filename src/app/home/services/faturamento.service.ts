import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestMethod, RequestOptions, Headers } from '@angular/http';

import { Faturamento } from './../../domain/faturamento';

@Injectable()
export class FaturamentoService implements OnInit {

  public indicadores: Faturamento;

  constructor(private http: Http) {
    this.indicadores = new Faturamento();
  }

  ngOnInit(): void {
  }

  public atualizaIndicadores() {

    this.getFaturamento().subscribe(f => {
      this.indicadores.referencia = f.referencia;
      this.indicadores.faturamentoGlobal = f.faturamentoGlobal;
      this.indicadores.margemGlobal = f.margemGlobal;
      this.indicadores.qtdePedidosGlobal = f.qtdePedidosGlobal;
    });
  }

  private getFaturamento(): Observable<Faturamento> {

    return this.http.get('http://localhost:54536/api/pedidos/getIndicadoresGlobais',
          this.getOptions(RequestMethod.Get)).map(response => response.json() || {});
  }

  private getOptions(method) {

    const options = new RequestOptions({
      headers: this.getHeaders()
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
