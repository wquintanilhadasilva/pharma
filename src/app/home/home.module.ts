import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ImportSheetComponent } from './import-sheet/import-sheet.component';
import { SendSheetComponent } from './send-sheet/send-sheet.component';
import { SimuladorComponent } from './simulador/simulador.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    NgbModule
  ],
  declarations: [
    HomeComponent,
    ImportSheetComponent,
    SendSheetComponent,
    SimuladorComponent
  ],
  exports: [
    HomeRoutingModule
  ]
})
export class HomeModule { }
