import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AlertModule } from 'ngx-bootstrap';

import { DatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    DatepickerModule.forRoot()
  ],
  exports: [
    DatepickerModule
  ],
  declarations: []
})
export class BootstrapComponentsModule { }
