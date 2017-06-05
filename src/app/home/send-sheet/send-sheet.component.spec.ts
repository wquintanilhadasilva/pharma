import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSheetComponent } from './send-sheet.component';

describe('SendSheetComponent', () => {
  let component: SendSheetComponent;
  let fixture: ComponentFixture<SendSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
