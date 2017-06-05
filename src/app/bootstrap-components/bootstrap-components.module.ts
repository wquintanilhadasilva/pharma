import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { AlertModule } from 'ngx-bootstrap';

import { DatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    RouterModule.forChild(
      [
        AlertModule.forRoot(),
        DatepickerModule.forRoot()
      ]
    )
  ],
  exports: [
   RouterModule,
   DatepickerModule
  ],
  declarations: []
})
export class BootstrapComponentsModule { }
