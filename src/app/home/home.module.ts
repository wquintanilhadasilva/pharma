import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

import { BootstrapComponentsModule } from './../bootstrap-components/bootstrap-components.module';

import { HomeRoutingModule } from './home-routing.module';
import { ImportSheetComponent } from './import-sheet/import-sheet.component';
import { SendSheetComponent } from './send-sheet/send-sheet.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    ImportSheetComponent,
    SendSheetComponent
  ],
  exports:[
    HomeRoutingModule
  ]
})
export class HomeModule { }
