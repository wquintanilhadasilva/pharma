import { ItemOrder } from './ItemOrder';
/**
 * Pedido e seus atributos necessários nessa app
 *
 * Author: Wedson Silva - 2017
 */

export class Order {
    public number: string;
    public date: Date;
    public customer: string;
    public status: string; // TODO migrar para objeto status (enum)

    public itens: ItemOrder[] = [];

    getMargin(): number {
        let marginSum = 0;
        let totalItems = 0;
        try {
            this.itens.forEach( i => {
                marginSum += i.getMarginItem();
                totalItems += i.quantidade;
            });
            return marginSum / totalItems;
        }catch (e) {
            console.log(e);
            return 0;
        }
    }

    getTotalItens(): number {
        return this.itens.length;
    }

    getTotalOrder(): number {
        let total = 0;
        this.itens.forEach(
            (i: ItemOrder) => {
                total += i.getTotalValue();
            }
        );
        return total;
    }
}
