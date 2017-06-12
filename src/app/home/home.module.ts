import { SharedModule } from './../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ImportSheetComponent } from './import-sheet/import-sheet.component';
import { SendSheetComponent } from './send-sheet/send-sheet.component';
import { SimuladorComponent } from './simulador/simulador.component';
import { PainelComponent } from './painel/painel.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';

import { FaturamentoService } from './services/faturamento.service';
import { PedidosService } from './services/pedidos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    ImportSheetComponent,
    SendSheetComponent,
    SimuladorComponent,
    PainelComponent,
    ListaPedidosComponent
  ],
  exports: [
    HomeRoutingModule
  ],
  providers: [
    FaturamentoService,
    PedidosService
  ]
})
export class HomeModule { }
