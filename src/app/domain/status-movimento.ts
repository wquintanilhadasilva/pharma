import { Order } from './Order';

/**
 * Representa o movimento mensal
 * Fornece dados e comportamentos baseados nos dados
 * de instâncias dessa classe
 *
 * Os valores totais são dinâmicos, logo, não serão tratados
 * como atributos do objeto mas sim como comportamentos que
 * atualizarão o resultado à medida em que os valores básicos
 * vão sendo modificados.
 *
 * Author: Wedson Silva - 2017
 */
export class StatusMovimento {

    public referencia: string;
    public listaDePedidos: any[] = [];

    constructor() {

    }

    public obtemMargemGlobal() {
        let margin = 0;
        this.listaDePedidos.forEach(
            (p: Order) => {
                margin += p.getMargin();
            }
        );
        return margin;
    }

    public obtemTotalDePedidos(): number {
        return this.listaDePedidos.length;
    }

    public obtemFaturamentoTotal(): number {
        let total = 0;
        this.listaDePedidos.forEach(
            (p: Order) => {
                total += p.getTotalOrder();
            }
        );
        return total;
    }

}
