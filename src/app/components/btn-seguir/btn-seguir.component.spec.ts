import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSeguirComponent } from './btn-seguir.component';

describe('BtnSeguirComponent', () => {
  let component: BtnSeguirComponent;
  let fixture: ComponentFixture<BtnSeguirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnSeguirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSeguirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
