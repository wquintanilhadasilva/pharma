import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSheetComponent } from './import-sheet.component';

describe('ImportSheetComponent', () => {
  let component: ImportSheetComponent;
  let fixture: ComponentFixture<ImportSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
