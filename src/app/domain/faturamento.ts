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
export class Faturamento {

    public referencia: string;
    public margemGlobal: number;
    public qtdePedidosGlobal: number;
    public faturamentoGlobal: number;

    constructor() {}

}
