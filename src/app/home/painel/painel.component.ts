import { Component, OnInit, Input } from '@angular/core';

import { FaturamentoService } from './../services/faturamento.service';
import { Faturamento } from './../../domain/faturamento';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  faturamento: Faturamento;

  constructor(private faturamentoService: FaturamentoService) { }

  ngOnInit() {
    this.faturamento = this.faturamentoService.getFaturamento() ;
  }

}
