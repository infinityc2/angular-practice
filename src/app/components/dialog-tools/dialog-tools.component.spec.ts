import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogToolsComponent } from './dialog-tools.component';

describe('DialogToolsComponent', () => {
  let component: DialogToolsComponent;
  let fixture: ComponentFixture<DialogToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
