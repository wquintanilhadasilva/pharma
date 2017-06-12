import { EditarPedidosComponent } from './editar-pedidos/editar-pedidos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SendSheetComponent } from './send-sheet/send-sheet.component';
import { ImportSheetComponent } from './import-sheet/import-sheet.component';
import { SimuladorComponent } from './simulador/simulador.component';
import { PedidosResolver } from 'app/home/guards/pedidos-resolver';

const routes: Routes = [
 {path: '', component: HomeComponent,
    children: [
      {path: 'simulador', component: SimuladorComponent, children: [
          { path: ':id/editar',
            component: EditarPedidosComponent,
            resolve: {pedido: PedidosResolver}
          }
        ]
      },
      {path: 'importar', component: ImportSheetComponent},
      {path: 'processar', component: SendSheetComponent},
      {path: '', redirectTo: '/home/simulador', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
