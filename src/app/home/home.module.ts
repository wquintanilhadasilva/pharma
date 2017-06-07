import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ImportSheetComponent } from './import-sheet/import-sheet.component';
import { SendSheetComponent } from './send-sheet/send-sheet.component';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    ImportSheetComponent,
    SendSheetComponent
  ],
  exports: [
    HomeRoutingModule
  ]
})
export class HomeModule { }
