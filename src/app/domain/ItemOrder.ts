/**
 * Itens do pedido
 *
 * Author: Wedson Silva - 2017
 */
export class ItemOrder {
    public id;
    public productName;
    public productUnitCost = 0;
    public quantidade = 0;
    public totalItem = 0;
    public salesPrice = 0;
    public tax = 0;

    getMarginItem(): number {
        return (this.getTotalValue() - (this.tax + this.getTotalCost())) / this.getTotalValue();
    }

    getTotalValue(): number {
        return this.quantidade * this.salesPrice;
    }

    getTotalCost(): number {
        return this.productUnitCost * this.quantidade;
    }
}
