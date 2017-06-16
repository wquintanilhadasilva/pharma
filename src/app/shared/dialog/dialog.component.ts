
import {
  Component, OnInit, ElementRef, ViewChild, Input
} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @ViewChild('btnShowDialog') btnShowDialog: ElementRef;

  @Input() identificador: string;
  public item: any;
  public exibir = false;

  constructor() { }

  ngOnInit() {}

  public show(item): void {
    if (this.identificador === null || this.identificador === '') {
      throw new Error('Necessário informar o id do componente!');
    }
    this.item = item;
    this.exibir = true;
    setTimeout(() => {
      this.btnShowDialog.nativeElement.click();
    }, 100);
  }

  public hide(): void {
    this.item = null;
    this.exibir = false;
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}
