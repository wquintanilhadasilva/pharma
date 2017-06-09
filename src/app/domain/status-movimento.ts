import { ItemOrder } from './ItemOrder';
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
                io.tax = 1;
                io.totalItem = c;
                o.itens.push(io);
            }
            this.listaDePedidos.push(o);
        }
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
