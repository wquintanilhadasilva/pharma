import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SendSheetComponent } from './send-sheet/send-sheet.component';
import { ImportSheetComponent } from './import-sheet/import-sheet.component';
import { SimuladorComponent } from './simulador/simulador.component';

const routes: Routes = [
 {path: '', component: HomeComponent,
    children: [
      {path: 'simulador', component: SimuladorComponent},
      {path: 'importar', component: ImportSheetComponent},
      {path: 'processar', component: SendSheetComponent},
      { path: '', redirectTo: '/home/simulador', pathMatch: 'full' },
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
