import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarItemPedidoComponent } from './editar-item-pedido.component';

describe('EditarItemPedidoComponent', () => {
  let component: EditarItemPedidoComponent;
  let fixture: ComponentFixture<EditarItemPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarItemPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarItemPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
