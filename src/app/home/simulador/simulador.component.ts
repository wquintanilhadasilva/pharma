import { StatusMovimento } from './../../domain/status-movimento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css']
})
export class SimuladorComponent implements OnInit {

  movimento: StatusMovimento;

  constructor() { }

  ngOnInit() {
    this.movimento = new StatusMovimento();
    this.movimento.referencia = '2017/06';
  }

  exibirMensagem(msg) {
    alert(msg);
  }

}
