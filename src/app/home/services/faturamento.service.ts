import { Injectable } from '@angular/core';

import { Order } from './../../domain/Order';
import { PedidosService } from './pedidos.service';
import { Faturamento } from './../../domain/faturamento';

@Injectable()
export class FaturamentoService {

  private static movimento: Faturamento;

  constructor(private pedidosService: PedidosService) {
    FaturamentoService.movimento = new Faturamento();
  }

  getFaturamento(): Faturamento {

    FaturamentoService.movimento.referencia = this. obtemReferenciaAtual();
    FaturamentoService.movimento.faturamentoGlobal = this.obtemFaturamentoTotal();
    FaturamentoService.movimento.margemGlobal = this.obtemMargemGlobal();
    FaturamentoService.movimento.qtdePedidosGlobal = this.pedidosService.obtemTotalDePedidos();

    return FaturamentoService.movimento;
  }

  public obtemMargemGlobal() {
    let margin = 0;
    this.pedidosService.getPedidos().forEach(
      (p: Order) => {
        margin += p.getMargin();
      }
    );
    return margin;
  }

  public obtemFaturamentoTotal(): number {
    let total = 0;
    this.pedidosService.getPedidos().forEach(
      (p: Order) => {
        total += p.getTotalOrder();
      }
    );
    return total;
  }

  public obtemReferenciaAtual() {
    return '06/2017';
  }

}
