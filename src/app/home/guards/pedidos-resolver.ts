import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/router';
import { Observable } from 'rxjs/Observable';

import { PedidosService } from './../services/pedidos.service';

/**
 * Antes de abrir a rota, obtém a referência do pedido que será retornado para o componente 
 * a ser carregado na view
 */
@Injectable()
export class PedidosResolver implements Resolve<any> {

    constructor(private pedidosService: PedidosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        let id = route.params['id'];
        return this.pedidosService.getPedido(id);
    }

}